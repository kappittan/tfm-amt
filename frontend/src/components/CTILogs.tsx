import { Badge, Container, ListGroup, Row } from "react-bootstrap";
import { CTIPreview } from "./CTIPreview";

export function CTILogs() {
  return (
    <Container fluid className="mt-5">
      <Row>
        <Badge bg="dark">CTI Logs</Badge>
      </Row>
      <Row>
        <div
          className="overflow-auto vh-50 border rounded p-2 my-2"
          style={{ maxHeight: "600px" }}
        >
          <ListGroup className="my-2">
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup className="my-2">
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
              <CTIPreview
                ctiName="CTI"
                ctiDescription="This is a description of the CTI"
                ctiOwner="CTIOpen"
                ctiQualityValue={50}
                ctiSharedAt={new Date()}
              ></CTIPreview>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Row>
    </Container>
  );
}
