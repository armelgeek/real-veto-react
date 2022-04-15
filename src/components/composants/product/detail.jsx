import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import NumberFormat from "react-number-format";
import { displayDate, displayMoney } from "../../../utils/functions";

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(getData("products").value);
  useEffect(() => {
    dispatch(action("products").get(id));
  }, []);
  const forceRerender = () => {
    return Math.random(10000);
  };
  return (
    <Content>
      <ContentHeader title="Détail du produit">
        <ActiveLink title="Détail du produit"></ActiveLink>
      </ContentHeader>
      <Page>
        {products[0]?.conditionnement != 2 ||
          (products[0]?.conditionnement != null && (
            <div className="card card-info">
              <div className="card-header">Conditionnement</div>
              <div className="card-body">
               <p>
                  Prix d'un litre:{" "}
                  <span className="badge badge-info">
                    {products[0]?.prixlitre}
                  </span>
                </p>
                <p>
                  Conditionnement (ML):{" "}
                  <span className="badge badge-info">
                    {products[0]?.condml}
                  </span>
                </p>
                <p>
                  Division en flacon:{" "}
                  <span className="badge badge-info">
                    {products[0]?.condsize}
                  </span>
                </p>
                <p>
                  Quantité de vente par ML:
                  <span className="badge badge-info">
                    {products[0]?.qttccpvente}
                  </span>
                </p>
                <p>
                  Prix de vente pour {products[0]?.qttccpvente} ML:{" "}
                  <span className="badge badge-info">
                    {displayMoney(products[0]?.prixqttccvente)}{" "}
                  </span>
                </p>
              </div>
            </div>
          ))}
        <table className="table table-striped">
          <tr className="bg-thead">
            <td >
              <strong>Nom de l'article:</strong>
            </td>
            <td>{products[0]?.name} </td>
          </tr>
          <tr>
            <td>
              <strong>Fournisseur :</strong>
            </td>
            <td>{products[0]?.fournisseur?.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Categorie :</strong>
            </td>
            <td>{products[0]?.category?.name}</td>
          </tr>

          <tr>
            <td>
              <strong>Type:</strong>
            </td>
            <td>{products[0]?.type} </td>
          </tr>
          <tr>
            <td>
              <strong>Dose:</strong>
            </td>
            <td>{products[0]?.doseDefault} ML </td>
          </tr>

          <tr>
            <td>
              <strong>Prix unitaire:</strong>
            </td>
            <td>{displayMoney(products[0]?.prixFournisseur)}</td>
          </tr>
          <tr>
            <td>
              <strong>Prix de vente:</strong>
            </td>
            <td>{displayMoney(products[0]?.prixVente)}</td>
          </tr>

          <tr>
            <td>
              <strong>Prix pour le vaccinateur:</strong>
            </td>
            <td>{displayMoney(products[0]?.prixVaccinateur)}</td>
          </tr>

          <tr>
            <td>
              <strong>Prix par ML:</strong>
            </td>
            <td>
              {products[0]?.qttccpvente != 0
                ? displayMoney(
                    products[0]?.prixParCC * products[0]?.qttccpvente
                  )
                : displayMoney(products[0]?.prixParCC)}
            </td>
          </tr>
        
        </table>
      </Page>
    </Content>
  );
}

export default DetailProduct;
