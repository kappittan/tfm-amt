import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

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
      <Alert
        show={showSuccessAlert}
        variant="success"
        dismissible
        onClose={() => {
          setShowSuccessAlert(false);
        }}
      >
        <Alert.Heading>Organization created!</Alert.Heading>
        <p>
          Your organization has been created. You can now login with your
          credentials.
        </p>
      </Alert>
      <Alert
        show={showErrorAlert}
        variant="danger"
        dismissible
        onClose={() => {
          setShowErrorAlert(false);
        }}
      >
        <Alert.Heading>{errorHeader}</Alert.Heading>
        <p>{errorMessage}</p>
      </Alert>
      <h1>New organization</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Organization name</Form.Label>
          <Form.Control
            type="text"
            value={datos.name}
            onChange={handleChangeName}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Organization description</Form.Label>
          <Form.Control
            type="text"
            value={datos.description}
            onChange={handleChangeDescription}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={datos.password}
            onChange={handleChangePassword}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Create organization
        </Button>
      </Form>
    </div>
  );
}
