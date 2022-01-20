import React from "react";
import TextInput from "./components/TextInput";
import RadioButton from "./components/RadioButton";
import SelectButton from "./components/SelectButton";
import TextareaInput from "./components/TextareaInput";
import { UploadButton } from "./components/UploadButton";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InfoIcon } from "@chakra-ui/icons";
import { chakra } from "@chakra-ui/system";
import { Tooltip } from "@chakra-ui/tooltip";
import { Flex } from "@chakra-ui/layout";
import TagInput from "./components/TagInput";
import ArrayInput from "./components/ArrayInput";
//import FileInput from './components/FileInput';
const generateField = (FormComponent) => {
  return ({
    className,
    label,
    tip,
    info,
    options,
    optional,
    error,
    name,
    ...otherProps
  }) => {
    return (
      <>
        <FormControl p={0} isInvalid={!!error}>
          <Flex justifyContent="flex-start" alignItems="center">
            {label && (
              <>
                <FormLabel   fontSize="12px" color={"muted.400"} htmlFor={label}>
                  {label}
                  {tip && (
                    <Tooltip
                      placement="bottom-end"
                      label={tip}
                      ml={2}
                      bg={"gray.800"}
                      aria-label="Guide d'utilisation"
                    >
                      <InfoIcon color={"gray"} fontSize="12px" />
                    </Tooltip>
                  )}
                  {optional && (
                    <chakra.small color="blue.700">
                      {"("} facultatif {")"}
                    </chakra.small>
                  )}
                </FormLabel>
              </>
            )}
          </Flex>

          <FormComponent
            invalid={!!error}
            options={options}
            name={name}
           
            {...otherProps}
          />
          {info && <chakra.small my={4} color="muted.500" fontStyle="italic" fontWeight="medium">{info}</chakra.small>}
          {error && <p style={{ color: "red" }}>{error}</p>}
         
        </FormControl>
      </>
    );
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Input: generateField(TextInput),
  Radio: generateField(RadioButton),
  Select: generateField(SelectButton),
  File: generateField(UploadButton),
  Textarea: generateField(TextareaInput),
  Tag: generateField(TagInput),
  Array: generateField(ArrayInput),
};
