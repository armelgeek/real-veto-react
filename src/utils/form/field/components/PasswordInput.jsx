import React, { forwardRef } from "react";
import { Input, useColorModeValue } from "@chakra-ui/react";
import {isFunction} from "lodash";
const PasswordInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      name,
      value,
      placeholder,
      changeValue,
      invalid,
      ...inputProps
    },
    ref
  ) => {
    const handleChange =React.useCallback((event) => {
      if (!filter || filter.test(event.target.value)) {
        if (isFunction(changeValue)) {
          changeValue(event.target.value, event);
        }
      }
    },[name]);
    return (
      <div className={className}>
        {icon && <i className={`fa fa-${icon}`} />}
        <Input
          bg={"gray.100"}
          boxShadow="sm"
          type="password"
          isInvalid={invalid}
          color={"gray.700"}
          placeholder={placeholder}
          ref={ref}
          defaultValue={value}
          onBlur={handleChange}
          
        />
      </div>
    );
  }
);
export default  PasswordInput;

