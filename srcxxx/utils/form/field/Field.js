import React, { useState, useEffect } from "react";
import TextInput from "./components/TextInput";
import RadioButton from "./components/RadioButton";
import SelectButton from "./components/SelectButton";
import TextareaInput from "./components/TextareaInput";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InfoIcon } from "@chakra-ui/icons";
import { chakra } from "@chakra-ui/system";
import { Tooltip } from "@chakra-ui/tooltip";
import { Flex, Box } from "@chakra-ui/layout";
import TagInput from "./components/TagInput";
import DateInput from "./components/DateInput";
import SelectObject from "./components/SelectObject";
import RadioObject from "./components/RadioObject";
import RadioProduct from "./components/RadioProduct";
import PasswordInput from "./components/PasswordInput";
import CheckBoxInput from "./components/CheckBoxInput";
import NumberInputComponent from "./components/NumberInput";
const generateField = (FormComponent) => {
  return ({
    className,
    label,
    labelSize = "13px",
    labelWeight = "400",
    tip,
    info,
    isBool = false,
    options,
    optional,
    error,
    name,
    half = false,
    ...otherProps
  }) => {
    const [labelText, setLabelText] = useState("");
    useEffect(() => {
      setLabelText(label);
    }, [label]);
    return (
      <Box style={{ width: half ? "50%" : "100%" }}>
        <FormControl isInvalid={!!error}>
          <Flex justifyContent="flex-start" alignItems="center">
            {!isBool && (
              <>
                {labelText && (
                  <>
                    <FormLabel
                      fontSize={labelSize}
                      fontWeight={labelWeight}
                      mb={1}
                      mr={1}
                      color={"muted.400"}
                      htmlFor={label}
                    >
                      {labelText}
                    </FormLabel>
                    {tip && (
                      <Tooltip
                        placement="bottom-end"
                        label={tip}
                        bg={"gray.800"}
                        aria-label="Guide d'utilisation"
                      >
                        <InfoIcon fontSize="11px" color={"gray"} />
                      </Tooltip>
                    )}
                    {optional && (
                      <chakra.small color="blue.700">
                        {"("} facultatif {")"}
                      </chakra.small>
                    )}
                  </>
                )}
              </>
            )}
          </Flex>

          <FormComponent
            invalid={!!error}
            options={options}
            name={name}
            label={label}
            {...otherProps}
          />
          {info && (
            <chakra.small
              my={4}
              color="muted.500"
              fontStyle="italic"
              fontWeight="medium"
            >
              {info}
            </chakra.small>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </FormControl>
      </Box>
    );
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Input: generateField(TextInput),
  Number: generateField(NumberInputComponent),
  Radio: generateField(RadioButton),
  Select: generateField(SelectButton),
  Textarea: generateField(TextareaInput),
  Tag: generateField(TagInput),
  SelectObject: generateField(SelectObject),
  RadioObject: generateField(RadioObject),
  RadioProduct: generateField(RadioProduct),
  Date: generateField(DateInput),
  Password: generateField(PasswordInput),
  Checkbox: generateField(CheckBoxInput),
};
