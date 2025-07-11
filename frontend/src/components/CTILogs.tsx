import { Form, ListGroup } from "react-bootstrap";
import { CTIPreview } from "./CTIPreview";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface CTIValues {
  id: string;
  name: string;
  description: string;
  owner: string;
  qualityValue: number;
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
  const [filterQuality, setFilterQuality] = useState<number>(50);

  const handleChangeQuality = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFilterQuality(Number(e.target.value));
  };

  const fetchCTIs = async () => {
    try {
      const response = await axios.get("http://localhost:3002/ctis", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          fromQuality: filterQuality / 100,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const mappedCTIs: CTIValues[] = data.data.map((cti: any) => ({
          ...cti,
          sharedAt: new Date(cti.sharedAt),
        }));
        setCtis(mappedCTIs);
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
  }, [filterQuality]);

  return (
    <>
      <div
        className=" p-2 my-2"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 650px)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <div style={{ maxWidth: "200px", width: "100%" }}>
            <Form>
              <Form.Group controlId="number">
                <Form.Label className="text-light">
                  Filter from quality value
                </Form.Label>
                <Form.Control
                  type="number"
                  name="number"
                  value={filterQuality}
                  placeholder="Número"
                  onChange={handleChangeQuality}
                />
              </Form.Group>
            </Form>
          </div>
        </div>

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
                  ctiQualityValue={cti.qualityValue}
                  ctiSharedAt={cti.sharedAt}
                  setShowAlert={props.setShowAlert}
                  setAlertHeader={props.setAlertHeader}
                  setAlertMessage={props.setAlertMessage}
                  setAlertVariant={props.setAlertVariant}
                ></CTIPreview>
              </ListGroup.Item>
            </ListGroup>
          ))
        )}
      </div>
    </>
  );
}
