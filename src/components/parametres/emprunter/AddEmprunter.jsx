import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../utils/form";
import { validationSchema } from "./validation";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { action, getData } from "../../../utils/lib/call";
import { useHistory } from "react-router-dom";
function CreateEmprunteur() {
  const emprunteurs = useSelector(getData("emprunters").value);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <Content>
        <ContentHeader title="Ajouter un personne">
          <ActiveLink title="Ajouter un personne"></ActiveLink>
        </ContentHeader>
        <Page>
          <Form
            id="add-form-emprunters"
            enableReinitialize
            initialValues={{
              name: "",
              contact:""
            }}
            validations={validationSchema}
            onSubmit={(values, form) => {
              const { name, contact } = values;
              dispatch(
                action("emprunters").create({
                  name: name,
                  contact: contact,
                })
              );
              history.goBack();
            }}
            render={({ values }) => (
              <Form.Element>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header bg-dark text-white">
                        Information générale
                      </div>
                      <div className="card-body">
                        <Form.Field.Input
                          name="name"
                          label="Nom"
                          placeholder={"Nom"}
                        />
                        <Form.Field.Input
                          name="contact"
                          label="Téléphone"
                          placeholder={"Téléphone"}
                        />
                        <div className="mt-3">
                          <button
                            className="btn btn-green  btn-sm "
                            type="submit"
                          >
                            Ajouter
                          </button>
                          <button
                            className="btn btn-danger ml-2  btn-sm "
                            type="reset"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form.Element>
            )}
          />
        </Page>
      </Content>
    </>
  );
}

export default CreateEmprunteur;
