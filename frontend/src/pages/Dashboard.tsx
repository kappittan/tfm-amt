import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  Offcanvas,
  Row,
} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { OrganizationPreview } from "../components/OrganizationPreview";
import creditCardImage from "../assets/credit-card.png";
import { OrganizationsSideBar } from "../components/OrganizationsSideBar";
import { NavBar } from "../components/NavBar";
import FilePicker from "../components/FilePicker";
import { CTILogs } from "../components/CTILogs";
import { useState } from "react";

export function Dashboard() {
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
        <Row className="w-100 h-100">
          <Col sm={3} md={3} lg={3}>
            <h4 className="text-light text-center my-4">Organizations</h4>
            <OrganizationsSideBar
              setAlertHeader={setAlertHeader}
              setAlertMessage={setAlertMessage}
              setAlertVariant={setAlertVariant}
              setShowAlert={setShowAlert}
            ></OrganizationsSideBar>
          </Col>
          <Col sm={9} md={9} lg={9}>
            <Row className="text-center mt-5 text-light">
              <h1>CTIShield Dashboard</h1>
            </Row>
            <Row className="px-2 mt-5 text-light">
              <h5>
                Welcome to the Dashboard. Just below, you can upload new
                intelligence (CTI). On the left, you will find all the
                organizations that belong to the platform. At the bottom, there
                is a log of the latest shared intelligence.
              </h5>
            </Row>
            <Row className="px-3 pt-4 my-5">
              <Card style={{ backgroundColor: "#D1A3FF" }}>
                <Card.Body>
                  <Card.Title>Upload new CTI</Card.Title>
                  <Card.Text>
                    Please upload a new CTI file by clicking the button below.
                  </Card.Text>
                  <FilePicker></FilePicker>
                </Card.Body>
              </Card>
            </Row>
            <Row className="mx-1">
              <h4 className="text-center text-light">CTI Logs</h4>
              <CTILogs></CTILogs>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
