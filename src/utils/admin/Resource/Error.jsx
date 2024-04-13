import React from "react";
import {
  Alert,
  List,
  ListItem,
  ListIcon,
  AlertIcon,
  CloseButton,
} from "@chakra-ui/react";
import {
  MdCheckCircle,
  MdError,
  MdErrorOutline,
  MdSettings,
} from "react-icons/md";
function Error({ error }) {
  return (
    <>
      <Alert mb={3} status="error" variant="top-accent">
        {typeof error === "object" && error.length > 0 && (
          <>
            <List spacing={3}>
              {error.map((err, i) => (
                <ListItem key={i}>
                  <ListIcon key={i} as={MdError} color="red.500" />
                  {err.msg}
                </ListItem>
              ))}
            </List>
          </>
        )}
        {typeof error === "object" && (
          <>
            <MdErrorOutline color="red.500" />
            {error.message}
          </>
        )}
        {typeof error === "string" && (
          <>
            <AlertIcon />
            {error.message}
          </>
        )}
      </Alert>
    </>
  );
}

export default Error;
