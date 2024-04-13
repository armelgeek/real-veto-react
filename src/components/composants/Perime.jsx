import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import { fetchProductsPerime } from "../../store/actions/products";
import DataTable from "../../utils/admin/DataTable";
import { displayDate } from "../../utils/functions";
import { action, getData } from "../../utils/lib/call";

export const Perime = () => {
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsPerime());
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
      },
      {
        Header: "Date de peremption",
        Cell: (data) => {
          return <h3>{displayDate(data.row.original?.datePer)}</h3>;
        },
      },
    ],
    []
  );
  return (
    <Content>
      <ContentHeader title="Article perimé">
        <ActiveLink title="Article perimé"></ActiveLink>
      </ContentHeader>
      <Page>
        <DataTable data={products} meta={meta} columns={columns} />
      </Page>
    </Content>
  );
};
