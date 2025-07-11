
from datetime import timezone
from pycti import OpenCTIApiClient
import requests
from datetime import datetime
import dateutil.parser
from apscheduler.schedulers.blocking import BlockingScheduler

opencti_token = '228644c8-f963-4390-8940-2474535db40e'
opencti_url = 'http://localhost:8080'
fromDate = ""
ctishield_token = ""


def get_stix_malware_from_opencti(fromDate):

    all_malware = opencti_api_client.malware.list(getAll=True)
    filtered_malware = []
    for m in all_malware:
        if "updated_at" in m:
            updated = dateutil.parser.isoparse(m["updated_at"]).astimezone(timezone.utc)
            if updated >= fromDate:
                filtered_malware.append(m["standard_id"])

    return filtered_malware

def get_stix_vulnerability_from_opencti(fromDate):

    all_vulnerability = opencti_api_client.malware.list(getAll=True)
    filtered_vulnerability = []
    for v in all_vulnerability:
        if "updated_at" in v:
            updated = dateutil.parser.isoparse(v["updated_at"]).astimezone(timezone.utc)
            if updated >= fromDate:
                filtered_vulnerability.append(v["standard_id"])

    return filtered_vulnerability

def post_stix_to_cti_endpoint(stix_object):

    url = "http://localhost:3002/ctis"

    headers = {
        "Authorization": f"Bearer {ctishield_token}",
        "Content-Type": "application/json"
    }

    # Extraer campos requeridos
    name = stix_object.get("name", "No name")
    description = stix_object.get("description", "No description")

    # Crear el payload
    payload = {
        "name": name,
        "description": description,
        "content": stix_object  # se envía el objeto STIX completo
    }

    # Hacer el POST
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        return True
    else:
        raise Exception("Error uploading the stix object to CTIShield")

def log_in_to_ctishield(username, password):
    url = "http://localhost:3001/auth/login"

    payload = {
        "username": username,
        "password": password
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        token = response.json().get("access_token")
        return token
    else:
        raise Exception("Error logging in the CTIShield platform")


def update_ctishield():
    malwares_ids = get_stix_malware_from_opencti(fromDate)

    for id in malwares_ids:
        stix_malware = opencti_api_client.stix2.get_stix_bundle_or_object_from_entity_id(entity_type="Malware", entity_id=id)
        stix_malware = stix_malware.get("objects")[0]
        stix_malware.pop("x_opencti_id")
        stix_malware.pop("x_opencti_type")
        post_stix_to_cti_endpoint(stix_malware)

    vulnerabilities_ids = get_stix_vulnerability_from_opencti(fromDate)

    for id in vulnerabilities_ids:
        stix_vulnerability = opencti_api_client.stix2.get_stix_bundle_or_object_from_entity_id(entity_type="Vulnerability", entity_id=id)
        stix_vulnerability = stix_vulnerability.get("objects")[0]
        stix_vulnerability.pop("x_opencti_id")
        stix_vulnerability.pop("x_opencti_type")
        post_stix_to_cti_endpoint(stix_vulnerability)


if __name__ == "__main__":

    opencti_api_client = OpenCTIApiClient(opencti_url, opencti_token)
    fromDate = datetime(2024, 1, 1, 0, 0, 0, tzinfo=timezone.utc)

    ctishield_token = log_in_to_ctishield("Inteleccia", "poiA@2341R")


    scheduler = BlockingScheduler()
    scheduler.add_job(update_ctishield, 'interval', minutes=5)
    scheduler.start()


