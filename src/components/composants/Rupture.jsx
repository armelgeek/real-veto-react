import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRuptureStock } from '../../store/actions/products';
import { action, getData } from '../../utils/lib/call';

import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
export const Rupture = () => {
    const products = useSelector(getData("products").value);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchProductsRuptureStock());
    }, []);
    return (
        <Content>
        <ContentHeader title="Article en rupture de stock">
          <ActiveLink title="Article en rupture de stock"></ActiveLink>
        </ContentHeader>
        <Page>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Nom de l'article</th>
                <th>Quantité</th>
                <th style={{ width: "30%" }}>Date de peremption</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr>
                  <td>{p.name}</td>
                  <td>{p.quantityBrute}</td>
                  <td>{p.datePer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Page>
      </Content>
    )
}
