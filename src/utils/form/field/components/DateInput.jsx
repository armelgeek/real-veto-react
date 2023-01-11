import React, { forwardRef } from "react";
import { Input, useColorModeValue } from "@chakra-ui/react";
import {isFunction} from "lodash";
const DateInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      name,
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
          type="date"
          boxShadow="sm"
          locale="fr-FR"
          isInvalid={invalid}
          color={"gray.700"}
          placeholder={placeholder}
          ref={ref}
          onBlur={handleChange}
        />
      </div>
    );
  }
);
export default  DateInput;

