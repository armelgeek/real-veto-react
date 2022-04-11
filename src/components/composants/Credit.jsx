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
        accessor:'contenu',
        Cell:({ cell: { value } }) => {
          return (
            <div style={{ width: "100px" }}>
              {value != null  && value.map(e => (
                <p>{e.id}</p>
              ))}
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
        Header: "Contact",
        accessor: "emprunter.contact",
      },

      {
        Header: "Quantité",
        Cell:({ cell: { value } }) => {
          return (
            <div>
              {quantiteBruteTotal(value?.contenu)}
            </div>
          );
        },
      },
      {
        Header: "Total",
        Cell: ({ cell: { value } }) => {
          return (
            <div>
              {displayMoney(calculateTotal(value?.contenu))}
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: (data) => {
          return (
            <>
              <Link
                to={`/detail/${data.row.original?.id}`}
                className="btn btn-green btn-sm mr-2"
              >
                Détails
              </Link>
              <Link
                to={`/editer/commande/${data.row.original?.id}`}
                className="btn btn-warning btn-sm mr-2"
              >
                Editer
              </Link>
              <DeleteFromDepot model="fromdepots" entity={data.row.original} />
            </>
          );
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
