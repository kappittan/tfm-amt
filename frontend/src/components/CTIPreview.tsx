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
      <Row>
        <Col sm={3} md={3} lg={3}>
          <h6>Name:</h6>
          <Badge bg="warning">{props.ctiName}</Badge>
        </Col>
        <Col sm={5} md={5} lg={5}>
          <h6>Description:</h6>
          <Badge bg="warning">{props.ctiDescription}</Badge>
        </Col>
        <Col sm={1} md={1} lg={1}>
          <h6>Owner:</h6>
          <Badge bg="primary">{props.ctiOwner}</Badge>
        </Col>
        <Col sm={1} md={1} lg={1}>
          <h6>Quality Value:</h6>
          <Badge bg="info">{props.ctiQualityValue}</Badge>
        </Col>
        <Col sm={1} md={1} lg={1}>
          <h6>SharedAt:</h6>
          <Badge bg="secondary">{props.ctiSharedAt.toDateString()}</Badge>
        </Col>
        <Col className="mt-3" sm={1} md={1} lg={1}>
          <Button onClick={handleClick}>Download</Button>
        </Col>
      </Row>
    </Container>
  );
}
