import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

export function RegisterForm() {
  const [datos, setDatos] = useState({
    name: "",
    password: "",
    description: "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorHeader, setErrorHeader] = useState("");

  function handleChangeName(e: React.SyntheticEvent) {
    setDatos((values) => ({ ...values, name: e.target.value }));
  }

  function handleChangePassword(e: React.SyntheticEvent) {
    setDatos((values) => ({ ...values, password: e.target.value }));
  }

  function handleChangeDescription(e: React.SyntheticEvent) {
    setDatos((values) => ({ ...values, description: e.target.value }));
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/organizations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (response.ok) {
      setShowSuccessAlert(true);
    } else {
      setErrorHeader("Error");
      setErrorMessage("An error occurred while creating the organization.");
      setShowErrorAlert(true);
    }
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
                    onClick={handleSubmit}
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
