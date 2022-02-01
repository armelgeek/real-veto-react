import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { PRODUCTS } from "../../../constants/routes";
import { updateProduct } from "../../../store/actions/products";
import Error from "../../../utils/admin/Resource/Error";
import Success from "../../../utils/admin/Resource/Success";
import Form from "../../../utils/form";
import { action, getData } from "../../../utils/lib/call";
import { validationSchema } from "./validation";

function Edit() {
  const { id } = useParams();
  const fournisseurs = useSelector(getData("fournisseurs").value);
  const categories = useSelector(getData("categories").value);
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const history = useHistory();
  const [categoryId, setCategoryId] = useState(1);
  const [cond, setCond] = useState(1);
  const [qttCcPVente, setQttCcPVente] = useState(0);
  const [prixQttCcVente, setPrixQttCCVente] = useState(0);
  const dispatch = useDispatch();

  const [flac, setFlac] = useState(products[0]?.type);
  useEffect(() => {
    dispatch(action("products").get(id));
    setFlac(products[0]?.type);
    setPrixQttCCVente(products[0]?.prixqttccvente);
    setQttCcPVente(products[0]?.qttccpvente);
  }, [id]);

  useEffect(() => {
    dispatch(action("fournisseurs").fetch());
    dispatch(action("categories").fetch());
  }, [history]);
  return (
    <Content>
      <ContentHeader title="Editer un article">
        <ActiveLink title="Editer un article"></ActiveLink>
      </ContentHeader>
      <Page>
      
        {meta.success != "" && meta.success != null && (
          <Success message={meta.success} />
        )}
        {meta.error && <Error error={meta.error} />}

        <Form
          id="add-form-product"
          enableReinitialize
          initialValues={Form.initialValues(products[0], (get) => ({
            name: get("name"),
            type:  get("type"),
            doseDefault: get("doseDefault"),
            prixVente: parseFloat(get("prixVente")),
            prixFournisseur: parseFloat(get("prixFournisseur")),
            prixVaccinateur: parseFloat(get("prixVaccinateur")),
            prixParCC: parseFloat(get("prixParCC")),
            datePer:  get("datePer"),
            uniteMesure: "ml",
            qttByCC: parseInt(get("prixParCC")),
            conditionnement: parseInt(get("conditionnement")),
            categoryId: parseInt(get("categoryId")),
            datePer: get("datePer"),
            fournisseurId: parseInt(get("fournisseurId")),
            condml: parseInt(get("condml")==null ? 0  : get("condml")),
            condsize: parseInt(get("condsize")==null ? 0 : get("condsize")),
            qttccpvente: parseInt(get("qttccpvente")==null ? 0  : get("qttccpvente")),
            prixqttccvente: parseInt(get("prixqttccvente")==null ? 0  : get("prixqttccvente")),
            
          }))}
          validations={validationSchema}
          onSubmit={(values, form) => {
            const {
              name,
              type,
              doseDefault,
              prixVente,
              prixFournisseur,
              prixVaccinateur,
              prixParCC,
              datePer,
              fournisseurId,
              categoryId,
              condml,
              condval,
              qttccpvente,
              prixqttccvente,
              conditionnement
            } = values;
            dispatch(
              action("products").update({
                id: products[0]?.id,
                name: name,
                type: type,
                doseDefault: doseDefault,
                prixVente: parseFloat(prixVente),
                prixFournisseur: parseFloat(prixFournisseur),
                prixVaccinateur: parseFloat(prixVaccinateur),
                prixParCC: parseFloat(prixParCC),
                datePer: new Date(datePer),
                qttByCC: parseFloat(products[0]?.qttByCC),
                quantityBrute: parseFloat(products[0]?.quantityBrute),
                quantityBruteCVA: parseFloat(products[0]?.quantityBruteCVA),
                quantityCCCVA: parseFloat(products[0]?.quantityCCCVA),
                quantityCC: parseFloat(products[0]?.quantityCC),
                uniteMesure: "ml",
                condml: parseFloat(condml),
                condval: parseFloat(condval),
                qttccpvente: parseFloat(qttccpvente),
                fournisseurId: parseInt(fournisseurId),
                categoryId: parseInt(categoryId),
                conditionnement: parseInt(conditionnement),
                prixqttccvente: parseInt(prixqttccvente),
                updatedAt: new Date(),
              })
            );
            history.push(PRODUCTS);
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
                  {JSON.stringify(values)}
                      <Form.Field.Select
                        name="categoryId"
                        label="Categorie"
                        valueKey="name"
                        selectValue={products[0]?.categoryId}
                        options={categories}
                      />
                      <Form.Field.Select
                        name="fournisseurId"
                        label="Fournisseur"
                        valueKey="name"
                        selectValue={products[0]?.fournisseurId}
                        options={fournisseurs}
                      />
                      <Form.Field.Input
                        name="name"
                        label="Désignation"
                        placeholder={"Désignation"}
                      />
                       <Form.Field.Select
                        name="type"
                        label="Type d'article"
                        emptyValue={false}
                        isNumeric={false}
                        valueKey="name"
                        options={[
                          { id: "BOLUS", name: "BOLUS" },
                          { id: "FLACON", name: "FLACON" },
                          { id: "UNITE", name: "UNITE" },
                          { id: "SACHET", name: "SACHET" },
                        ]}
                      />
                      {values.type ===  "FLACON" && (
                        <div className="ml-3">
                          <Form.Field.Number
                            name="doseDefault"
                            label="Quantité en ml"
                            placeholder={"Quantité en ml"}
                          />
                          <Form.Field.Select
                            name="conditionnement"
                            label="Conditionnement"
                            valueKey="name"
                            emptyValue={false}
                            options={[
                              { id: 1, name: "Sans conditionnement" },
                              { id: 2, name: "Avec conditionnement" },
                            ]}
                          />
                          {values.conditionnement == 2 && (
                            <>
                              <Form.Field.Number
                                name="condml"
                                label="Conditionnement"
                                placeholder={"Conditionnement en ML"}
                              />
                              <Form.Field.Number
                                name="condsize"
                                label="Diviser par "
                                placeholder={"Diviser par"}
                              />
                              <Form.Field.Number
                                name="qttccpvente"
                                label="Conditionnement de vente par ML"
                                placeholder={"Quantité cc par vente."}
                              />
                              <Form.Field.Number
                                name="prixqttccvente"
                                disabled={
                                  values.qttccpvente == null || values.qttccpvente == ""
                                }
                                label={`Prix de vente equivalent à ${values.qttccpvente} ML.`}
                                placeholder={`Prix de vente equivalent à ${values.qttccpvente} ML.`}
                              />
                            </>
                          )}
                        </div>
                      )}

                      <Form.Field.Date
                        type="date"
                        name="datePer"
                        label="date de peremption"
                        placeholder={"date de peremption"}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header bg-dark text-white">Vente</div>
                    <div className="card-body">
                      <Form.Field.Number
                        name="prixFournisseur"
                        label="prix unitaire"
                        placeholder={"prix unitaire"}
                      />

                      <Form.Field.Number
                        name="prixVente"
                        label="Prix de vente"
                        placeholder={"prix de vente"}
                      />
                      {flac == "FLACON" && (
                        <Form.Field.Number
                          type={
                            qttCcPVente == null || qttCcPVente == ""
                              ? "text"
                              : "text"
                          }
                          data={
                            qttCcPVente != 0 &&
                            qttCcPVente != "" &&
                            prixQttCcVente / qttCcPVente != "Infinity"
                              ? prixQttCcVente / qttCcPVente
                              : 0
                          }
                          name="prixParCC"
                          label={"Prix de vente ml"}
                          placeholder={"Prix de vente ml"}
                        />
                      )}
                      <Form.Field.Number
                        name="prixVaccinateur"
                        label="Prix du vaccinateur"
                        placeholder={"prix du vaccinateur"}
                      />
                    </div>
                  </div>

                  <button className="btn btn-green  btn-sm " type="submit">
                    Editer
                  </button>
                  <button className="btn btn-danger ml-2 btn-sm " type="reset">
                    Annuler
                  </button>
                </div>
              </div>
            </Form.Element>
          )}
        />
      </Page>
    </Content>
  );
}

export default Edit;
