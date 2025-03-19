import { Alert } from "react-bootstrap";

interface SuccessAlertProps {
  onClose: boolean;
  header: string;
  message: string;
}

export function SuccessAlert({ state, header, message }: SuccessAlertProps) {
  return (
    <Alert variant="success">
      <Alert.Heading>{header}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}
