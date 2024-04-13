import { Box,Alert,Text, Heading, Button } from "@chakra-ui/react";
import React from "react";
import Success from "./Success";
import Error from "./Error";
import Form from "../../form";
import { useDispatch } from "react-redux";
import { action, getData } from "../../../../utils/lib/call";
import { useHistory } from "react-router";
import { BiHelpCircle } from "react-icons/bi";
function Update({
  meta,
  children,
  title,
  initialValues,
  validations,
  submitText = "Enregister les modifications",
  model,
  tip,
  ui = true,
  extraFields = [],
  debug = false,
  hasFile = false,
  redirect = true,
  pkey,
  setUpdate,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      {ui == true && (
        <>
        {tip && (
            <Alert
              borderTop="4px"
              borderColor="blue.700"
              mb={3}
              status="info"
              variant="subtle"
              bg={"whitesmoke"}
            >
              <Box mr={3}>
                <BiHelpCircle fontSize="20px" color="blue.700" />
              </Box>
              <Text color={"gray.500"}>{tip}</Text>
            </Alert>
          )}
          {meta.success != "" && meta.success != null && (
            <Success message={meta.success} />
          )}
          {meta.error && <Error error={meta.error} />}
          <Box bg={"white"} mt={5} pb={4} mb={3}>
            <Box py={2} bg={"blue.700"} color="white" borderBottomWidth="1px">
              <Heading px={3} size="2sm" textTransform="uppercase">
                {title}
              </Heading>
            </Box>
            <Box px={4}>
              <Form
                enableReinitialize
                initialValues={initialValues}
                validations={validations}
                onSubmit={async (values, { resetForm }) => {
                  values.id = pkey;
                  if (debug) console.log(values, extraFields);
                  else {
                    dispatch(
                      action(model).update(
                        {
                          ...values,
                          ...extraFields,
                        },
                        {
                          hasFile: hasFile,
                        }
                      )
                    );
                    //setUpdate(true);
                    if (redirect) history.goBack();
                  }
                }}
              >
                <Form.Element>
                  <Box my={3}>
                    {children}
                    <Button
                      isLoading={meta.isLoading}
                      loadingText={ "Enregistrement en cours ..."}
                      mt={5}
                      size="sm"
                      color={"white"}
                      variant="solid"
                      colorScheme="facebook"
                      type="submit"
                    >
                      {submitText|| "Enregistrer les modifications"}
                    </Button>
                  </Box>
                </Form.Element>
              </Form>
            </Box>
          </Box>
        </>
      )}
      {ui == false && (
        <Form
          enableReinitialize
          initialValues={initialValues}
          validations={validations}
          onSubmit={async (values, { resetForm }) => {
            values.id = pkey;
            if (debug) console.log(values, extraFields);
            else {
              dispatch(
                action(model).update(
                  {
                    ...values,
                    ...extraFields,
                  },
                  {
                    hasFile: hasFile,
                  }
                )
              );
              //setUpdate(true);
              if (redirect) history.goBack();
            }
          }}
        >
          <Form.Element>{children}</Form.Element>
        </Form>
      )}
    </>
  );
}

Update.defaultProps = {
  title: "Editer la resource",
  initialValues: {},
  validations: {},
  submitText: "Enregistrer",
};
export default Update;
