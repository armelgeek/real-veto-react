import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
export const CategoryInput = ({ category }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(getData("categories").value);
 
  const deleteCateg = (cat) => {
    dispatch(action("categories").destroy(cat));
    dispatch(action("categories").fetch());
  };
  return (
    <div key={category.id} className="mb-2">
      <div>
        {!toggleEdit ? (
          <li className="list-items-row p-1 d-flex justify-content-between align-items-center mb-1 border-1">
            {category?.name}
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setToggleEdit(true);
              }}
            >
              Editer
            </button>
          </li>
        ) : (
          <div className="bg-gray">
            <Form
              enableReinitialize
              id={`form-${category.id}`}
              initialValues={{
                nom: category?.name,
              }}
              validations={validationSchema}
              onSubmit={(values, form) => {
                const { nom } = values;
                dispatch(
                  action("categories").update({
                    id: category.id,
                    name: nom,
                  })
                );
                dispatch(action("categories").fetch());

                setToggleEdit(false);
              }}
            >
              <Form.Element>
                <Form.Field.Input
                  name="nom"
                  label="Nom du categorie"
                  placeholder={"Nom du categorie"}
                />

                <button className="btn btn-success btn-sm m-1" type="submit">
                  Enregistrer
                </button>
                <button
                  className="btn  btn-success btn-sm m-1"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      window.confirm(
                        `Vous voulez vraiment supprimer la categorie "${category.name}" ?`
                      )
                    ) {
                      deleteCateg(category);
                    }
                  }}
                >
                  Supprimer
                </button>
                <button
                  className="btn btn-success btn-sm m-1"
                  onClick={() => {
                    setToggleEdit(false);
                  }}
                >
                  Annuler
                </button>
              </Form.Element>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};
