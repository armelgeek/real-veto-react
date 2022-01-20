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
  const [qttCcPVente, setQttCcPVente] = useState(0);
  const [prixQttCcVente, setPrixQttCCVente] = useState(0);
  const dispatch = useDispatch();

  const [flac, setFlac] = useState(products[0]?.type);
  useEffect(() => {
    dispatch(action("products").get(id));
    setFlac(products[0]?.type);
    setPrixQttCCVente(products[0]?.prixqttccvente);
    setQttCcPVente(products[0]?.qttccpvente)
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
            type: get("type"),
            doseDefault: get("doseDefault"),
            prixVente: get("prixVente"),
            prixFournisseur: get("prixFournisseur"),
            prixVaccinateur: get("prixVaccinateur"),
            prixParCC: get("prixParCC"),
            datePer: get("datePer"),
            uniteMesure: get("uniteMesure"),
            qttByCC: get("prixParCC"),
            
           fournisseurId: get("fournisseurId"),
           categoryId: get("categoryId"),
          //  condml: get("condml"),
          //  condval: get("condval"),
          //  qttccpvente: get("qttccpvente"),
          //  prixqttccvente: get("prixqttccvente")
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
            //  condml,
            //  condval,
            //  qttccpvente,
            //  prixqttccvente,
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
                datePer: datePer,
                qttByCC: parseFloat(products[0]?.qttByCC),
                quantityBrute: parseFloat(products[0]?.quantityBrute),
                quantityBruteCVA: parseFloat(products[0]?.quantityBruteCVA),
                quantityCCCVA: parseFloat(products[0]?.quantityCCCVA),
                quantityCC: parseFloat(products[0]?.quantityCC),
                uniteMesure: "ml",
              //  condml: parseFloat(condml),
             //   condval: parseFloat(condval),
              //  qttccpvente: parseFloat(qttccpvente),
              //  fournisseurId: parseInt(fournisseurId),
              //  categoryId: parseInt(categoryId),
                //prixqttccvente:parseInt(prixqttccvente),
                updatedAt: new Date(),
              })
            );
            history.push(PRODUCTS);
          }}
        >
          <Form.Element>
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header bg-dark text-white">Information générale</div>
                  <div className="card-body">
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
                      valueKey="name"
                      setData={setFlac}
                      options={[
                        { id: "BOLUS", name: "BOLUS" },
                        { id: "FLACON", name: "FLACON" },
                        { id: "UNITE", name: "UNITE" },
                        { id: "SACHET", name: "SACHET" },
                      ]}
                    />
                    {flac == "FLACON" && (
                      <>
                        <Form.Field.Input
                          style={{
                            display: flac == "FLACON" ? "block" : "none",
                          }}
                          name="doseDefault"
                          label={flac == "FLACON" ? "Quantité en ml" : ""}
                          placeholder={"Quantité en ml"}
                        />
                      {/**  {categoryId == 1 && (
                          <>
                            <Form.Field.Input
                              name="condml"
                              label="Conditionnement en ML"
                              placeholder={"Conditionnement en ML"}
                            />
                            <Form.Field.Input
                              name="condval"
                              label="Conditionnement Valeur"
                              placeholder={"Valeur cond."}
                            />
                            <Form.Field.Input
                              name="qttccpvente"
                              label="Quantité cc par vente"
                              placeholder={"Quantité cc par vente."}
                            />
                             <Form.Field.Input
                              name="qttccpvente"
                              label="Quantité cc par vente"
                              setData={setQttCcPVente}
                              placeholder={"Quantité cc par vente."}
                            />
                            <Form.Field.Input
                              name="prixqttccvente"
                              disabled={
                                qttCcPVente == null || qttCcPVente == ""
                              }
                              setData={setPrixQttCCVente}
                              label={`Prix equivalent à ${qttCcPVente} cc par vente.`}
                              placeholder={`Prix equivalent à ${qttCcPVente} cc par vente.`}
                            />
                          </>
                        )} */}
                      </>
                    )}
                    <Form.Field.Input
                      type="date"
                      name="datePer"
                      label="date de peremption"
                      placeholder={"date de peremption"}
                    />
                    {/**
          <Form.Field.Radio
            radioValue={"1"}
            valueKey="name"
            label="Unité de mesure"
            name="uniteMesure"
            options={[
              { id: "mg", name: "g" },
              { id: "g", name: "mg" },
              { id: "ml", name: "ml" },
              { id: "l", name: "l" },
            ]}
            direction="row"
          /> */}
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header bg-dark text-white">Vente</div>
                  <div className="card-body">
                    <Form.Field.Input
                      name="prixFournisseur"
                      label="prix unitaire"
                      placeholder={"prix unitaire"}
                    />

                    {/** Prix du fournisseur */}

                    <Form.Field.Input
                      name="prixVente"
                      label="Prix de vente"
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
        </Form>
      </Page>
    </Content>
  );
}

export default Edit;
