import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsRuptureStock } from "../../store/actions/products";
import { action, getData } from "../../utils/lib/call";

import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import { displayDate } from "../../utils/functions";
import DataTable from "../../utils/admin/DataTable";
export const Rupture = () => {
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsRuptureStock());
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Produit",
        accessor: "name",
      },
      {
        Header: "Quantité",
        accessor: "quantityBrute",
      }
    ],
    []
  );
  const paginate=(page,limit)=>{
    dispatch(fetchProductsRuptureStock(page,limit));
  }
  return (
    <Content>
      <ContentHeader title="Article en rupture de stock">
        <ActiveLink title="Article en rupture de stock"></ActiveLink>
      </ContentHeader>
      <Page>
        <DataTable data={products} meta={meta} columns={columns} func={paginate} />
      </Page>
    </Content>
  );
};
