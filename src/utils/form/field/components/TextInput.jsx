import React, { forwardRef, useEffect } from "react";
import { Input, useColorModeValue } from "@chakra-ui/react";
import { isFunction } from "lodash";
const TextInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      name,
      value,
      data = 0,
      placeholder,
      changeValue,
      invalid,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      (event) => {
        if (!filter || filter.test(event.target.value)) {
          if (isFunction(changeValue)) {
            changeValue(event.target.value, event);
          }
        }
      },
      [name]
    );
    useEffect(() => {
      if (data) changeValue(data);
    }, [data]);
    return (
      <div className={className}>
        {icon && <i className={`fa fa-${icon}`} />}
        <Input
          bg={"gray.100"}
          boxShadow="sm"
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
export default TextInput;
