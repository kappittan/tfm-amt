import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, ListGroup, Row } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  setShowAlert: (show: boolean) => void;
  setAlertVariant: (variant: string) => void;
  setAlertMessage: (message: string) => void;
  setAlertHeader: (header: string) => void;
}

export function RegisterForm(props: RegisterFormProps) {
  const [datos, setDatos] = useState({
    name: "",
    password: "",
    description: "",
  });

  const navigate = useNavigate();

  const registerToPlatform = async () => {
    try {
      const response = await axios.post("http://localhost:3001/organizations", {
        name: datos.name,
        password: datos.password,
        description: datos.description,
      });

      if (response.status === 200) {
        props.setShowAlert(true);
        props.setAlertVariant("success");
        props.setAlertHeader("Registration successful");
        props.setAlertMessage(
          "You have successfully registered. Redirecting to home..."
        );

        await new Promise((resolve) => setTimeout(resolve, 1000));

        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        switch (error.response.status) {
          case 400:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Registration failed");
            props.setAlertMessage("Please fill in all fields correctly.");
            break;
          case 422:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Invalid password");
            props.setAlertMessage(
              "The password you entered is incorrect. Use at least 8 characters, including uppercase, lowercase, numbers, and special characters."
            );
            break;
          case 409:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("The organization already exists");
            props.setAlertMessage(
              "An organization with this name already exists. Please choose a different name."
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

  function handleChangeName(e: React.SyntheticEvent) {
    setDatos((values) => ({ ...values, name: e.target.value }));
  }

  function handleChangePassword(e: React.SyntheticEvent) {
    setDatos((values) => ({ ...values, password: e.target.value }));
  }

  function handleChangeDescription(e: React.SyntheticEvent) {
    setDatos((values) => ({ ...values, description: e.target.value }));
  }

  return (
    <div>
      <Row>
        <ListGroup style={{ backgroundColor: "#D1A3FF" }}>
          <Form>
            <Row className="my-3 mx-3">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Organization name</Form.Label>
                <Form.Control
                  type="text"
                  value={datos.name}
                  onChange={handleChangeName}
                />
              </Form.Group>
            </Row>

            <Row className="my-3 mx-3">
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Organization description</Form.Label>
                <Form.Control
                  type="text"
                  value={datos.description}
                  onChange={handleChangeDescription}
                />
              </Form.Group>
            </Row>

            <Row className="my-3 mx-3">
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={datos.password}
                  onChange={handleChangePassword}
                />
              </Form.Group>
            </Row>

            <Row className="my-4 mx-3">
              <Col></Col>
              <Col sm={4} md={4} lg={4}>
                <Row>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      registerToPlatform();
                    }}
                  >
                    Create organization
                  </Button>
                </Row>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </ListGroup>
      </Row>
    </div>
  );
}
