import { Container, Row, Col, Badge, Button } from "react-bootstrap";

interface CTIPreviewProps {
  ctiId: string;
  ctiName: string;
  ctiDescription: string;
  ctiOwner: string;
  ctiQualityValue: number;
  ctiSharedAt: Date;
}

export function CTIPreview(props: CTIPreviewProps) {
  const handleClick = () => {
    alert(props.ctiId);
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
