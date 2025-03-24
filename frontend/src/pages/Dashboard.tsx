import {
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

export function Dashboard() {
  return (
    <>
      <NavBar></NavBar>
      <Container fluid>
        <Row className="w-100 h-100">
          <Col sm={3} md={3} lg={3}>
            <OrganizationsSideBar></OrganizationsSideBar>
          </Col>
          <Col sm={9} md={9} lg={9}>
            <Row className="text-center py-3 px-3 text-light">
              <h1>CTIShield Dashboard</h1>
            </Row>
            <Row className=" py-3 px-3 text-light my-2">
              <h3>
                Welcome to the Dashboard. Just below, you can upload new
                intelligence (CTI). On the left, you will find all the
                organizations that belong to the platform. At the bottom, there
                is a log of the latest shared intelligence.
              </h3>
            </Row>
            <Row>
              <Badge bg="dark">new CTI</Badge>
            </Row>
            <Row>
              <Container fluid className="my-2">
                <Card style={{ backgroundColor: "#D1A3FF" }}>
                  <Card.Body>
                    <Card.Title>Upload new CTI</Card.Title>
                    <Card.Text>
                      Please upload a new CTI file by clicking the button below.
                    </Card.Text>
                    <FilePicker></FilePicker>
                  </Card.Body>
                </Card>
              </Container>
            </Row>
            <Row className="h-65">
              <CTILogs></CTILogs>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
