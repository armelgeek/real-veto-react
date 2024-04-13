import { Textarea,useColorModeValue } from "@chakra-ui/react";
import { isFunction } from "lodash-es";
import React, { forwardRef } from "react";

const TextareaInput = forwardRef(
  (
    { icon, className, filter, setData,placeholder, changeValue, invalid, ...inputProps },
    ref
  ) => {
    const handleChange = (event) => {
      if (!filter || filter.test(event.target.value)) {
       if(isFunction(changeValue)) changeValue(event.target.value, event);
        if (setData) {
          setData(event.target.value);
        }
      }
    };

    return (
      <div className={className}>
        <Textarea bg={"gray.200"} boxShadow="sm"
          isInvalid={invalid}
          placeholder={placeholder}
          {...inputProps}
          onChange={handleChange}
          ref={ref}
        />
      </div>
    );
  }
);
export default TextareaInput;
