import {
  Flex,
  Select,
  Box,
  Button,
  FormLabel,
  Tooltip,
} from "@chakra-ui/react";
import React, { forwardRef, useState } from "react";
import { Input as InputChakra } from "@chakra-ui/react";
import { FiMinus, FiPlus } from "react-icons/fi";
import {
  ArrayInputItem,
  ArrayInputElement,
} from "../../../context/array-input-context";
import { InfoIcon } from "@chakra-ui/icons";

const ArrayInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      schema,
      changeValue,
      invalid,
      addLabel,
      children,
      
      ...inputProps
    },
    ref
  ) => {
    const [shareholders, setShareholders] = useState([schema]);
    const handleAdd = () => {
      setShareholders(shareholders.concat([schema]));
    };
    const handleRemove = (idx) => () => {
      setShareholders(shareholders.filter((s, sidx) => idx !== sidx));
    };
    const handleShareholderNameChange = (
      idx,
      name,
      options = [],
      setValue = null
    ) => (evt) => {
      let data=null;
      if (options && setValue != null && options.length > 0) {
        data = options.find((o) => o.id == evt.target.value);
        console.log(data);
        
        setValue(evt.target.value);
      } else {
        data = evt.target.value;
      }
      const newShareholders = shareholders.map((shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return { ...shareholder, ...{ [name]: data } };
      });

      setShareholders(newShareholders);
    };

    React.useEffect(() => {
      changeValue(shareholders);
    }, [shareholders]);
    return (
      <Box className={className}>
        <Flex justifyContent="flex-start">
          <Button
            colorScheme="facebook"
            aria-label="Ajouter plus"
            size="xs"
            onClick={handleAdd}
          >
            <FiPlus />
            {addLabel}
          </Button>
        </Flex>

        {shareholders.map((shareholder, idx) => (
          <>
            <Box p={4} mb={3} mt={2}  bg={"gray.100"}>
              <Flex justifyContent="space-between" mb={1}>
                <Box>#{idx+1}</Box>
                <Button
                  variant="solid"
                  size="xs"
                  colorScheme="facebook"
                  aria-label="Retirer"
                  onClick={handleRemove(idx)}
                >
                  <FiMinus /> Retirer
                </Button>
              </Flex>
              <Box>
                <ArrayInputElement
                  shareholder={shareholder}
                  idx={idx}
                  onChange={handleShareholderNameChange}
                >
                  {children}
                </ArrayInputElement>
              </Box>
            </Box>
          </>
        ))}
      </Box>
    );
  }
);
export default ArrayInput;
ArrayInput.Input = ({
  name,
  label,
  tip,
  idx,
  array,
  placeholder,
  onChangeEvent,
}) => {
  return (
    <>
      <Flex justifyContent="flex-start" alignItems="center">
        {label && (
          <>
            <FormLabel color={"gray.900"} htmlFor={label}>
              {label}
              {"  "}

              {tip && (
                <Tooltip
                  placement="bottom-end"
                  label={tip}
                  bg={"gray.800"}
                  aria-label="Guide d'utilisation"
                >
                  <InfoIcon color={"gray"} fontSize="12px" />
                </Tooltip>
              )}
            </FormLabel>
          </>
        )}
      </Flex>
      <InputChakra
        type="text"
        bg={"gray.200"}
        boxShadow="sm"
        placeholder={placeholder}
        value={array[name]}
        onChange={onChangeEvent(idx, name)}
        mb={3}
      />
    </>
  );
};

ArrayInput.Select = ({
  idx,
  name,
  label,
  tip,
  array,
  selectValue,
  onChangeEvent,
  options,
  valueKey,
  setValue = null,
}) => {
  return (
    <>
      <Flex justifyContent="flex-start" alignItems="center">
        {label && (
          <>
            <FormLabel color={"gray.900"} htmlFor={label}>
              {label}
              {"  "}

              {tip && (
                <Tooltip
                  placement="bottom-end"
                  label={tip}
                  bg={"gray.800"}
                  aria-label="Guide d'utilisation"
                >
                  <InfoIcon color={"gray"} fontSize="12px" />
                </Tooltip>
              )}
            </FormLabel>
          </>
        )}
      </Flex>
      <Select
        bg={"gray.200"}
        boxShadow="sm"
        mb={3}
        defaultValue={`${selectValue}`}
        name={name}
        onChange={onChangeEvent(idx, `${name}`, options, setValue)}
      >
        <option value="">Selectionner une option</option>
        {options.map((value) => (
          <option value={`${value.id}`}>
            {value[valueKey]}
          </option>
        ))}
      </Select>
    </>
  );
};

