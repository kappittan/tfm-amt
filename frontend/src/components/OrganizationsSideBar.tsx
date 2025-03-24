import { Container, ListGroup, Row, Badge } from "react-bootstrap";
import { OrganizationPreview } from "./OrganizationPreview";
import { useEffect, useState } from "react";

interface OrganizationValues {
  name: string;
  description: string;
  reputation: number;
}

export function OrganizationsSideBar() {
  const [organizations, setOrganizations] = useState<OrganizationValues[]>([]);

  const fetchOrganizations = async () => {
    const response = await fetch("http://localhost:3000/organizations");
    const data = await response.json();
    setOrganizations(data.data);
  };

  useEffect(() => {
    fetchOrganizations(); // Llamar a la API al inicio

    const interval = setInterval(() => {
      fetchOrganizations();
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval); // Limpieza del intervalo al desmontar el componente
  }, []);

  return (
    <Container fluid className="my-2">
      <Row>
        <Badge bg="dark">Organizations</Badge>
      </Row>
      <Row>
        <div
          className="overflow-auto vh-50 border rounded p-2 my-2"
          style={{ maxHeight: "400px" }}
        >
          {organizations.map((org) => (
            <ListGroup className="mx-2 my-2">
              <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
                <OrganizationPreview
                  organizationName={org.name}
                  organizationReputation={org.reputation}
                />
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
      </Row>
    </Container>
  );
}
