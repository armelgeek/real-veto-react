import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { PRODUCTS } from "../../../constants/routes";
import { fetchProductsById } from "../../../store/actions/products";
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
  const [proda, setProda] = useState({
    name: '',
    type: '',
    doseDefault: '',
    prixlitre:'',
    prixVente: '',
    prixFournisseur: '',
    prixVaccinateur: '',
    prixParCC: '',
    datePer: '',
    uniteMesure: "ml",
    conditionnement: '',
    categoryId: '',
    datePer: '',
    fournisseurId: '',
    condml:'',
    condsize: '',
    qttccpvente:'',
    prixqttccvente:'',
  });
  const history = useHistory();
  const [categoryId, setCategoryId] = useState(1);
  const [cond, setCond] = useState(1);
  const [qttCcPVente, setQttCcPVente] = useState(0);
  const [prixQttCcVente, setPrixQttCCVente] = useState(0);
  const dispatch = useDispatch();

  const [formVal, setFormVal] = useState({});
  const [flac, setFlac] = useState(proda.type);
  useEffect(() => {
    dispatch(action("products").fetch());
    setFlac(proda.type);
    setPrixQttCCVente(proda.prixqttccvente);
    setQttCcPVente(proda.qttccpvente);
  }, [id]);
  useEffect(() => {
    if (!meta.isFetching) {
      setProda(products?.find((p) => p.id == id));
      setFormVal({
        name: proda.name,
      });
    }
  }, [meta]);
  useEffect(() => {
    dispatch(action("fournisseurs").fetch());
    dispatch(action("categories").fetch());
  }, []);
  return (
    <Content>
      <ContentHeader title="Editer un produit">
        <ActiveLink title="Editer un produit"></ActiveLink>
      </ContentHeader>
      <Page>
        {meta.success != "" && meta.success != null && (
          <Success message={meta.success} />
        )}
        {products.name}
        {meta.error && <Error error={meta.error} />}
        <Form
          id="add-form-product"
          initialValues={{
            name: proda.name,
            type: proda.type,
            doseDefault: proda.doseDefault,
            prixlitre:proda.prixlitre,
            prixVente: proda.prixVente,
            prixFournisseur: proda?.prixFournisseur,
            prixVaccinateur: proda.prixVaccinateur,
            prixParCC: proda.prixParCC,
            datePer: proda.datePer,
            uniteMesure: "ml",
            conditionnement: proda.conditionnement,
            categoryId: proda.categoryId,
            datePer: proda.datePer,
            fournisseurId: proda.fournisseurId,
            condml: proda.condml == null ? 0 : proda.condml,
            condsize: proda.condsize == null ? 0 : proda.condsize,
            qttccpvente:
              proda.qttccpvente == null ? 0 : proda.qttccpvente,
            prixqttccvente:
              proda.prixqttccvente == null ? 0 : proda.prixqttccvente,
              
          }}
          validations={validationSchema}
          onSubmit={(values, form) => {
            const {
              name,
              type,
              doseDefault,
              prixlitre,
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
              conditionnement,
              condsize
            } = values;
            dispatch(
              action("products").update({
                id: proda.id,
                name: name,
                type: type,
                doseDefault: doseDefault,
                prixVente: parseFloat(prixVente),
                prixFournisseur: parseFloat(prixFournisseur),
                prixVaccinateur: parseFloat(prixVaccinateur),
                prixlitre:parseFloat(prixlitre),
                prixParCC: parseFloat(prixParCC),
                datePer: new Date(datePer),
                qttByCC: parseFloat(proda.qttByCC),
                quantityBrute: parseFloat(proda.quantityBrute),
                quantityBruteCVA: parseFloat(proda.quantityBruteCVA),
                quantityCCCVA: parseFloat(proda.quantityCCCVA),
                quantityCC: parseFloat(proda.quantityCC),
                uniteMesure: "ml",
                condml: parseFloat(condml),
                condsize: parseFloat(condsize),
                qttccpvente: parseFloat(qttccpvente),
                fournisseurId: parseInt(fournisseurId),
                categoryId: parseInt(categoryId),
                conditionnement: parseInt(conditionnement),
                prixqttccvente: parseInt(prixqttccvente),
                updatedAt: new Date(),
                refSortie: "0",
                refQtSortie: 0,
                qttByCCDepot: 0,
                condmldepot: 0,
                condvaldepot: 0,qttyspecificmirror:0,
                qttccpventedepot: 0,
                prixqttccventedepot: 0,
                quantityParProductDepot: 0,
                condsizedepot: 0,
                qttbylitre: 0,
                remise: 0,
                condval: 0,
                correction: 0,
                correctionml: 0,
                correctionl: 0,
                correctiontml: 0,
                correctiontl: 0,
                correctiontype: 0,
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
                      <Form.Field.Select
                        name="categoryId"
                        label="Categorie"
                        valueKey="name"
                        selectValue={proda.categoryId}
                        options={categories}
                      />
                      <Form.Field.Select
                        name="fournisseurId"
                        label="Fournisseur"
                        valueKey="name"
                        selectValue={proda.fournisseurId}
                        options={fournisseurs}
                      />
                      <Form.Field.Input
                        name="name"
                        value={values?.name}
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
                      {values.type === "FLACON" && (
                        <div className="ml-3">
                          <Form.Field.Input
                            name="doseDefault"
                            label="Quantité en ml ou dose ou litre"
                            placeholder={"Quantité en ml ou dose ou litre"}
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

                              <Form.Field.Input
                                name="condml"
                                label="Conditionnement (ML)"
                                placeholder={"Conditionnement en ML"}
                              />
                              <Form.Field.Input
                                name="condsize"
                                label="Diviser en combien de flacon"
                                placeholder={"Diviser en combien de flacon"}
                              />
                              <Form.Field.Input
                                name="qttccpvente"
                                label="Quantité de vente en ML"
                                placeholder={"Quantité de vente en ML"}
                              />
                              <Form.Field.Input
                                name="prixqttccvente"
                                value={values?.prixqttccvente}
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
                    <div className="card-header bg-dark text-white">Vente</div>
                    <div className="card-body">
                      <Form.Field.Input
                        name="prixFournisseur"
                        value={values?.prixFournisseur}
                        label="prix unitaire"
                        placeholder={"prix unitaire"}
                      />
                      {values.conditionnement == 2 && (
                        <Form.Field.Input
                           name="prixlitre"
                           value={values?.prixlitre}
                           label="Prix d'un litre"
                            placeholder={"Prix d'un litre"}
                                />)}
                      <Form.Field.Input
                        name="prixVente"
                        label="Prix de vente"
                        value={values?.prixVente}
                        placeholder={"prix de vente"}
                      />
                      {flac == "FLACON" && (
                        <Form.Field.Input
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
                      <Form.Field.Input
                        value={values?.prixVaccinateur}
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
