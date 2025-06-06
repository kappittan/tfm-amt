import { Badge, Container, ListGroup, Row } from "react-bootstrap";
import { CTIPreview } from "./CTIPreview";
import { useEffect, useState } from "react";

interface CTIValues {
  id: string;
  name: string;
  description: string;
  owner: string;
  quality: number;
  sharedAt: Date;
}

export function CTILogs() {
  const [ctis, setCtis] = useState<CTIValues[]>([
    {
      id: "1",
      name: "CTI Example 1",
      description: "This is a description for CTI Example 1.",
      owner: "User A",
      quality: 85,
      sharedAt: new Date("2023-01-01T10:00:00Z"),
    },
    {
      id: "2",
      name: "CTI Example 2",
      description: "This is a description for CTI Example 2.",
      owner: "User B",
      quality: 90,
      sharedAt: new Date("2023-01-02T12:00:00Z"),
    },
  ]);

  const fetchCTIs = async () => {
    const response = await fetch("http://localhost:3001/ctis");
    const data = await response.json();
  };

  useEffect(() => {
    fetchCTIs(); // Llamar a la API al inicio

    const interval = setInterval(() => {
      fetchCTIs();
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval); // Limpieza del intervalo al desmontar el componente
  }, []);

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
          {ctis.map((cti) => (
            <ListGroup className="my-2">
              <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
                <CTIPreview
                  ctiId={cti.id}
                  ctiName={cti.name}
                  ctiDescription={cti.description}
                  ctiOwner={cti.owner}
                  ctiQualityValue={cti.quality}
                  ctiSharedAt={cti.sharedAt}
                ></CTIPreview>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
      </Row>
    </Container>
  );
}
