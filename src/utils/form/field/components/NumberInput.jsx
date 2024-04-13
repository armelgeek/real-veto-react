import React, { forwardRef, useEffect } from "react";
import { Input, useColorModeValue } from "@chakra-ui/react";
import { isFunction } from "lodash";

import {
  NumberInput,
  NumberInputField
} from "@chakra-ui/react";

const NumberInputComponent = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      name,
      value,
      data = 0,
      min=0,
      placeholder,
      changeValue,
      invalid,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      (value) => {
        if (!filter || filter.test(value)) {
          if (isFunction(changeValue)) {
            changeValue(Number(value));
          }
        }
      },
      [name]
    );
    useEffect(() => {
      if (data) changeValue(Number(data));
    }, [data]);
    return (
      <div className={className}>
        {icon && <i className={`fa fa-${icon}`} />}
         <NumberInput
          inputMode={"numeric"}
          bg={"gray.100"}
          boxShadow="sm"
          color={"gray.700"}
          isInvalid={invalid}
          name={name}
          ref={ref}
          step={1}
          onChange={handleChange}
          min={min}
          defaultValue={value}
        >
          <NumberInputField />
        </NumberInput>
      </div>
    );
  }
);
export default NumberInputComponent;
