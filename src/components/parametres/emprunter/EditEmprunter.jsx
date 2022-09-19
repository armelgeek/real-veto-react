import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { emprunteurs, PRODUCTS } from "../../../constants/routes";
import Form from "../../../utils/form";
import { action, getData } from "../../../utils/lib/call";
import { validationSchema } from "./validation";
function EditEmprunter() {
  const { id } = useParams();
  const emprunteurs = useSelector(getData("emprunters").value);
  const meta = useSelector(getData("emprunters").meta);
  const [proda, setProda] = useState({
    name: "",
    contact:""
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const [formVal, setFormVal] = useState({});
  useEffect(() => {
    dispatch(action("emprunters").fetch());
  }, [id]);
  useEffect(() => {
    if (!meta.isFetching) {
      setProda(emprunteurs?.find((p) => p.id == id));
    }
  }, [meta]);
  return (
    <Content>
      <ContentHeader title="Editer une personne">
        <ActiveLink title="Editer une personne"></ActiveLink>
      </ContentHeader>
      <Page>
        <Form
          id="add-form-emprunteur"
          initialValues={{
            name: proda?.name,
            contact: proda?.contact,
          }}
          validations={validationSchema}
          onSubmit={(values, form) => {
            const { name,contact } = values;
            dispatch(
              action("emprunters").update({
                id: proda.id,
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

export default EditEmprunter;
