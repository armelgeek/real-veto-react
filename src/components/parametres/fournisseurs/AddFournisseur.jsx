import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { action } from '../../../utils/lib/call';
import Form from "../../../utils/form";
import { validationSchema } from './validation';
export const AddFournisseur = ({fournisseurs,meta}) => {
    const dispatch = useDispatch();
 
    return (
        <div className="mb-3">
              <Form
              id="add-form-category"
                enableReinitialize
                initialValues={{
                    nom: ''
                }}
                validations={validationSchema}
                onSubmit={(values, form) => {
                    const { nom } = values;
                    dispatch(action("fournisseurs").create({
                        id:meta.nextId,
                        name: nom
                    }));
                }
                }
                render={() => (
                    <Form.Element>
                    <Form.Field.Input
                        name="nom"
                        placeholder={"Nom du fournisseur"}
                    />
                    
                    <button className="btn btn-success  btn-sm " type="submit">Ajouter</button>

                </Form.Element>
                )}
            />

        </div>
    )
}