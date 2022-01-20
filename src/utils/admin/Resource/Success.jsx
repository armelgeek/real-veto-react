import React from "react";
import {
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
function Success({ message }) {
  return (
    <>
      <Alert mb={3} status="success" variant="top-accent">
       
        {typeof message === "string" && (
          <>
            <AlertIcon />
            {message}
          </>
        )}
      </Alert>
    </>
  );
}

export default Success;
