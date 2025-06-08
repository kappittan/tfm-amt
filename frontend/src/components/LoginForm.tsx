import axios, { AxiosError } from "axios";
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

interface LoginFormProps {
  setShowAlert: (show: boolean) => void;
  setAlertVariant: (variant: string) => void;
  setAlertMessage: (message: string) => void;
  setAlertHeader: (header: string) => void;
}

export function LoginForm(props: LoginFormProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeUsername(e: React.SyntheticEvent) {
    setUsername(e.target.value);
  }

  function handleChangePassword(e: React.SyntheticEvent) {
    setPassword(e.target.value);
  }

  const loginToPlatform = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const data = await response.data;
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("username", data.username);

        props.setShowAlert(true);
        props.setAlertVariant("success");
        props.setAlertHeader("Login successful");
        props.setAlertMessage("You have successfully logged in.");

        await new Promise((resolve) => setTimeout(resolve, 2000));

        navigate("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        switch (error.response.status) {
          case 400:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Login failed");
            props.setAlertMessage("Invalid username or password.");
            break;
          case 401:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Invalid password");
            props.setAlertMessage(
              "The password you entered is incorrect. Please try again."
            );
            break;
          case 404:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Organization not found");
            props.setAlertMessage(
              "The organization you are trying to log in to does not exist."
            );
            break;
          default:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Error");
            props.setAlertMessage(
              "An unexpected error occurred. Please try again later."
            );
            break;
        }
      }
    }
  };

  return (
    <div>
      <ListGroup style={{ backgroundColor: "#D1A3FF" }}>
        <Form>
          <Row className="my-3 mx-3">
            <Form.Group controlId="formLoginName">
              <Form.Label>Organization name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={username}
                onChange={handleChangeUsername}
              />
            </Form.Group>
          </Row>

          <Row className="my-3 mx-3">
            <Form.Group controlId="formLoginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handleChangePassword}
              />
            </Form.Group>
          </Row>

          <Row className="my-4">
            <Col></Col>
            <Col>
              <Row>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => {
                    loginToPlatform();
                  }}
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
    </div>
  );
}
