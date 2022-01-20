import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { CREATEPRODUCT, EDITPRODUCT } from "../../../constants/routes";
import { action, getData } from "../../../utils/lib/call";
import NumberFormat from "react-number-format";
import ReactToPrint from "react-to-print";
import $ from "jquery";
import { displayMoney } from '../../../utils/functions';
//initialize datatable
/*   $(document).ready(function () {
      $('table').DataTable();
  });*/
export const EtatStockMagasin = () => {
  const products = useSelector(getData("products").value);
  const ref = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  const deleteProduct = (prod) => {
    dispatch(action("products").destroy(prod));
    dispatch(action("products").fetch());
  };
  return (
    <Content>
      <ContentHeader title="Etat de stock du Magasin">
        <ActiveLink title="Etat de stock du Magasin"></ActiveLink>
      </ContentHeader>
      <Page>
       
        <table class="table table-bordered mt-2" ref={ref}>
          <thead>
            <tr>
              <th style={{ width: "10px" }}>#</th>
              <th>Nom de l'article</th>
              <th>Quantité</th>
              <th>Reste en ML</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr>
                <td>{p.id}</td>
                
                <td>{p.name} <span className="badge badge-primary">{p?.fournisseur?.name}</span></td>
              
                <td>{p?.quantityBruteCVA}</td>
                <td>
                  {p.quantityCCCVA ==null ? 0 : p.quantityCCCVA}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </Content>
  );
};
