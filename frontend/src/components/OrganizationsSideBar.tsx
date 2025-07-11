import { ListGroup } from "react-bootstrap";
import { OrganizationPreview } from "./OrganizationPreview";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface OrganizationValues {
  id: string;
  name: string;
  description: string;
  reputation: number;
}

interface OrganizationsSideBarProps {
  setShowAlert: (show: boolean) => void;
  setAlertVariant: (variant: string) => void;
  setAlertHeader: (header: string) => void;
  setAlertMessage: (message: string) => void;
}

export function OrganizationsSideBar(props: OrganizationsSideBarProps) {
  const [organizations, setOrganizations] = useState<OrganizationValues[]>([]);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/organizations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setOrganizations(data.data);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        switch (error.response.status) {
          default:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Internal Server Error");
            props.setAlertMessage(
              "An internal server error occurred. Please try again later."
            );
            break;
        }
      } else if (error.request) {
        props.setShowAlert(true);
        props.setAlertVariant("danger");
        props.setAlertHeader("Network Error");
        props.setAlertMessage(
          "No response received from the server. Please check your network connection."
        );
      } else {
        props.setShowAlert(true);
        props.setAlertVariant("danger");
        props.setAlertHeader("Error");
        props.setAlertMessage("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchOrganizations(); // Llamar a la API al inicio

    const interval = setInterval(() => {
      fetchOrganizations();
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval); // Limpieza del intervalo al desmontar el componente
  });

  return (
    <>
      <div
        className="p-2 my-2"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 220px)" }}
      >
        {organizations.length === 0 ? (
          <p className="text-center text-light">No organizations found.</p>
        ) : (
          organizations.map((org) => (
            <ListGroup className="mx-2 my-2" key={org.name}>
              <ListGroup.Item style={{ backgroundColor: "#D1A3FF" }}>
                <OrganizationPreview
                  organizationName={org.name}
                  organizationReputation={org.reputation}
                />
              </ListGroup.Item>
            </ListGroup>
          ))
        )}
      </div>
    </>
  );
}
