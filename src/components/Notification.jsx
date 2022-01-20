import { Alert } from "react-bootstrap";
import React from "react";

function Notification({ type, message }) {
  return (
    <Alert key={type} variant={type}>
      {message}
    </Alert>
  );
}

export default Notification;
