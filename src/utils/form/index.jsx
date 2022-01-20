import React from "react";
import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage,
} from "formik";
import { get, mapValues } from "lodash";
import Field from "./field/Field";
const Form = ({ validate, validations, ...otherProps }) => (
  <Formik {...otherProps}
  validationSchema={validations}
  validateOnChange />
);
Form.Element = (props) => <FormikForm noValidate {...props} />;

Form.Field = mapValues(
  Field,
  (FieldComponent) => ({ name, validate, ...props }) => (
    <>
      <FormikField name={name} validate={validate} validateOnChange>
        {({ field, form: { touched, errors, setFieldValue } }) => (
          <FieldComponent
            {...field}
            {...props}
            name={name}
            error={get(touched, name) && get(errors, name)}
            changeValue={(value) => setFieldValue(name, value)}
          />
        )}
      </FormikField>
     
    </>
  )
);

Form.initialValues = (data, getFieldValues) =>
  getFieldValues((key, defaultValue = "") => {
    const value = get(data, key);
    return value === undefined || value === null ? defaultValue : value;
  });

export default Form;
