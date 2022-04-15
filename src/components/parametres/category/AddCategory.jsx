import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../utils/form";
import { CATEGORIES } from "../../../constants/routes";
import { validationSchema } from "./validation";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { action, getData } from "../../../utils/lib/call";
import { useHistory } from 'react-router-dom';
function CreateCategory() {
  const categories = useSelector(getData("categories").value);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <>
      <Content>
        <ContentHeader title="Ajouter un categorie">
          <ActiveLink title="Ajouter un categorie"></ActiveLink>
        </ContentHeader>
        <Page>
          <Form
            id="add-form-categorie"
            enableReinitialize
            initialValues={{
              name: "",
            }}
            validations={validationSchema}
            onSubmit={(values, form) => {
              const { name } = values;
              dispatch(
                action("categories").create({
                  name: name,
                })
              );
              history.push(CATEGORIES);
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
                        </button></div>
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

export default CreateCategory;
