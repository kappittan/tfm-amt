import axios, { AxiosError } from "axios";
import React, { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

interface STIXFileUploaderProps {
  setShowAlert: (show: boolean) => void;
  setAlertVariant: (variant: string) => void;
  setAlertMessage: (message: string) => void;
  setAlertHeader: (header: string) => void;
}

export default function STIXFileUploader(props: STIXFileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [jsonData, setJsonData] = useState<object | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [disableSelectButton, setDisableSelectButton] = useState([false]);
  const [disableUploadButton, setDisableUploadButton] = useState([false]);
  const [showUploadButton, setShowUploadButton] = useState(false);

  const handleChangeName = (e: React.SyntheticEvent) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e: React.SyntheticEvent) => {
    setDescription(e.target.value);
  };

  const handleSelectButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUploadButtonClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setDisableUploadButton([true]);

    try {
      const response = await axios.post(
        "http://localhost:3002/ctis",
        {
          name: name,
          description: description,
          content: jsonData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        props.setShowAlert(true);
        props.setAlertVariant("success");
        props.setAlertHeader("CTI uploaded successfully");
        props.setAlertMessage("The CTI has been uploaded successfully.");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        switch (error.response.status) {
          case 400:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Upload failed");
            props.setAlertMessage("Please fill in all fields correctly.");
            break;
          case 422:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Invalid STIX file");
            props.setAlertMessage(
              "The selected file does not complain with the STIX format. Please select a valid STIX file."
            );
            break;
          default:
            props.setShowAlert(true);
            props.setAlertVariant("danger");
            props.setAlertHeader("Error");
            props.setAlertMessage(
              "An unexpected error occurred. Please try again later."
            );
            break;
        }
      }
    }

    setName("");
    setDescription("");
    setJsonData(null);
    setDisableSelectButton([false]);
    setShowUploadButton(false);
    setDisableUploadButton([false]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      props.setAlertHeader("Invalid File Type");
      props.setAlertMessage("Please select a valid JSON file.");
      props.setAlertVariant("danger");
      props.setShowAlert(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (e.target && typeof e.target.result === "string") {
          const json = JSON.parse(e.target.result);
          setJsonData(json);
          setDisableSelectButton([true]);
          setShowUploadButton(true);
        }
      } catch (error) {
        console.log(error);
        props.setAlertHeader("Invalid JSON");
        props.setAlertMessage("The selected file is not a valid JSON file.");
        props.setAlertVariant("danger");
        props.setShowAlert(true);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "16px", // puedes ajustar el espacio aquí
      }}
    >
      <Button
        onClick={handleSelectButtonClick}
        disabled={disableSelectButton[0]}
      >
        Select STIX file
      </Button>
      {showUploadButton && (
        <>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formLoginName">
                  <Form.Label>CTI name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleChangeName}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formLoginPassword">
                  <Form.Label>CTI description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={handleChangeDescription}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Button
            variant="success"
            onClick={handleUploadButtonClick}
            disabled={disableUploadButton[0]}
          >
            Upload
          </Button>
        </>
      )}

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
