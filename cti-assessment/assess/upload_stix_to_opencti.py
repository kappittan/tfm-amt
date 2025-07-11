
from stix2 import Indicator, Malware, Vulnerability, Bundle
from datetime import datetime, timezone
from pycti import OpenCTIApiClient
import requests
import json
from datetime import datetime
import dateutil.parser

opencti_token = '228644c8-f963-4390-8940-2474535db40e'
opencti_url = 'http://localhost:8080'

indicator1 = Indicator(name="IP Botnet CobaltStrike",
                       description="This indicator represents a botnet using CobaltStrike",
                      pattern="[ipv4-addr:value = '16.176.176.176:443']",
                      valid_from=datetime.now(timezone.utc),
                      indicator_types=["anomalous-activity"],
                      external_references=[{"source_name": "imperva", "url": "https://www.imperva.com/learn/application-security/cobalt-strike/",}],
                      pattern_type="stix")

indicator2 = Indicator(name="IP Botnet CobaltStrike",
                       description="This indicator represents a botnet using CobaltStrike",
                      pattern="[ipv4-addr:value = '47.92.91.213:443']",
                      valid_from=datetime.now(timezone.utc),
                      indicator_types=["anomalous-activity"],
                      external_references=[{"source_name": "imperva", "url": "https://www.imperva.com/learn/application-security/cobalt-strike/",}],
                      pattern_type="stix")

indicator3 = Indicator(name="IP Botnet CobaltStrike",
                       description="This indicator represents a botnet using CobaltStrike",
                      pattern="[ipv4-addr:value = '113.44.144.145:50050']",
                      valid_from=datetime.now(timezone.utc),
                      pattern_type="stix")

indicator4 = Indicator(name="IP related to QakBot",
                       description="This indicator represents an IP address related to QakBot malware",
                      pattern="[ipv4-addr:value = '38.54.15.75:19174']",
                      valid_from=datetime.now(timezone.utc),
                      indicator_types=["anomalous-activity"],
                      external_references=[{"source_name": "checkpoint", "url": "https://www.checkpoint.com/es/cyber-hub/threat-prevention/what-is-malware/qakbot-malware/",}],
                      pattern_type="stix")

indicator5 = Indicator(name="IP related to QakBot",
                       description="This indicator represents an IP address related to QakBot malware",
                      pattern="[ipv4-addr:value = '195.2.78.159:35348']",
                      valid_from=datetime.now(timezone.utc),
                      indicator_types=["anomalous-activity"],
                      external_references=[{"source_name": "checkpoint", "url": "https://www.checkpoint.com/es/cyber-hub/threat-prevention/what-is-malware/qakbot-malware/",}],
                      pattern_type="stix")

indicator6 = Indicator(name="IP related to QakBot",
                       description="This indicator represents an IP address related to QakBot malware",
                      pattern="[ipv4-addr:value = '38.54.15.75/32']",
                      valid_from=datetime.now(timezone.utc),
                      pattern_type="stix")

indicator7 = Indicator(name="IP Botnet Porter",
                       description="This indicator represents a botnet using Porter",
                      pattern="[ipv4-addr:value = '192.168.23.45/32']",
                      valid_from=datetime.now(timezone.utc),
                      pattern_type="stix")

indicator8 = Indicator(name="IP Botnet MScript",
                       description="This indicator represents a botnet using MScript",
                      pattern="[ipv4-addr:value = '192.168.98.76/32']",
                      valid_from=datetime.now(timezone.utc),
                      pattern_type="stix")

malware1 = Malware(name="Mirai",
                    description="Mirai is a malware designed to infect IoT devices (such as IP cameras, routers, and DVRs) in order to create a botnet capable of launching massive DDoS attacks. It was first identified in 2016, and its source code was publicly released that same year, enabling the development of many variants.",
                   is_family=True,
                   malware_types=["bot", "ddos"],
                   external_references=[{"source_name": "wikipedia", "url": "https://en.wikipedia.org/wiki/Mirai_(malware)",}],)

malware2 = Malware(name="CobaltStrike",
                    description="Cobalt Strike is a legitimate red team tool used by security professionals to emulate real-world cyberattacks. However, it has also been widely adopted by cybercriminals and threat actors for post-exploitation purposes.",
                   is_family=True,
                   malware_types=["bot", "ddos"],
                   external_references=[{"source_name": "imperva", "url": "https://www.imperva.com/learn/application-security/cobalt-strike/",}],)


vulnerability1 = Vulnerability(name="CVE-2025-5398",
                               external_references=[{"source_name": "cve", "external_id": "CVE-2025-5398"}],)

vulnerability2 = Vulnerability(name="CVE-2024-8997",
                               external_references=[{"source_name": "cve", "external_id": "CVE-2024-8997"}],)

vulnerability3 = Vulnerability(name="CVE-2025-3699",
                               external_references=[{"source_name": "cve", "external_id": "CVE-2025-3699"}],)

vulnerability4 = Vulnerability(name="CVE-2025-2940",
                               external_references=[{"source_name": "cve", "external_id": "CVE-2025-2940"}],)

vulnerability5 = Vulnerability(name="CVE-2025-6751",
                               external_references=[{"source_name": "cve", "external_id": "CVE-2025-6751"}],)


def create_stix_file(file_name, file_content):
    path = f"/home/kappitan/Vídeos/STIX/{file_name}"

    with open(path, "w", encoding="utf-8") as file:
        file.write(file_content)


def get_stix_malware_from_opencti(fromDate):

    all_malware = opencti_api_client.malware.list(getAll=True)
    filtered_malware = []
    for m in all_malware:
        if "updated_at" in m:
            updated = dateutil.parser.isoparse(m["updated_at"]).astimezone(timezone.utc)
            if updated >= fromDate:
                filtered_malware.append(m)

    return filtered_malware


def post_stix_to_cti_endpoint(stix_object, bearer_token):

    url = "http://localhost:3002/ctis"

    headers = {
        "Authorization": f"Bearer {bearer_token}",
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

    return response


if __name__ == "__main__":

    opencti_api_client = OpenCTIApiClient(opencti_url, opencti_token)
    

    """
    bundle = Bundle(objects=[
        indicator1,
        indicator2,
        indicator3,
        indicator4,
        indicator5,
        indicator6,
        indicator7,
        malware1,
        malware2,
        vulnerability1,
        vulnerability2
    ])
    
    result = opencti_api_client.stix2.import_bundle_from_json(
                bundle.serialize(pretty=True),
                update=True,
            )
    
    print(f"Result: {result}")"""

    """
    data = opencti_api_client.malware.list()
    id = data[0].get("standard_id")
    data2 = opencti_api_client.stix2.get_stix_bundle_or_object_from_entity_id(entity_type="Malware", entity_id=id)
    print(data2)
    """

    
    fecha_iso = datetime.now(timezone.utc)
    fecha_utc = datetime(2024, 1, 1, 0, 0, 0, tzinfo=timezone.utc)
    malwares = get_stix_malware_from_opencti(fecha_utc)
    print(malwares)

