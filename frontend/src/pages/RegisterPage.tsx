import { Alert, Col, Container, Row } from "react-bootstrap";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <>
      <Container fluid>
        <Row>
          <Alert show={false}></Alert>
        </Row>
        <Row className="my-5 mx-3">
          <h1 className="text-center text-light mb-5">
            Register new organization
          </h1>
          <h5 className="text-center text-light">
            Join the platform by completing the form below. Simply enter your
            organization's name, a brief description, and a secure password.
          </h5>
        </Row>
        <Row className="my-4 mx-3">
          <Col></Col>
          <Col sm={8} md={8} lg={8}>
            <RegisterForm />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
