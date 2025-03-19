import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertHeader, setAlertHeader] = useState("");

  function handleChangeUsername(e: React.SyntheticEvent) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e: React.SyntheticEvent) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === StatusCodes.OK) {
      setAlertVariant("success");
      setAlertHeader("Login successful");
      setAlertMessage("You have successfully logged in.");
      setShowAlert(true);
    } else {
      setAlertVariant("danger");
      setAlertHeader("Error");
      setAlertMessage("An error occurred while logging in.");
      setShowAlert(true);
    }
  }

  return (
    <div>
      <Alert
        show={showAlert}
        variant={alertVariant}
        dismissible
        onClose={() => {
          setShowAlert(false);
        }}
      >
        <Alert.Heading>{alertHeader}</Alert.Heading>
        <p>{alertMessage}</p>
      </Alert>
      <Form>
        <Container>
          <Row>
            <Form.Group controlId="formName">
              <Form.Label>Organization name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={handleChangeUsername}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
              />
            </Form.Group>
          </Row>
          <Row>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Log in
            </Button>
          </Row>
          <Row>
            <Form.Text className="text-muted">
              Don't have an account? <Link to="/register">Register</Link>
            </Form.Text>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
