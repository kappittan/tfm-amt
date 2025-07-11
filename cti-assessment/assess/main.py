from fastapi import FastAPI, Request, HTTPException, Response, status
from fastapi.responses import JSONResponse
from completeness import completeness, load_weights
from interoperability import interoperability_calc
from verifiability import verifiability
from timeliness import timeliness
from consistency import consistency
from exceptions import STIXFormatError, WeightsFileError, APIError

app = FastAPI()

@app.post("/assess")
async def cti_assessment(request: Request):
    try:
        stix_str = (await request.body()).decode("utf-8")# Log first 100 characters for debugging

        interoperability_score = 1.0 if interoperability_calc(stix_str) else 0.0
        if not interoperability_score:
            raise STIXFormatError("STIX object does not meet interoperability requirements.")
        weights = load_weights()
        print("hola")
        completeness_score = completeness(stix_str, weights)
        print(f"Completeness score: {completeness_score}")
        verifiability_score = verifiability(stix_str)
        print(f"Verifiability score: {verifiability_score}")
        consistency_score = consistency(stix_str)
        print(f"Consistency score: {consistency_score}")
        timeliness_score = timeliness(stix_str)
        print(f"Timeliness score: {timeliness_score}")


        return {
            "interoperability": interoperability_score,
            "completeness": completeness_score,
            "verifiability": verifiability_score,
            "consistency": consistency_score,
            "timeliness": timeliness_score
        }
    except Exception as e:
        match e:
            case STIXFormatError():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=str(e)
                )
            case WeightsFileError():
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=str(e)
                )
            case APIError():
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail=str(e)
                )
            case Exception():
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="An unexpected error occurred."
                )
