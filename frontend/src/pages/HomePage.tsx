import { Col, Container, Row } from "react-bootstrap";
import { NavBar } from "../components/NavBar";
import logo from "../assets/ctishield.svg";
import { LoginForm } from "../components/LoginForm";

export function HomePage() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={12} md={12}>
          <NavBar />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col></Col>
        <Col sm={8} md={8}>
          <h1 style={{ textAlign: "center" }}>Welcome to the CTIshield.</h1>
          <h5 style={{ textAlign: "center" }}>
            A platform for sharing threat intelligence.
          </h5>
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ marginTop: 100 }}>
        <Col sm={12} md={4}>
          <img src={logo} className="img-fluid" />
        </Col>
        <Col sm={8} md={8}>
          <Row>
            <h2 style={{ textAlign: "center" }}>
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
  );
}
