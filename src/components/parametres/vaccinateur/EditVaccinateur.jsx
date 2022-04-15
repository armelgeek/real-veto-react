import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import Form from "../../../utils/form";
import { action, getData } from "../../../utils/lib/call";
import { validationSchema } from "./validation";
function EditVaccinateur() {
  const { id } = useParams();
  const vaccinateurs = useSelector(getData("vaccinateurs").value);
  const meta = useSelector(getData("vaccinateurs").meta);
  const [proda, setProda] = useState({
    name: "",
    contact: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const [formVal, setFormVal] = useState({});
  useEffect(() => {
    dispatch(action("vaccinateurs").fetch());
  }, [id]);
  useEffect(() => {
    if (!meta.isFetching) {
      setProda(vaccinateurs?.find((p) => p.id == id));
    }
  }, [meta]);
  return (
    <Content>
      <ContentHeader title="Editer un vaccinateur">
        <ActiveLink title="Editer un vaccinateur"></ActiveLink>
      </ContentHeader>
      <Page>
        <Form
          id="add-form-vaccinateur"
          initialValues={{
            name: proda.name,
            contact: proda.contact,
          }}
          validations={validationSchema}
          onSubmit={(values, form) => {
            const { name, contact } = values;
            dispatch(
              action("vaccinateurs").update({
                id: proda.id,
                name: name,
                conact: contact,
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
                        value={values?.name}
                        label="Nom"
                        placeholder={"Nom"}
                      />
                      <Form.Field.Input
                        name="contact"
                        value={values?.contact}
                        label="Téléphone"
                        placeholder={"Téléphone"}
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

export default EditVaccinateur;
