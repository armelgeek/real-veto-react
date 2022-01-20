import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
export const VaccinateurInput = ({ vaccinateur }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const dispatch = useDispatch();
  const vaccinateurs = useSelector(getData("vaccinateurs").value);

  const deleteCateg = (cat) => {
    dispatch(action("vaccinateurs").destroy(cat));
    dispatch(action("vaccinateurs").fetch());
  };
 
  return (
    <div key={vaccinateur.id} className="mb-2">
      <div>
        {!toggleEdit ? (
          <li className="list-items-row p-1 d-flex justify-content-between align-items-center mb-1 border-1">
            <tr>
              <td> {vaccinateur.name}({vaccinateur.contact})</td>
            </tr>
           
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
              id={`form-${vaccinateur.id}`}
              initialValues={{
                nom: vaccinateur.name,
                contact:vaccinateur.contact
              }}
              validations={validationSchema}
              onSubmit={(values, form) => {
                const { nom,contact } = values;
                dispatch(
                  action("vaccinateurs").update({
                    id: vaccinateur.id,
                    name: nom,
                    contact: contact
                  })
                );

                setToggleEdit(false);
              }}
            >
              <Form.Element>
                <Form.Field.Input name="nom" label="Nom du vaccinateur" placeholder={"Nom du vaccinateur"} />
                <Form.Field.Input name="contact" label="Contact du vaccinateur" placeholder={"Contact du vaccinateur"} />

                <button className="btn btn-success btn-sm m-1" type="submit">
                  Enregistrer
                </button>
                <button
                  className="btn  btn-success btn-sm m-1"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      window.confirm(
                        `Vous voulez vraiment supprimer la vaccinateur "${vaccinateur.name}" ?`
                      )
                    ) {
                      deleteCateg(vaccinateur);
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