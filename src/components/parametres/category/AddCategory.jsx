import React from 'react'
import { useDispatch } from 'react-redux';
import { action } from '../../../utils/lib/call';
import Form from "../../../utils/form";
import { validationSchema } from './validation';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
export const AddCategory = ({categories,meta}) => {
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
                    dispatch(action("categories").create({
                        id:meta.nextId,
                        name: nom
                    }));
                }
                }
            >
                
                <Form.Element>
                    <Form.Field.Input
                        name="nom"
                        placeholder={"Nom du categorie"}
                    />
                    
                    <button className="btn btn-success  btn-sm " type="submit">Ajouter</button>

                </Form.Element>
            </Form>

        </div>
    )
}