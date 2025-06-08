import { Alert, Col, Container, Row } from "react-bootstrap";
import logo from "../assets/ctishield.svg";
import { LoginForm } from "../components/LoginForm";
import { useState } from "react";

export function HomePage() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertHeader, setAlertHeader] = useState("");

  return (
    <>
      <Container fluid>
        <Row>
          <Alert
            show={showAlert}
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <Alert.Heading>{alertHeader}</Alert.Heading>
            <p>{alertMessage}</p>
          </Alert>
        </Row>
        <Row className="my-5 mx-3">
          <Col></Col>
          <Col sm={8} md={8}>
            <h1 className="text-light" style={{ textAlign: "center" }}>
              Welcome to CTIshield.
            </h1>
            <h6 className="text-light" style={{ textAlign: "center" }}>
              A platform for sharing threat intelligence.
            </h6>
          </Col>
          <Col></Col>
        </Row>
        <Row className="py-5 mx-3 px-3">
          <Col sm={12} md={4}>
            <img
              src={logo}
              className="img-fluid"
              style={{ borderRadius: "30%" }}
            />
          </Col>
          <Col sm={8} md={8}>
            <Row className="mt-5 mb-3">
              <h3 className="text-light text-center">
                Please login or register to continue.
              </h3>
            </Row>
            <Row>
              <LoginForm
                setAlertHeader={setAlertHeader}
                setAlertMessage={setAlertMessage}
                setAlertVariant={setAlertVariant}
                setShowAlert={setShowAlert}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
