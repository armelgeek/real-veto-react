import React, { forwardRef } from 'react';
import { Input, Checkbox, useColorModeValue } from '@chakra-ui/react';
import { isFunction } from 'lodash';
const CheckBoxInput = forwardRef(
  (
    {
      icon,
      className,
      filter,
      setData,
      name,
      value,
      label,
      placeholder,
      changeValue,
      invalid,
      ...inputProps
    },
    ref
  ) => {
    const handleChange = React.useCallback(
      event => {
        if (!filter || filter.test(event.target.value)) {
          if (isFunction(changeValue)) {
            changeValue(event.target.value, event);
          }
        }
      },
      [name]
    );
    return (
      <div className={className}>
        {icon && <i className={`fa fa-${icon}`} />}
        <Checkbox
          colorScheme="teal"
          ref={ref}
          defaultValue={value}
          onChange={handleChange}
          name={name}
          defaultIsChecked
        >
          {label}
        </Checkbox>
       
      </div>
    );
  }
);
export default CheckBoxInput;
