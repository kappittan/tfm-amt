import { Alert, Col, Container, Row } from "react-bootstrap";
import { NavBar } from "../components/NavBar";
import logo from "../assets/ctishield.svg";
import { LoginForm } from "../components/LoginForm";
import { OrganizationPreview } from "../components/OrganizationPreview";

export function HomePage() {
  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Alert show={false} variant="danger" dismissible>
            <Alert.Heading>Test</Alert.Heading>
            <p>Test</p>
          </Alert>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col></Col>
          <Col sm={8} md={8}>
            <h1 className="text-light" style={{ textAlign: "center" }}>
              Welcome to the CTIshield.
            </h1>
            <h5 className="text-light" style={{ textAlign: "center" }}>
              A platform for sharing threat intelligence.
            </h5>
          </Col>
          <Col></Col>
        </Row>
        <Row style={{ marginTop: 100 }}>
          <Col sm={12} md={4}>
            <img
              src={logo}
              className="img-fluid"
              style={{ borderRadius: "30%" }}
            />
          </Col>
          <Col sm={8} md={8}>
            <Row>
              <h2 className="text-light" style={{ textAlign: "center" }}>
                Please login or register to continue.
              </h2>
            </Row>
            <Row style={{ marginTop: 20, marginBottom: 20 }}></Row>
            <Row>
              <LoginForm />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
