import { Col, Container, Row } from "react-bootstrap";
import { NavBar } from "../components/NavBar";
import { RegisterForm } from "../components/RegisterForm";

export function RegisterPage() {
  return (
    <Container fluid>
      <Row>
        <NavBar />
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col></Col>
        <Col sm={8} md={8}>
          <RegisterForm />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
