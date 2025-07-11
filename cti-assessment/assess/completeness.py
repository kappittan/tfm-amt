import json
from stix2 import parse, Indicator, Malware, Vulnerability
from exceptions import STIXFormatError, WeightsFileError

# Common fields that are expected in all STIX objects
COMMON_FIELDS = {
    'type', 'spec_version', 'id', 'created_by_ref', 'created', 'modified',
    'revoked', 'labels', 'confidence', 'lang', 'external_references',
    'object_marking_refs', 'granular_markings', 'defanged', 'extensions'
}


def load_weights(filepath="completeness_weights.json"):

    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            data = json.load(file)
        if not isinstance(data, dict):
            raise WeightsFileError("Weights file must contain a JSON object.")
        return data
    except FileNotFoundError:
        raise WeightsFileError(f"Weights file '{filepath}' not found.")
    except json.JSONDecodeError as e:
        raise WeightsFileError(f"Error decoding JSON from weights file: {e}")
    except Exception as e:
        raise WeightsFileError(f"An unexpected error occurred: {e}")


def field_coverage(sod_type, specific_fields, stix_obj, weights):

    weights_sum = 0
    weights_total = 0

    type_weights = weights.get(sod_type)
    if not type_weights:
        raise WeightsFileError(f"No weights defined for type: {sod_type}")

    for field in specific_fields:
        field_weight = type_weights.get(field)
        if field_weight is None:
            continue

        value = getattr(stix_obj, field, None)
        weights_total += field_weight
        if value not in [None, "", [], {}]:
            weights_sum += field_weight

    if weights_total == 0:
        raise WeightsFileError(f"No applicable fields with weights for type: {sod_type}")

    return weights_sum / weights_total


def completeness(stix_str, weights):

    try:
        stix_obj = parse(stix_str)
    except Exception as e:
        raise STIXFormatError(f"Invalid STIX format: {e}")


    object_type = stix_obj.get("type")
    if not object_type:
        raise STIXFormatError("STIX object does not have a 'type' field.")

    type_map = {
        "indicator": Indicator,
        "malware": Malware,
        "vulnerability": Vulnerability
    }

    cls = type_map.get(object_type)
    if not cls:
        raise STIXFormatError(f"Unsupported STIX object type: {object_type}")

    specific_fields = set(cls._properties.keys()) - COMMON_FIELDS
    return field_coverage(object_type, specific_fields, stix_obj, weights)