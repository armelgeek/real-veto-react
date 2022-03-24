import React, { useState, useEffect, useRef } from "react";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import { useSelector } from "react-redux";
import { action, getData } from "../../../../utils/lib/call";
import { useDispatch } from "react-redux";
import { getCommandeCVA } from "../../../../store/actions/commandes";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { VENDEUR } from "../../../../constants/routes";
import DeleteFromMagasin from "./DeleteFromMagasin";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import DataTable from "../../../../utils/admin/DataTable";

export const HistoriqueVenteVendeur = () => {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);

  const [dateRange, onChangeDateRange] = useState([start, end]);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommandeCVA(deb, fin));
  }, [deb, fin]);
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
    const total = arr.reduce((acc, val) => acc + val, 0);
    return total;
  };

  const totalDevente = (arr) => {
    return (
      calculateTotal(
        arr.map((product) => {
          return product.prixVente * product.quantityParProduct;
        })
      ) +
      calculateTotal(
        arr.map((product) => {
          return product.prixParCC * product.qttByCC;
        })
      )
    );
  };
  const recetteDuJour = (arr) => {
    let total = 0;
    arr.map((c) => {
      total += totalDevente(c?.contenu);
    });
    return total;
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Date de commande",
        Cell: (data) => {
          return <>{displayDate(data.row.original?.dateCom)}</>;
        },
      },
      {
        Header: "Total",
        Cell: (data) => {
          return (
            <div>{displayMoney(totalDevente(data.row.original?.contenu))}</div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: (data) => {
          return (
            <>
              <Link
                to={`/detailvendeur/${data.row.original?.id}`}
                className="btn btn-green btn-sm mr-2"
              >
                Détails
              </Link>
              <Link
                to={`/vendeur-commande/${data.row.original?.id}`}
                className="btn btn-warning btn-sm mr-2"
              >
                Editer
              </Link>
              <DeleteFromMagasin model="fromagasins" entity={data.row.original} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <div>
        <div className="bg-dark text-white p-3 d-flex justify-content-center align-items-center">
          <h1 className="">CABINET VETERINAIRE AMBALAVAO</h1>
        </div>
        <div className="p-3">
          <div class="d-flex justify-content-end">
            <Link class="btn btn-primary my-3" to={VENDEUR}>
              Revenir en arriere
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div>
                <h3 className="text-uppercase">Historique de vente</h3>
                <p>{`${displayDate(deb)} ->  ${displayDate(fin)}`}</p>
                <div
                  className="bg-thead p-3 my-2"
                  style={{
                    width: "30%",
                  }}
                >
                  <h2>Recette: {displayMoney(recetteDuJour(commandes))}</h2>
                </div>
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
        </div>{" "}
      </div>
    </>
  );
};
