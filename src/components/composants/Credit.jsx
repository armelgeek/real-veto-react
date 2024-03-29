import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { getCredit, setPayerCommande } from "../../store/actions/commandes";
import { Link } from "react-router-dom";
import moment from "moment";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";

import { displayDate, displayMoney } from "../../utils/functions";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import DataTable from '../../utils/admin/DataTable';
import DeleteFromDepot from "../fromDepot/DeleteFromDepot";
import { SCOPES } from "../../constants/permissions";
import Gate from "../Gate";
import { totalDevente } from '../../store/functions/function';
function Credit(props) {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateRange !== null) {
      if (dateRange[0]) {
        setDeb(dateRange[0]);
      }
      if (dateRange[1]) {
        setFin(dateRange[1]);
      }
    } else {
      setDeb(start);
      setFin(end);
    }
  }, [dateRange]);
  const calculateTotal = (arr) => {
    //console.log('arr',arr);
    if (arr == undefined || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.prixVente * el.quantityParProductDepot;
    });
    return total;
  };
  const calculateTotalNormal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.prixVente * el.quantityParProductDepot;
    });
    return total;
  };
  const quantiteBruteTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityParProductDepot * 1;
    });
    return total;
  };
  const quantiteCCTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.qttByCCDepot * 1;
    });
    return total;
  };
  useEffect(() => {
    dispatch(getCredit(deb, fin));
  }, [deb, fin]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Date de credit",
        Cell: (data) => {
          return <>{displayDate(data.row.original?.dateCom)}</>;
        },
      },
      {
        Header: "Produits",
        Cell: (data) => {
          return (
            <div style={{ width: "350px" }}>
              {data.row.original?.isdeleted == true && (
                <>
                  <div className="badge badge-danger">Supprimé</div>
                  <div className="text text-danger">
                    Date de suppression :{" "}
                    {displayDate(data.row.original?.deletedat)}
                  </div>
                </>
              )}
          
              {data.row.original?.contenu?.map((d) => (
                <span>
                  <span
                    style={{
                      background: "white",
                      color:
                        data.row.original?.isdeleted == true
                          ? "red"
                          : "inherit",
                      padding: 2,
                    }}
                  >
                    {d.name}
                  </span>
                  <span
                    style={{
                      color:
                        data.row.original?.isdeleted == true
                          ? "red"
                          : "inherit",
                    }}
                  >
                    {" "}
                    {" || "}
                  </span>
                </span>
              ))}
            </div>
          );
        },
      },
      {
        Header: "Type",
        Cell: (data) => {
          return (
            <div>
              {data.row.original?.type == "credit-cva" ? (
                <h3 className="badge badge-info">Magasin</h3>
              ) : (
                <h3 className="badge badge-info">Dépot</h3>
              )}
            </div>
          );
        },
      },
      {
        Header: "Status",
        Cell: (data) => {
          return (
            <div>
              {data.row.original?.status == true ? (
                <h3 className="badge badge-success">payé</h3>
              ) : (
                <h3 className="badge badge-danger">non payé</h3>
              )}
            </div>
          );
        },
      },
      {
        Header: "Nom de la personne",
        accessor: "emprunter.name",
      },
      {
        Header: "Total",
        Cell: (data) => {
          console.log('hai hai',data.row.original?.contenu);
          return (
            <div>
              {displayMoney(totalDevente(data.row.original?.contenu))}
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: (data) => {
          const isDisabled =
            data.row.original?.isdeleted == true ? true : false;
          return !isDisabled ? (
            <>
              <Gate scopes={[SCOPES.canShowDetailCreditDepot]}>
                <Link
                  to={`/detail/${data.row.original?.id}`}
                  className="btn btn-green btn-sm mr-2"
                >
                  Détails
                </Link>
              </Gate>
              <Gate scopes={[SCOPES.canShowEditCreditDepot]}>
                <Link
                  to={`/editer/commande/${data.row.original?.id}`}
                  className="btn btn-warning btn-sm mr-2"
                >
                  Editer
                </Link>
              </Gate>
              <Gate scopes={[SCOPES.canShowDeleteCreditDepot]}>
                <DeleteFromDepot model="fromdepots" entity={data.row.original} /></Gate>
            </>
          ):null;
        },
      },
    ],
    []
  );

  return (
    <Content>
      <ContentHeader title="Crédit">
        <ActiveLink title="Crédit"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="text-uppercase">Credit</h3>
              <p>{`${displayDate(deb)} ->  ${displayDate(fin)}`}</p>
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <DateRangePicker
              locale="fr-FR"
              onChange={onChangeDateRange}
              value={dateRange}
            />
          </div>{" "}
        </div>
        <DataTable
          data={commandes.sort((low, high) => high.id - low.id)}
          meta={meta}
          columns={columns}
        //  addUrl={NOUVELLEFACTURE}
        //  urlName={"Ajouter un facture"}
        />
      </Page>
    </Content>
  );
}

export default Credit;
