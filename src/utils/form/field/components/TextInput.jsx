import React, { forwardRef,useEffect } from "react";
import { Input, useColorModeValue } from "@chakra-ui/react";
import { isFunction } from "lodash";
const TextInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      placeholder,
      changeValue,
      data=0,
      invalid,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = (event) => {
      if (!filter || filter.test(event.target.value)) {
        if (isFunction(changeValue)) {
          changeValue(event.target.value, event);
        }
      }
      if (setData) {
        setData(event.target.value);
      }
    };
    useEffect(()=>{
      if(data) changeValue(data);
    },[data])
    return (
      <div className={className}>
        {icon && <i className={`fa fa-${icon}`} />}
        <Input
          bg={"gray.100"}
          boxShadow="sm"
          isInvalid={invalid}
          color={"gray.900"}
          placeholder={placeholder}
          {...inputProps}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    );
  }
);
export default TextInput;
