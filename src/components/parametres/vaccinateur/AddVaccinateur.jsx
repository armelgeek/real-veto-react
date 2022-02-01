import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { action } from "../../../utils/lib/call";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
export const AddVaccinateur = ({ categories,meta }) => {
  const dispatch = useDispatch();

  return (
    <div className="mb-3">
      <Form
        id="add-form-category"
        enableReinitialize
        initialValues={{
          nom: "",
          contact: "",
        }}
        validations={validationSchema}
        onSubmit={(values, form) => {
          const { nom, contact } = values;
          dispatch(
            action("vaccinateurs").create({
              id:meta.nextId,
              name: nom,
              contact: contact,
            })
          );
        }}
        render={() => (
          <Form.Element>
          <Form.Field.Input
            name="nom"
            label="Nom du vaccinateur"
            placeholder={"Nom du vaccinateur"}
          />
          <Form.Field.Input
            name="contact"
            label="Contact du vaccinateur"
            placeholder={"Contact du vaccinateur"}
          />

          <button className="btn btn-success  btn-sm " type="submit">
            Ajouter
          </button>
        </Form.Element>
        )}
      />
       
    </div>
  );
};
