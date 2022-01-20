import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import {useParams}  from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import NumberFormat from "react-number-format";

function DetailProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(getData("products").value);
  useEffect(() => {
    dispatch(action("products").get(id));
  }, [id]);
  return (
    <Content>
      <ContentHeader title="Détail de l'article">
        <ActiveLink title="Détail de l'article"></ActiveLink>
      </ContentHeader>
      <Page>
        <table>
          <tr>
            <td>
              <strong>Nom de l'article:</strong>
            </td>
            <td>{products[0]?.name} </td>
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
            <td>{products[0]?.doseDefault} </td>
          </tr>
          <tr>
            <td>
              <strong>Prix de vente:</strong>
            </td>
            <td>
              <NumberFormat
                value={products[0]?.prixVente}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"Ar"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            </td>
          </tr>

          <tr>
            <td>
              <strong>Prix du fournisseur:</strong>
            </td>
            <td>
              <NumberFormat
                value={products[0]?.prixFournisseur}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"Ar"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            </td>
          </tr>

          <tr>
            <td>
              <strong>Prix pour le vaccinateur:</strong>
            </td>
            <td>
              <NumberFormat
                value={products[0]?.prixVaccinateur}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"Ar"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            </td>
          </tr>

          <tr>
            <td>
              <strong>Prix par CC:</strong>
            </td>
            <td>
              <NumberFormat
                value={products[0]?.prixParCC}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"Ar"}
                renderText={(value, props) => <div {...props}>{value}</div>}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Date de peremption:</strong>
            </td>
            <td>{products[0]?.datePer}</td>
          </tr>
          <tr>
            <td>
              <strong>Unité mesure :</strong>
            </td>
            <td>{products[0]?.uniteMesure}</td>
          </tr>
          <tr>
            <td>
              <strong>Fournisseur :</strong>
            </td>
            <td>{products[0]?.fournisseur?.name}</td>
          </tr>
          <tr>
            <td>
              <strong>Category :</strong>
            </td>
            <td>{products[0]?.category?.name}</td>
          </tr>
        </table>
      </Page>
    </Content>
  );
}

export default DetailProduct;
