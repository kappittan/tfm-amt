import re
import requests
from stix2 import parse
from exceptions import STIXFormatError, APIError

# Expresiones regulares para detección de IoCs
IOC_PATTERNS = {
    "ipv4": re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b'),
    "ipv6": re.compile(r'\b(?:[0-9a-fA-F]{1,4}:){2,7}[0-9a-fA-F]{1,4}(?:/\d{1,3})?\b'),
    "domain": re.compile(r'\b(?:[\w-]+\.)+[\w-]+\b'),
    "sha256": re.compile(r'\b[a-fA-F0-9]{64}\b')
}

CVE_PATTERN = re.compile(r"^CVE-\d{4}-\d{4,}$")


def consistency(stix_str):
    try:
        stix_obj = parse(stix_str)
    except Exception as e:
        raise STIXFormatError(f"Invalid STIX format: {e}")


    object_type = stix_obj.get("type")

    match object_type:
        case "indicator":
            return get_indicator_consistency(stix_obj)
        case "malware":
            return get_malware_consistency(stix_obj)
        case "vulnerability":
            return get_vulnerability_consistency(stix_obj)
        case _:
            raise STIXFormatError(f"Unsupported STIX object type: {object_type}. Supported types are 'indicator', 'malware', and 'vulnerability'.")


def get_indicator_consistency(stix_obj):
    if stix_obj.get("pattern_type") != "stix":
        raise STIXFormatError("'pattern_type' must be 'stix'.")

    pattern = stix_obj.get("pattern", "")
    if not pattern:
        raise STIXFormatError("'pattern' field is empty.")

    for ioc_type, regex in IOC_PATTERNS.items():
        match = regex.search(pattern)
        if match:
            ioc_value = match.group()
            return request_threatfox_api(query='search_ioc', search_term=ioc_value)

    raise STIXFormatError("No valid IoC found in the 'pattern' field.")


def get_malware_consistency(stix_obj):
    if str(stix_obj.get("is_family", "")).lower() != "true":
        raise STIXFormatError("'is_family' field must be 'true' for malware objects.")

    name = stix_obj.get("name")
    if not name:
        raise STIXFormatError("'name' field is required for malware objects.")

    return request_threatfox_api(query='get_label', malware=name)


def get_vulnerability_consistency(stix_obj):
    cve_id = stix_obj.get("name")
    if not cve_id:
        return 0.0

    if not CVE_PATTERN.fullmatch(cve_id):
        raise STIXFormatError(f"Invalid CVE ID format: {cve_id}. Expected format is 'CVE-YYYY-NNNN'.")

    url = f'https://cve.circl.lu/api/vulnerability/{cve_id}'
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200 and response.json():
            return 1.0
    except requests.RequestException as e:
        raise APIError(f"Error fetching CVE data: {e}")

    return 0.0


def request_threatfox_api(query, search_term=None, malware=None):
    url = 'https://threatfox-api.abuse.ch/api/v1/'
    headers = {
        'Content-Type': 'application/json',
        'Auth-Key': '261925c8f7fd1c62c3cf0952841cc9cdc9d3cc0033253a90'
    }

    if search_term:
        payload = {'query': query, 'search_term': search_term}
    elif malware:
        payload = {'query': query, 'malware': malware}
    else:
        return 0.0

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        print(f"[DEBUG] Response from ThreatFox API: {data}")
        if data.get("query_status") not in {"illegal_malware", "illegal_search_term", "no_result"}:
            return 1.0
    except requests.RequestException as e:
        raise APIError(f"Error connecting to ThreatFox API: {e}")
    except Exception as e:
        raise APIError(f"Unexpected error: {e}")

    return 0.0
