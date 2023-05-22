import { Select, useColorModeValue } from "@chakra-ui/react";
import { isFunction } from "lodash-es";
import React, { forwardRef } from "react";

const SelectButton = forwardRef(
  (
    {
      name,
      className,
      invalid,
      options,
      selectValue,
      valueKey,
      filter,
      isNumeric = true,
      emptyValue = true,
      setData,
      changeValue,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = (event) => {
      if (!filter || filter.test(event.target.value)) {
        if (isFunction(changeValue)) {
          if (isNumeric) {
            changeValue(Number(event.target.value), event);
          } else {
            changeValue(event.target.value, event);
          }
        }
        if (setData) {
          if (isNumeric) {
            setData(Number(event.target.value));
          } else {
            setData(event.target.value);
          }
        }
      }
    };
    return (
      <div className={className}>
        <Select
          {...inputProps}
          bg={"gray.200"}
          boxShadow="sm"
          defaultValue={`${selectValue}`}
          //   valueKey={valueKey}
          isRequired
          name={name}
          isInvalid={invalid}
          onChange={handleChange}
          ref={ref}
        >
          {emptyValue && <option value="">Selectionner</option>}
          {options?.map((value) => (
            <option
              defaultChecked={`${selectValue}`}
              value={`${valueKey ? value.id : value}`}
            >
              {valueKey ? value[valueKey] : value}
            </option>
          ))}
        </Select>
      </div>
    );
  }
);
export default SelectButton;
