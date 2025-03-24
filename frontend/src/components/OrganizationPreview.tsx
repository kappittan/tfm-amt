import { Badge, Col, ProgressBar, Row } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";

interface OrganizationPreviewProps {
  organizationName: string;
  organizationReputation: number;
}

export function OrganizationPreview({
  organizationName,
  organizationReputation,
}: OrganizationPreviewProps) {
  let variant;
  if (organizationReputation < 30) {
    variant = "danger";
  } else if (organizationReputation < 70) {
    variant = "warning";
  } else {
    variant = "success";
  }

  return (
    <Container>
      <Row>
        <Col sm={6} md={6} lg={6}>
          <h6>Organization:</h6>
          <Badge bg="secondary">{organizationName}</Badge>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <h6>Reputation:</h6>
          <ProgressBar
            className="mt-1"
            variant={variant}
            now={organizationReputation}
          />
        </Col>
      </Row>
    </Container>
  );
}
