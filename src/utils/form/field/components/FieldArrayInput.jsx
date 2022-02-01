import React, { forwardRef } from "react";
import { FieldArray } from "formik";
const FieldArrayInput = forwardRef(
  (
    {
      icon,
      name,
      className,
      children,
      filter,
      setData,
      placeholder,
      changeValue,
      invalid,
      render,
      ...props
    },
    ref
  ) => {
    return (
      <div className={className}>
        {icon && <i className={`fa fa-${icon}`} />}
        <FieldArray name={name}  render={render} bg={"gray.100"}  ref={ref} />
      </div>
    );
  }
);
export default FieldArrayInput;
