import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { ADMIN, CREATEPRODUCT, EDITPRODUCT } from "../../../constants/routes";
import { action, getData } from "../../../utils/lib/call";
import NumberFormat from "react-number-format";
import ReactToPrint from "react-to-print";
import $ from "jquery";
import { Flex, Button } from "@chakra-ui/react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Drop from "../../../utils/admin/Resource/Drop";
import Success from "../../../utils/admin/Resource/Success";
import Error from "../../../utils/admin/Resource/Error";
import DataTable from "../../../utils/admin/DataTable";
import { displayMoney } from "../../../utils/functions";
import Nav from "../../../utils/admin/Nav";
import Guide from "./Guide";
import { CrudAction } from "../../../utils/admin/Resource/CrudAction";
import { ActionCreators } from "react-redux-undo";
import { SCOPES } from "../../../constants/permissions";
//initialize datatable
/*   $(document).ready(function () {
      $('table').DataTable();
  });*/
export const ProductAll = () => {
  const products = useSelector(getData("products").value) || [];
  const meta = useSelector(getData("products").meta);
  const ref = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  const deleteProduct = (prod) => {
    dispatch(action("products").destroy(prod));
    dispatch(action("products").fetch());
  };

  const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Produit",
      accessor: "name",
    },
    {
      Header: "Fournisseur",
      Cell: (data) => {
        return (
          <>
            <span className="badge badge-primary">
              {data.row.original?.fournisseur != null ? data.row.original?.fournisseur?.name : ""}
            </span>
          </>
        );
      },
    },
    {
      Header: "Quantité",
      accessor: "quantityBrute",
    },
    {
      Header: "Reste en ML",
      accessor: "quantityCC",
    },
    {
      Header: "Prix unitaire",
      Cell: (data) => {
        return <div>{displayMoney(data.row.original?.prixFournisseur)}</div>;
      },
    },
    {
      Header: "Prix de vente",
      Cell: (data) => {
        return <div>{displayMoney(data.row.original?.prixVente)}</div>;
      },
    },

    {
      Header: "Prix en ML",
      Cell: (data) => {
        return (
          <div>
            {data.row.original?.qttccpvente != 0
              ? displayMoney(
                data.row.original?.prixParCC *
                data.row.original?.qttccpvente
              )
              : displayMoney(data.row.original?.prixParCC)}
          </div>
        );
      },
    },

    {
      Header: "Actions",
      Cell: (data) => {
        return (
          <CrudAction
            edit={[SCOPES.canShowEditProduit]}
            detail={[SCOPES.canShowDetailProduit]}
            remove={[SCOPES.canShowDeleteProduit]}
            route={"product"}
            model={"products"}
            modelKey={"name"}
            data={data}
          />
        );
      },
    },
  ];
  return (
    <Content>
      <ContentHeader title="Tous les produits">
        <ActiveLink title="Tous les produits"></ActiveLink>
      </ContentHeader>
      <Page>
        <DataTable
          data={products}
          scopes={[SCOPES.canShowAddProduit]}
          meta={meta}
          columns={columns}
          addUrl={CREATEPRODUCT}
          urlName={"Ajouter un produit"}
        />
      </Page>
    </Content>
  );
};
