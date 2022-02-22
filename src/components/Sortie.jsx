import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEntree, getSortie } from "../store/actions/commandes";
import { action, getData } from "../utils/lib/call";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import Content from "../@adminlte/adminlte/Content";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
import NumberFormat from "react-number-format";
import moment from "moment";
import { displayDate, displayMoney } from "../utils/functions";
import DataTable from "../utils/admin/DataTable";
function Sortie() {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
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
      total += el.prixVente * el.quantityParProductDepot ;
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

  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();
  const getSortieByDate = () => {
    setDeb(refDateDeb.current.value);
    setFin(refDateFin.current.value);
  };
  useEffect(() => {
    dispatch(getSortie(deb, fin));
  }, [deb, fin]);
  const getDataa = () => {
    dispatch(getSortie(deb, fin));
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Date de commande",
        Cell: (data) => {
          return <>{displayDate(data.row.original?.createdAt)}</>;
        },
      },
      {
        Header: "Produits",
        Cell: (data) => {
          return (
            <span>
              {data.row.original?.contenu.map((d) => (
                <span>
                  {d.name}
                  {","}
                </span>
              ))}
            </span>
          );
        },
      },
      {
        Header: "Quantité",
        Cell: (data) => {
          return <div>{quantiteBruteTotal(data.row.original?.contenu)}</div>;
        },
      },
      {
        Header: "Quantité ML",
        Cell: (data) => {
          return <div>{quantiteCCTotal(data.row.original?.contenu)}</div>;
        },
      },
      {
        Header: "Total",
        Cell: (data) => {
          return (
            <div>
              {displayMoney(calculateTotal(data.row.original?.contenu))}
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
                to={`/depot/detail/${data.row.original?.id}`}
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
              <Link
                to={`/supprimer/commande/${data.row.original?.id}`}
                className="btn btn-danger  btn-sm"
              >
                Supprimer
              </Link>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <Content>
      <ContentHeader title="Historique de sortie">
        <ActiveLink title="Historique de sortie"></ActiveLink>
      </ContentHeader>
      <Page>
        {" "}
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="text-uppercase">Factures</h3>
              <p>{`${displayDate(deb)} ->  ${displayDate(fin)}`}</p>
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <DateRangePicker
              locale="fr-FR"
              onChange={onChangeDateRange}
              value={dateRange}
            />
            <button className="ml-3 btn btn-primary btn-sm" onClick={getDataa}>
              Filtrer
            </button>
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

export default Sortie;
