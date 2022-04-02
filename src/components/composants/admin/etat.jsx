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
import { displayMoney } from "../../../utils/functions";
import DataTable from "../../../utils/admin/DataTable";
//initialize datatable
/*   $(document).ready(function () {
      $('table').DataTable();
  });*/
export const EtatStockMagasin = () => {
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);

  const columns = React.useMemo(() => [
    {
      Header: "Nom de l'article",
      accessor: "name",
    },
    {
      Header: "Fournisseur",
      Cell: (data) => {
        return (
          <div>
            <h3 className="badge badge-primary">
              {data.row.original?.fournisseur.name}
            </h3>
          </div>
        );
      },
    },
    {
      Header: "Quantité",
      accessor: "quantityBruteCVA",
    },
    {
      Header: "Reste en ML",
      accessor: "quantityCC",
      Cell: (data) => {
        return (
          <div>
            {data.row.original?.quantityCCCVA == null
              ? 0
              : data.row.original?.quantityCCCVA}
          </div>
        );
      },
    },
  ]);

  return (
    <Content>
      <ContentHeader title="Etat de stock du Magasin">
        <ActiveLink title="Etat de stock du Magasin"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="text-uppercase">Etat de stock du Magasin</h3>
            </div>
          </div>
          <div className="col-lg-6 text-right"></div>{" "}
        </div>
        <DataTable
          data={products.sort(
            (low, high) => high.quantityBruteCVA - low.quantityBruteCVA
          )}
          meta={meta}
          columns={columns}
        />
      </Page>
    </Content>
  );
};
