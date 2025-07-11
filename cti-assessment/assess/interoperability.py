from stix2validator import validate_string
from stix2 import parse
from exceptions import STIXFormatError

def interoperability_calc(stix_str):

    try:
        result = validate_string(stix_str)

        if not result.is_valid:
            return False

        stix_obj = parse(stix_str)

        return stix_obj.get("type") in {"indicator", "malware", "vulnerability"}
    except Exception as e:
        raise STIXFormatError(e)
