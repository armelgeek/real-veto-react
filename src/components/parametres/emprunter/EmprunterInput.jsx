import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
export const EmprunterInput = ({ emprunter }) => {
  const [toggleEdit, setToggleEdit] = useState(false);
  const dispatch = useDispatch();
  const emprunters = useSelector(getData("emprunters").value);

  const deleteCateg = (cat) => {
    dispatch(action("emprunters").destroy(cat));
    dispatch(action("emprunters").fetch());
  };
 
  return (
    <div key={emprunter.id} className="mb-2">
      <div>
        {!toggleEdit ? (
          <li className="list-items-row p-1 d-flex justify-content-between align-items-center mb-1 border-1">
            <tr>
              <td> {emprunter.name}({emprunter.contact})</td>
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
              id={`form-${emprunter.id}`}
              initialValues={{
                nom: emprunter.name,
                contact:emprunter.contact
              }}
              validations={validationSchema}
              onSubmit={(values, form) => {
                const { nom,contact } = values;
                dispatch(
                  action("emprunters").update({
                    id: emprunter.id,
                    name: nom,
                    contact: contact
                  })
                );

                setToggleEdit(false);
              }}
            >
              <Form.Element>
                <Form.Field.Input name="nom" label="Nom du emprunter" placeholder={"Nom du emprunter"} />
                <Form.Field.Input name="contact" label="Contact du emprunter" placeholder={"Contact du emprunter"} />

                <button className="btn btn-success btn-sm m-1" type="submit">
                  Enregistrer
                </button>
                <button
                  className="btn  btn-success btn-sm m-1"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      window.confirm(
                        `Vous voulez vraiment supprimer la emprunter "${emprunter.name}" ?`
                      )
                    ) {
                      deleteCateg(emprunter);
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