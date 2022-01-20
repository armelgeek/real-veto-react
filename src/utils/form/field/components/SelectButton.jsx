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
      setData,
      changeValue,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = (event) => {
      if (!filter || filter.test(event.target.value)) {
        if (isFunction(changeValue)) {
          changeValue(event.target.value, event);
        }
        if (setData) {
          setData(event.target.value);
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
          valueKey={valueKey}
          isRequired
          name={name}
          isInvalid={invalid}
          onChange={handleChange}
          ref={ref}
        >
          <option value="">Selectionner une option</option>
          {options.map((value) => (
            <option defaultChecked={`${selectValue}`} value={`${value.id}`}>
              {value[valueKey]}
            </option>
          ))}
        </Select>
      </div>
    );
  }
);
export default SelectButton;
