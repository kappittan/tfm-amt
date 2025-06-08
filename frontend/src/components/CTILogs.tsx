import { ListGroup } from "react-bootstrap";
import { CTIPreview } from "./CTIPreview";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface CTIValues {
  id: string;
  name: string;
  description: string;
  owner: string;
  quality: number;
  sharedAt: Date;
}

interface CTILogsProps {
  setShowAlert: (show: boolean) => void;
  setAlertVariant: (variant: string) => void;
  setAlertHeader: (header: string) => void;
  setAlertMessage: (message: string) => void;
}

const mockCTIs = [
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
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
  {
    id: "2",
    name: "CTI Example 2",
    description: "This is a description for CTI Example 2.",
    owner: "User B",
    quality: 90,
    sharedAt: new Date("2023-01-02T12:00:00Z"),
  },
];

export function CTILogs(props: CTILogsProps) {
  const [ctis, setCtis] = useState<CTIValues[]>([]);

  const fetchCTIs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/ctis", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setCtis(data.data);
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
        props.setAlertMessage("An unknown error occurred: " + error.message);
      }
    }
  };

  useEffect(() => {
    fetchCTIs(); // Llamar a la API al inicio

    const interval = setInterval(() => {
      fetchCTIs();
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval); // Limpieza del intervalo al desmontar el componente
  });

  return (
    <>
      <div
        className=" p-2 my-2"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 650px)" }}
      >
        {ctis.length === 0 ? (
          <p className="text-center text-light">No CTIs available.</p>
        ) : (
          ctis.map((cti) => (
            <ListGroup className="mx-2 my-2" key={cti.id}>
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
          ))
        )}
      </div>
    </>
  );
}
