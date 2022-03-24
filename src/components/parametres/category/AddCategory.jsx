import React from "react";
import { useDispatch } from "react-redux";
import { action } from "../../../utils/lib/call";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
export const AddCategory = ({ categories, meta }) => {
  const dispatch = useDispatch();

  return (
    <div className="mb-3">
      <Form
        id="add-form-category"
        enableReinitialize
        initialValues={{
          nom: "",
        }}
        validations={validationSchema}
        onSubmit={(values, form) => {
          const { nom } = values;
          dispatch(
            action("categories").create({
              name: nom,
            })
          );
        }}
        render={() => (
          <Form.Element>
            <div className="d-flex justify-content-center align-items-center">
              <div style={{
                width:"300px"
              }}>
                <Form.Field.Input name="nom" placeholder={"Nouvelle categorie"} />
              </div>
              <button className="btn btn-success ml-2 " type="submit">
                Ajouter
              </button>
            </div>
          </Form.Element>
        )}
      />
    </div>
  );
};
