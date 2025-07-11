import json
import requests
import logging
from stix2 import parse
from exceptions import STIXFormatError, APIError

logging.basicConfig(
    level=logging.INFO,  # O DEBUG, ERROR, etc.
    format='%(asctime)s - %(levelname)s - %(message)s'
)

virustotal_api_key = "91880503910422868c5748bf9624de8345df425653188b5f0b64c2fa8852b913"

def verifiability(stix_str):
    
    try:
        stix_obj = parse(stix_str)
    except Exception as e:
        raise STIXFormatError(f"Invalid STIX format: {e}")

    try:
        stix_content = stix_obj.get("type", "") + "." + stix_obj.get("name", "") + "." + stix_obj.get("description", "")
        external_references = stix_obj.get("external_references", [])
        
        if not external_references:
            return 0

        valid_count = 0
        for ref in external_references:
            url = ref.get("url")
            if url:
                is_trustworthy = url_trustworthiness(url)
                is_consistent = url_consistency(stix_content, url)

                if is_trustworthy is True and is_consistent is True:
                    valid_count += 1

        return valid_count / len(external_references)

    except (TypeError, KeyError) as e:
        raise STIXFormatError(f"Error processing STIX object: {e}")


def url_trustworthiness(url):
    """
    Evalúa si una URL es confiable usando la API de VirusTotal.
    """
    api_base = "https://www.virustotal.com/api/v3"
    headers = {
        "accept": "application/json",
        "x-apikey": virustotal_api_key,
        "content-type": "application/x-www-form-urlencoded"
    }

    try:
        # Obtener el ID de análisis
        response = requests.post(f"{api_base}/urls", data={"url": url}, headers=headers)
        response.raise_for_status()
        analysis_id = response.json()["data"]["id"]

        # Obtener los resultados del análisis
        response = requests.get(f"{api_base}/analyses/{analysis_id}", headers=headers)
        response.raise_for_status()
        stats = response.json()["data"]["attributes"]["stats"]

        return stats.get("malicious", 0) < 50 and stats.get("suspicious", 0) < 50

    except requests.RequestException as e:
        raise APIError(f"Request error in trustworthiness check: {e}")
    except (KeyError, ValueError) as e:
        raise STIXFormatError(f"Parsing error in trustworthiness check: {e}")


def url_consistency(stix_content, url):
    """
    Evalúa si el contenido STIX y la URL son consistentes usando un servicio local.
    """
    api_endpoint = "http://ctishield-models:4002/consistency"
    headers = {"content-type": "application/json"}
    payload = json.dumps({"stix_content": stix_content, "url": url})

    try:
        response = requests.post(api_endpoint, data=payload, headers=headers)
        response.raise_for_status()
        consistency_score = response.json().get("consistency", 0)

        return consistency_score >= 0.35

    except requests.RequestException as e:
        raise APIError(f"Request error in consistency check: {e}")
    except (KeyError, ValueError) as e:
        raise STIXFormatError(f"Parsing error in consistency check: {e}")