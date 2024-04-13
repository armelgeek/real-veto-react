import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
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
import {displayDate, displayMoney} from "../../../utils/functions";
import Nav from "../../../utils/admin/Nav";
import Guide from "./Guide";
import { CrudAction } from "../../../utils/admin/Resource/CrudAction";
import { ActionCreators } from "react-redux-undo";
import { SCOPES } from "../../../constants/permissions";
import {getAllProducts} from "../../../store/actions/products";
import moment from "moment/moment";
import 'moment/locale/fr';
moment.locale('fr');
import {SingleDatePicker} from "react-dates";
//initialize datatable
/*   $(document).ready(function () {
      $('table').DataTable();
  });*/

export const ProductAll = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [focused, setFocused] = useState(false);
  const products = useSelector(getData("products").value) || [];
  const meta = useSelector(getData("products").meta);
  const ref = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllProducts(currentDate));
  }, [currentDate]);
  const deleteProduct = (prod) => {
    dispatch(action("products").destroy(prod));
    dispatch(getAllProducts(currentDate));
  };
  const handlePreviousDay = () => {
    const previousDay = currentDate.clone().subtract(1, "day");
    setCurrentDate(previousDay);
  };
  const handleNextDay = () => {
    const nextDay = currentDate.clone().add(1, "day");
    setCurrentDate(nextDay);
  };
  const isOutsideRange = () => false; // Disable date range limitation

  const columns = [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Product",
      Cell: (data) => {
        return (
          <div className="d-flex">
            <span>
              {data.row.original?.name}
            </span>
            - 
            <span>
              {data.row.original?.fournisseur != null ? data.row.original?.fournisseur?.name : ""}
            </span>
          </div>
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
  const paginate=(page,limit)=>{
    console.log('page',page,'limit',limit);
    dispatch(getAllProducts(currentDate,page,limit));
  }
  return (
    <Content>
      <ContentHeader title="Tous les produits">
        <ActiveLink title="Tous les produits"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="d-flex  align-items-center justify-content-end my-2">
            <div className="label mr-3">
              <h5>Stock du : </h5>
            </div>
            <div className="d-flex align-items-center justify-content-end my-2">
              <button
                  className="btn btn-default btn-sm"
                  style={{
                    marginRight: 10,
                  }}
                  onClick={handlePreviousDay}
              >
                {"<"}
              </button>
              <div>

                <SingleDatePicker
                    date={currentDate}
                    onDateChange={date =>setCurrentDate(date )}
                    focused={focused}
                    onFocusChange={({ focused }) => setFocused(focused)}
                    id="single_date_picker_for_product_list"
                    showDefaultInputIcon={true}
                    isOutsideRange={isOutsideRange}
                    displayFormat={() => 'DD MMMM YYYY'}
                    monthFormat="MMMM YYYY"
                    numberOfMonths={1}
                />
              </div>
              <button
                  className="btn btn-default btn-sm"
                  style={{
                    marginLeft: 10,
                  }}
                  onClick={handleNextDay}
                  disabled={currentDate.isSame(moment(), "day")}
              >
                {">"}
              </button>
            </div>
        </div>
        <DataTable
          data={products}
          scopes={[SCOPES.canShowAddProduit]}
          meta={meta}
          columns={columns}
          addUrl={CREATEPRODUCT}
          urlName={"Ajouter un produit"}
          func={paginate}
        />
      </Page>
    </Content>
  );
};
