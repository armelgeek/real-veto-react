import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import Form from "../../utils/form";
import { action, getData } from "../../utils/lib/call";
const AddProd = () => {
  const { id } = useParams();
  const fournisseurs = useSelector(getData("fournisseurs").value);
  const categories = useSelector(getData("categories").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(action("fournisseurs").fetch());
    dispatch(action("categories").fetch());
    dispatch(action("products").fetch());
  }, []);
  return (
    <Content>
      <ContentHeader title="Ajouter un produit">
        <ActiveLink title="Ajouter un produit"></ActiveLink>
      </ContentHeader>
      <Page>
        <Form
          id="add-form-product"
          enableReinitialize
          initialValues={{
            
          }}
          validations={{}}
          onSubmit={(values, form) => {
            console.log(values);
          }}
        >
          <Form.Element>
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header bg-dark text-white">
                    <h5>Information générale</h5>
                  </div>

                  <div className="card-body">
                    <Form.Field.Select
                      name="categoryId"
                      label="Categorie"
                      valueKey="name"
                      options={categories}
                    />
                    <Form.Field.Select
                      name="fournisseurId"
                      label="Fournisseur"
                      valueKey="name"
                      options={fournisseurs}
                    />
                    <Form.Field.Input
                      name="name"
                      label="Désignation"
                      placeholder={"Désignation"}
                    />
                    <Form.Field.Radio
                      radioValue={"1"}
                      valueKey="name"
                      label="Type d'article"
                      name="type"
                      options={[
                        { id: "BOLUS", name: "BOLUS" },
                        { id: "FLACON", name: "FLACON" },
                        { id: "UNITE", name: "UNITE" },
                        { id: "SACHET", name: "SACHET" },
                      ]}
                      direction="row"
                    />
                    <Form.Field.Input
                      name="prixFournisseur"
                      label="prix unitaire"
                      placeholder={"prix unitaire"}
                    />
                    <Form.Field.Input
                      name="quantity"
                      label="Quantité"
                      placeholder={"Quantité"}
                    />
                    <Form.Field.Input
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
                  <div className="card-header bg-dark text-white" >
                    <h5>Vente</h5>
                  </div>

                  <div className="card-body">
                    <Form.Field.Input
                      name="prixVente"
                      label="Prix de vente"
                      placeholder={"prix de vente"}
                    />

                    <Form.Field.Input
                      name="prixVaccinateur"
                      label="Prix du vaccinateur"
                      placeholder={"prix du vaccinateur"}
                    />
                    <Form.Field.Input
                      name="prixParCC"
                      label="Prix de Vente en ml"
                      placeholder={"Prix de Vente en ml"}
                    />
                  </div>
                </div>
                <button className="btn btn-green  btn-sm " type="submit">
                  Ajouter
                </button>
              </div>
            </div>
          </Form.Element>
        </Form>
      </Page>
    </Content>
  );
};

export default AddProd;
