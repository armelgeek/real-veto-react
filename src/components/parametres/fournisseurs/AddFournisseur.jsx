import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { action } from "../../../utils/lib/call";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
export const AddFournisseur = ({ fournisseurs, meta }) => {
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
            action("fournisseurs").create({
              id: meta.nextId,
              name: nom,
            })
          );
        }}
        render={() => (
          <Form.Element>
            <div className="d-flex justify-content-center align-items-center">
              <div
                style={{
                  width: "300px",
                }}
              >
                <Form.Field.Input
                  name="nom"
                  placeholder={"Nom du fournisseur"}
                />
              </div>
              <button className="btn btn-success  ml-3" type="submit">
                Ajouter
              </button>
            </div>
          </Form.Element>
        )}
      />
    </div>
  );
};
