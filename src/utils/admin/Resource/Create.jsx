import { Button } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import Form from "../../form";
import Success from "./Success";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../../utils/lib/call";
import { useHistory } from "react-router-dom";
import { Alert } from '@chakra-ui/react';
import { BiHelpCircle } from "react-icons/bi";
const Create = ({
  children,
  title,
  initialValues,
  validations,
  onSubmit,
  submitText,
  model,
  tip,
  ui = true,
  extraFields = [],
  debug = false,
  redirect = true,
  hasFile = false,
  pkey = null,
}) => {
  const dispatch = useDispatch();
  const [regenerate, setRegenerate] = useState(false);
  let meta = useSelector(getData(model).meta);
  const history = useHistory();
  useEffect(() => {
    if (regenerate == true) {
      dispatch(action(model).fetch({ success: "Operation reussie avec succès" }));
      setRegenerate(false);
    }
    return () => {
      setRegenerate(false);
    };
  }, [regenerate]);
  useEffect(() => {
    dispatch(action(model).fetch());
  }, []);
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
          <Box bg={"whitesmoke"} mt={5} pb={4} mb={3}>
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
                onSubmit={(values, { resetForm }) => {
                  if (debug) console.log(values, extraFields);
                  else {
                    dispatch(
                      action(model).create(
                        {
                          id: pkey != null ? pkey : meta.nextId,
                          ...values,
                          ...extraFields,
                        },
                        {
                          resetForm: resetForm,
                          hasFile: hasFile,
                        }
                      )
                    );
                    setRegenerate(true);
                    if (redirect) history.goBack();
                  }
                }}
              >
                <Form.Element>
                  <Box my={3}>
                    {children}
                    <Button
                      isLoading={meta.isLoading}
                      loadingText={"Enregistrement en cours ...."}
                      mt={5}
                      size="sm"
                      color={"white"}
                      variant="solid"
                      colorScheme={"facebook"}
                      type="submit"
                    >
                      {submitText}
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
          onSubmit={(values, { resetForm }) => {
            if (debug) console.log(values, extraFields);
            else {
              dispatch(
                action(model).create(
                  {
                    id: pkey != null ? pkey : meta.nextId,
                    ...values,
                    ...extraFields,
                  },
                  {
                    resetForm: resetForm,
                    hasFile: hasFile,
                  }
                )
              );
              setRegenerate(true);
              if (redirect) history.goBack();
            }
          }}
        >
          <Form.Element>{children}</Form.Element>
        </Form>
      )}
    </>
  );
};

Create.defaultProps = {
  title: "Créer un resource",
  initialValues: {},
  validations: {},
  submitText: "Enregistrer",
};
export default Create;
