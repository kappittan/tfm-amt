import { Container, Row, Col, Badge, Button } from "react-bootstrap";

interface CTIPreviewProps {
  ctiName: string;
  ctiDescription: string;
  ctiOwner: string;
  ctiQualityValue: number;
  ctiSharedAt: Date;
}

export function CTIPreview(props: CTIPreviewProps) {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} md={2} lg={2}>
          <h6>Name:</h6>
          <Badge bg="chocolate">{props.ctiName}</Badge>
        </Col>
        <Col sm={2} md={2} lg={2}>
          <h6>Description:</h6>
          <Badge bg="secondary">{props.ctiDescription}</Badge>
        </Col>
        <Col sm={2} md={2} lg={2}>
          <h6>Owner:</h6>
          <Badge bg="secondary">{props.ctiOwner}</Badge>
        </Col>
        <Col sm={2} md={2} lg={2}>
          <h6>Quality Value:</h6>
          <Badge bg="secondary">{props.ctiQualityValue}</Badge>
        </Col>
        <Col sm={2} md={2} lg={2}>
          <h6>SharedAt:</h6>
          <Badge bg="secondary">{props.ctiSharedAt.toDateString()}</Badge>
        </Col>
        <Col sm={2} md={2} lg={2}>
          <Button>Download</Button>
        </Col>
      </Row>
    </Container>
  );
}
