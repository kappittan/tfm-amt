import { useRef } from "react";
import { Button } from "react-bootstrap";

export default function FilePicker() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Archivo seleccionado: ${file.name}`);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <Button variant="primary" onClick={handleButtonClick}>
        Select File
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
