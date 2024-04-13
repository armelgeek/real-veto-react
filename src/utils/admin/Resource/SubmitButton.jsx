import { Button } from "@chakra-ui/button";
import React from "react";

const SubmitButton = ({ meta, submitText }) => {
  return (
    <>
      <Button
        isLoading={meta.isLoading}
        loadingText={submitText || "Enregistrer les modifications"}
        mt={5}
        size="sm"
        color={"white"}
        variant="solid"
        colorScheme="facebook"
        type="submit"
      >
        {submitText}
      </Button>
    </>
  );
};
export default SubmitButton;