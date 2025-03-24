import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
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

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);

      navigate("/dashboard");
    } else {
      alert("Error");
    }
  }

  return (
    <div>
      <Container fluid>
        <ListGroup style={{ backgroundColor: "#D1A3FF" }}>
          <Form>
            <Container fluid>
              <Row className="my-2">
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
            </Container>
            <Container fluid>
              <Row className="my-2">
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
            </Container>
            <Row className="my-4">
              <Col></Col>
              <Col>
                <Row>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Log in
                  </Button>
                </Row>
              </Col>
              <Col></Col>
            </Row>
            <Row className="my-2 text-center">
              <Form.Text className="text-muted">
                Don't have an account? <Link to="/register">Register</Link>
              </Form.Text>
            </Row>
          </Form>
        </ListGroup>
      </Container>
    </div>
  );
}
