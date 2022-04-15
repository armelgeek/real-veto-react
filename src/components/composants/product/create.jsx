import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createProduct } from "../../../store/actions/products";
import Form from "../../../utils/form";
import { action, getData } from "../../../utils/lib/call";
import { PRODUCTS } from "../../../constants/routes";
import { validationSchema } from "./validation";
import Guide from "./Guide";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import Content from "../../../@adminlte/adminlte/Content/index";
import Success from "../../../utils/admin/Resource/Success";
import Error from "../../../utils/admin/Resource/Error";
function Create() {
  const fournisseurs = useSelector(getData("fournisseurs").value);
  const categories = useSelector(getData("categories").value);
  const metacategories = useSelector(getData("categories").meta);
  const metafournisseurs = useSelector(getData("fournisseurs").meta);
  const meta = useSelector(getData("products").meta);
  const [qttCcPVente, setQttCcPVente] = useState(0);
  const [prixQttCcVente, setPrixQttCCVente] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(action("fournisseurs").fetch());
    dispatch(action("categories").fetch());
    dispatch(action("products").fetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <>
      <Content>
        <ContentHeader title="Ajouter un produit">
          <ActiveLink title="Ajouter un produit"></ActiveLink>
        </ContentHeader>
        <Page>
          {meta.success != "" && meta.success != null && (
            <Success message={meta.success} />
          )}
          {meta.error && <Error error={meta.error} />}

          <Form
            id="add-form-product"
            enableReinitialize
            initialValues={{
              name: "",
              type: "BOLUS",
              doseDefault: 0,prixlitre:0,
              prixVente: 0,
              prixFournisseur: 0,
              prixVaccinateur: 0,
              quantityParProduct: 0,
              prixParCC: 0,
              datePer: "",
              uniteMesure: "ml",
              qttByCC: 0,
              newStockBrute: 0,
              newStockCC: 0,
              fournisseurId: 1,
              qttyspecificmirror: 0,
              quantityBruteCVA: 0,
              categoryId: 1,
              quantityBrute: 0,
              quantityCCCVA: 0,
              quantityCC: 0,
              condml: 0,
              condval: 0,
              conditionnement: 1,
              qttccpvente: 0,
              prixqttccvente: 0,
            }}
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
                conditionnement,
                prixqttccvente,
                condsize,prixlitre
              } = values;
              dispatch(
                action("products").create({
                  name: name,
                  type: type,
                  doseDefault: doseDefault,
                  prixVente: parseFloat(prixVente),
                  prixlitre: parseFloat(prixlitre),
                  prixFournisseur: parseFloat(prixFournisseur),
                  prixVaccinateur: parseFloat(prixVaccinateur),
                  quantityParProduct: 0,
                  quantityBruteCVA: 0,
                  quantityBrute: 0,
                  quantityCCCVA: 0,
                  quantityCC: 0,
                  prixParCC: parseFloat(prixParCC),
                  datePer: new Date(),
                  uniteMesure: "ml",
                  qttByCC: 0,
                  newStockBrute: 0,
                  newStockCC: 0,
                  categoryId: parseInt(categoryId),
                  fournisseurId: parseInt(fournisseurId),
                  condml: parseFloat(condml),
                  condsize: parseFloat(condsize),
                  conditionnement: conditionnement,
                  qttccpvente: parseFloat(qttccpvente),
                  prixqttccvente: parseInt(prixqttccvente),
                  refSortie: "0",
                  refQtSortie: 0,
                  qttByCCDepot: 0,
                  condmldepot: 0,
                  condvaldepot: 0,
                  qttccpventedepot: 0,
                  prixqttccventedepot: 0,
                  quantityParProductDepot: 0,
                  condsizedepot: 0,
                  doseRestantEnMg: 0,
                  qttbylitre: 0,
                  remise: 0,
                  condval: 0,
                  correction: 0,
                  correctionml: 0,
                  correctionl: 0,
                  correctiontml: 0,
                  correctiontl: 0,
                  correctiontype: 0,
                  qttyspecificmirror: 0,
                  remisePerProduct: 1,
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
                        {metacategories.isFetching == true && (
                          <p>Recuperation des categories</p>
                        )}
                        <Form.Field.Select
                          name="categoryId"
                          label="Categorie"
                          emptyValue={true}
                          valueKey="name"
                          disabled={metacategories.isFetching}
                          defaultValue={1}
                          options={categories}
                        />
                        {metafournisseurs.isFetching == true && (
                          <p>Recuperation des fournisseurs</p>
                        )}

                        <Form.Field.Select
                          name="fournisseurId"
                          label="Fournisseur"
                          emptyValue={true}
                          valueKey="name"
                          options={fournisseurs}
                          disabled={metafournisseurs.isFetching}
                        />

                        <Form.Field.Input
                          name="name"
                          label="Désignation"
                          placeholder={"Désignation (Tikaz 1L )"}
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
                        {values.type === "FLACON" && (
                          <div className="ml-3">
                            <Form.Field.Input
                              name="doseDefault"
                              label="Quantité en ml ou dose ou en litre"
                              placeholder={"Quantité en ml ou dose ou en litre"}
                            />
                            <Form.Field.Select
                              name="conditionnement"
                              label="Conditionnement"
                              valueKey="name"
                              options={[
                                { id: 1, name: "Sans conditionnement" },
                                { id: 2, name: "Avec conditionnement" },
                              ]}
                            />
                            {values.conditionnement == 2 && (
                              <>
                                
                                <Form.Field.Input
                                  name="condml"
                                  defaultValue={0}
                                  label="Conditionnement (ML)"
                                  placeholder={"Conditionnement en ML"}
                                />
                                <Form.Field.Input
                                  name="condsize"
                                  defaultValue={0}
                                  label="Diviser en combien de flacon"
                                  placeholder={"Diviser en combien de flacon"}
                                />
                                <Form.Field.Input
                                  name="qttccpvente"
                                  defaultValue={0}
                                  label="Quantité de vente en ML"
                                  placeholder={"Quantité de vente en ML"}
                                />
                                <Form.Field.Input
                                  name="prixqttccvente"
                                  disabled={
                                    values.qttccpvente == null ||
                                    values.qttccpvente == ""
                                  }
                                  label={`Prix de vente equivalent à ${values.qttccpvente} ML.`}
                                  placeholder={`Prix de vente equivalent à ${values.qttccpvente} ML.`}
                                />
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header bg-dark text-white">
                        Vente
                      </div>
                      <div className="card-body">
                      {values.conditionnement == 2 && (<Form.Field.Input
                                   name="prixlitre"
                                   label="Prix d'un litre"
                                    placeholder={"Prix d'un litre"}
                                />)}
                        <Form.Field.Input
                          name="prixFournisseur"
                          defaultValue={0}
                          label="prix unitaire"
                          placeholder={"prix unitaire"}
                        />

                        {/** Prix du fournisseur */}

                        <Form.Field.Input
                          name="prixVente"
                          defaultValue={0}
                          label="Prix de vente"
                          placeholder={"prix de vente"}
                        />

                        <Form.Field.Input
                          name="prixVaccinateur"
                          defaultValue={0}
                          label="Prix du vaccinateur"
                          placeholder={"prix du vaccinateur"}
                        />
                        <>
                          {values.type === "FLACON" && (
                            <Form.Field.Input
                              data={
                                values.qttccpvente != 0 &&
                                values.qttccpvente != "" &&
                                values.prixqttccvente / values.qttccpvente !=
                                  "Infinity"
                                  ? values.prixqttccvente / values.qttccpvente
                                  : 0
                              }
                              name="prixParCC"
                              label={"Prix de vente ml"}
                              placeholder={"Prix de vente ml"}
                            />
                          )}
                        </>
                      </div>
                    </div>

                    <button className="btn btn-green  btn-sm " type="submit">
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
              </Form.Element>
            )}
          />
        </Page>
      </Content>
    </>
  );
}

export default Create;
