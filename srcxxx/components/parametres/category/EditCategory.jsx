import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import {  CATEGORIES } from "../../../constants/routes";
import Form from "../../../utils/form";
import { action, getData } from "../../../utils/lib/call";
import { validationSchema } from "./validation";
function EditCategorie() {
  const { id } = useParams();
  const categories = useSelector(getData("categories").value);
  const meta = useSelector(getData("categories").meta);
  const [proda, setProda] = useState({
    name: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const [formVal, setFormVal] = useState({});
  useEffect(() => {
    dispatch(action("categories").fetch());
  }, [id]);
  useEffect(() => {
    if (!meta.isFetching) {
      setProda(categories?.find((p) => p.id == id));
    }
  }, [meta]);
  return (
    <Content>
      <ContentHeader title="Editer un categorie">
        <ActiveLink title="Editer un categorie"></ActiveLink>
      </ContentHeader>
      <Page>
        <Form
          id="add-form-categorie"
          initialValues={{
            name: proda.name,
          }}
          validations={validationSchema}
          onSubmit={(values, form) => {
            const { name } = values;
            dispatch(
              action("categories").update({
                id: proda.id,
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
                        value={values?.name}
                        label="Nom"
                        placeholder={"Nom"}
                      />
                      <div className="mt-3">
                        <button
                          className="btn btn-green  btn-sm "
                          type="submit"
                        >
                          Editer
                        </button>
                        <button
                          className="btn btn-danger ml-2 btn-sm "
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
  );
}

export default EditCategorie;
