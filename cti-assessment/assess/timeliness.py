import requests
from stix2 import parse
from stix2.utils import STIXdatetime
import re
from datetime import datetime
from dateutil import parser
from datetime import timezone
from exceptions import STIXFormatError, APIError

max_diff = 259200 # 3 days in seconds

def timeliness(stix_str):
    try:
        stix_obj = parse(stix_str)
    except Exception as e:
        raise STIXFormatError(f"Invalid STIX format: {e}")

    type_to_delta_func = {
        "indicator": get_indicator_delta,
        "malware": get_malware_delta,
        "vulnerability": get_vulnerability_delta
    }

    delta_func = type_to_delta_func.get(stix_obj.get("type"))
    if not delta_func:
        raise STIXFormatError(f"Unsupported STIX object type: {stix_obj.get('type')}. Supported types are 'indicator', 'malware', and 'vulnerability'.")

    delta = delta_func(stix_obj)
    print(f"[DEBUG] Delta for {stix_obj.get('type')}: {delta}")
    if delta < 0:
        raise STIXFormatError("Delta value cannot be negative. Check the 'modified' field in the STIX object.")

    return max(0.0, 1.0 - (delta / max_diff)) if delta else 0.5
    

def get_indicator_delta(stix_obj):
    if stix_obj.get("pattern_type") != "stix":
        return None

    pattern = stix_obj["pattern"]

    cti_time = get_datetime_from_stix(stix_obj)

    regex_checks = {
        "ipv4": re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b'),
        "ipv6": re.compile(r'\b(?:[0-9a-fA-F]{1,4}:){2,7}[0-9a-fA-F]{1,4}(?:/\d{1,3})?\b'),
        "domain": re.compile(r'\b(?:[\w-]+\.)+[\w-]+\b'),
        "sha256": re.compile(r'\b[a-fA-F0-9]{64}\b')
    }

    for indicator_type, regex in regex_checks.items():
        match = re.search(regex, pattern)
        if match:
            ref_time = timeliness_threatfox_api('search_ioc', search_term=match.group())
            print(f"[DEBUG] Reference time for {indicator_type}: {ref_time}")
            if ref_time is None:
                return 0.0
            
            delta = cti_time - ref_time
            return delta.total_seconds()


def get_malware_delta(stix_obj):
    malware_name = stix_obj["name"]
    cti_time = get_datetime_from_stix(stix_obj)

    ref_time = timeliness_threatfox_api('malwareinfo', malware=malware_name)
    if ref_time is None:
        return 0.0
    
    delta = cti_time - ref_time
    return delta.total_seconds()


def get_vulnerability_delta(stix_obj):
    cve_id = stix_obj["name"]
    cti_time = get_datetime_from_stix(stix_obj)

    print(f"[DEBUG] CTI Time: {cti_time}")

    ref_time = timeliness_circl_api(cve_id)
    print(f"[DEBUG] Reference Time for CVE {cve_id}: {ref_time}")
    if ref_time is None:
        return 0.0
    
    delta = cti_time - ref_time
    return delta.total_seconds()

def get_datetime_from_stix(stix_obj):
    timestamp_str = datetime.strptime(str(stix_obj["modified"]), "%Y-%m-%d %H:%M:%S.%f%z")
    utc_datetime = timestamp_str.astimezone(timezone.utc)
    print(f"[DEBUG] UTC datetime from STIX object: {utc_datetime}")
    return utc_datetime



def timeliness_threatfox_api(query, search_term=None, malware=None):
    url = 'https://threatfox-api.abuse.ch/api/v1/'
    headers = {
        'Content-Type': 'application/json',
        'Auth-Key': '261925c8f7fd1c62c3cf0952841cc9cdc9d3cc0033253a90'
    }
    print(f"search_term: {search_term}, malware: {malware}")
    # Validar parámetros
    if not search_term and not malware:
        raise ValueError("Must provide 'search_term' or 'malware'.")

    payload = {
        'query': query,
        'search_term': search_term,
        'malware': malware
    }

    # Eliminar claves con valor None
    payload = {k: v for k, v in payload.items() if v is not None}

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=90)
     
        response.raise_for_status()  # Lanza excepción si el código HTTP no es 200
        body = response.json()
        print(f"[DEBUG] Response from ThreatFox API: {body}")
    except requests.exceptions.RequestException as e:
        raise APIError(f"Error while querying the API: {e}")
    except ValueError:
        raise APIError("Error parsing JSON response from ThreatFox API.")

    # Validar estado de respuesta
    if body.get("query_status") in {"illegal_malware", "illegal_search_term", "no_result"}:
        return None

    try:
        if(search_term):
            timestamp_str = body["data"][0]["first_seen"]
            return datetime.strptime(timestamp_str, "%Y-%m-%d %H:%M:%S %Z").astimezone(timezone.utc)
        elif(malware):
            dates = []

            for item in body.get("data", []):
                first_seen = item.get("first_seen")
                date = datetime.strptime(first_seen, "%Y-%m-%d %H:%M:%S %Z").astimezone(timezone.utc)
                dates.append(date)

            return min(dates)
        
    except (KeyError, IndexError):
        raise APIError("Invalid response structure from ThreatFox API. Expected 'data' field with 'first_seen'.")
    except ValueError as e:
        raise APIError(f"Error converting timestamp: {e}")


def timeliness_circl_api(cve_id):
    url = f'https://cve.circl.lu/api/cve/{cve_id}'

    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        body = response.json()
        if body is None:
            return None

        date_str = body.get("cveMetadata", {}).get("dateUpdated")
        if not date_str:
            raise KeyError("'datePublished' not found in the response. Check the API response structure.")

        return datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.%fZ").astimezone(timezone.utc)

    except requests.exceptions.RequestException as e:
        raise APIError(f"Error while querying the CIRCL API: {e}")
    except ValueError as e:
        raise APIError(f"Error parsing JSON response from CIRCL API: {e}")
    except KeyError as e:
        raise APIError(f"Missing expected key in CIRCL API response: {e}")


stix_obj1 = parse("""{

  "type": "vulnerability",

  "spec_version": "2.1",

  "id": "vulnerability--0c7b5b88-8ff7-4a4d-aa9d-feb398cd0061",

  "created": "2024-09-12T08:17:27.065522Z",

  "modified": "2024-09-12T08:17:27.065522Z",

  "created_by_ref": "identity--f431f809-377b-45e0-aa1c-6a4751cae5ff",

  "name": "CVE-2016-1234",

  "external_references": [

    {

      "source_name": "cve",

      "external_id": "CVE-2016-1234"

    }

  ]

}""")

print(timeliness(stix_obj1))