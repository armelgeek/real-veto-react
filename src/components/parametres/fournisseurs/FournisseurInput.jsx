import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
export const FournisseurInput = ({ fournisseur }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const dispatch = useDispatch();
  const fournisseurs = useSelector(getData("fournisseurs").value);

  const deleteCateg = (cat) => {
    dispatch(action("fournisseurs").destroy(cat));
    dispatch(action("fournisseurs").fetch());
  };
 
  return (
    <div key={fournisseur.id} className="mb-2">
      <div>
        {!toggleEdit ? (
          <li className="list-items-row p-1 d-flex justify-content-between align-items-center mb-1 border-1">
        
            {fournisseur.name}
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
              id={`form-${fournisseur.id}`}
              initialValues={{
                nom: fournisseur.name,
              }}
              validations={validationSchema}
              onSubmit={(values, form) => {
                const { nom } = values;
                dispatch(
                  action("fournisseurs").update({
                    id: fournisseur.id,
                    name: nom,
                  })
                );

                setToggleEdit(false);
              }}
            >
              <Form.Element>
                <Form.Field.Input name="nom" label="Nom du fournisseur" placeholder={"Nom du fournisseur"} />

                <button className="btn btn-success btn-sm m-1" type="submit">
                  Enregistrer
                </button>
                <button
                  className="btn  btn-success btn-sm m-1"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      window.confirm(
                        `Vous voulez vraiment supprimer le fournisseur "${fournisseur.name}" ?`
                      )
                    ) {
                      deleteCateg(fournisseur);
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