class STIXFormatError(Exception):
    def __init__(self,  mensaje="The STIX does not comply with the platform requirements"):
        self.mensaje = mensaje
        super().__init__(mensaje)

class WeightsFileError(Exception):
    def __init__(self, mensaje="The weights file is not valid or does not exist"):
        self.mensaje = mensaje
        super().__init__(mensaje)

class APIError(Exception):
    def __init__(self, mensaje="An error occurred while accessing the API"):
        self.mensaje = mensaje
        super().__init__(mensaje)