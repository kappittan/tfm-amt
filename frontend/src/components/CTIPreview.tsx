import axios, { AxiosError } from "axios";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";

interface CTIPreviewProps {
  ctiId: string;
  ctiName: string;
  ctiDescription: string;
  ctiOwner: string;
  ctiQualityValue: number;
  ctiSharedAt: Date;
  setShowAlert: (show: boolean) => void;
  setAlertVariant: (variant: string) => void;
  setAlertHeader: (header: string) => void;
  setAlertMessage: (message: string) => void;
}

export function CTIPreview(props: CTIPreviewProps) {
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/ctis/content/${props.ctiId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const content = response.data.content;

      const json =
        typeof content === "string"
          ? content
          : JSON.stringify(content, null, 2);

      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `cti-${props.ctiId}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        switch (error.response.status) {
          case 400:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Bad Request");
            props.setAlertMessage("Incorrect format.");
            break;
          case 404:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("File not found");
            props.setAlertMessage(
              "The file does not exists in the platform database."
            );
            break;
          default:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Internal Server Error");
            props.setAlertMessage(
              "An internal server error occurred. Please try again later."
            );
            break;
        }
      } else if (error.request) {
        props.setShowAlert(true);
        props.setAlertVariant("danger");
        props.setAlertHeader("Network Error");
        props.setAlertMessage(
          "No response received from the server. Please check your network connection."
        );
      } else {
        props.setShowAlert(true);
        props.setAlertVariant("danger");
        props.setAlertHeader("Error");
        props.setAlertMessage("An unknown error occurred: " + error.message);
      }
    }
  };

  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col>
          <h6>Name:</h6>
          <Badge bg="warning">
            {props.ctiName.length > 10
              ? props.ctiName.slice(0, 10) + "…"
              : props.ctiName}
          </Badge>
        </Col>
        <Col>
          <h6>Description:</h6>
          <Badge bg="warning">
            {props.ctiDescription.length > 20
              ? props.ctiDescription.slice(0, 20) + "…"
              : props.ctiDescription}
          </Badge>
        </Col>
        <Col>
          <h6>Owner:</h6>
          <Badge bg="primary">{props.ctiOwner}</Badge>
        </Col>
        <Col>
          <h6>Quality Value:</h6>
          <Badge bg="info">{props.ctiQualityValue}</Badge>
        </Col>
        <Col>
          <h6>SharedAt:</h6>
          <Badge bg="secondary">{props.ctiSharedAt.toDateString()}</Badge>
        </Col>
        <Col className="mt-3">
          <Button onClick={handleClick}>Download</Button>
        </Col>
      </Row>
    </Container>
  );
}
