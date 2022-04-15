import React, { useState, useEffect, useRef } from "react";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import { useSelector } from "react-redux";
import { action, getData } from "../../../../utils/lib/call";
import { useDispatch } from "react-redux";
import { getCommandeCVA } from "../../../../store/actions/commandes";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { VENDEUR } from "../../../../constants/routes";
import DeleteFromMagasin from "./DeleteFromMagasin";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import DataTable from "../../../../utils/admin/DataTable";
import { setSearchByDate } from "../../../../store/actions/search/search";
import { isSpecialProductHandle } from "./block-it";
const isModified = (contenu) => {
  for (let i = 0; i < contenu.length; ++i) {
    if (contenu[i].correction > 0 || contenu[i].correctionml > 0) {
      return true;
    } else return false;
  }
};
export const HistoriqueVenteVendeur = () => {
  const search = useSelector((state) => state.searchbydate);
  const { type } = useParams();
  const [dateRange, onChangeDateRange] = useState([search.deb, search.fin]);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommandeCVA(search.deb, search.fin, type));
  }, [search.deb, search.fin]);
  useEffect(() => {
    if (dateRange !== null) {
      if (dateRange[0]) {
        dispatch(setSearchByDate(dateRange[0], dateRange[1]));
      }
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
        arr?.map((product) => {
          return isSpecialProductHandle(product)
            ? product.prixqttccvente *
                product.quantityParProduct *
                product.qttccpvente +
                product.prixlitre * product.qttbylitre
            : product.prixVente * product.quantityParProduct;
        })
      ) +
      calculateTotal(
        arr?.map((product) => {
          return product.prixParCC * product.qttByCC;
        })
      )
    );
  };
  const recetteDuJour = (arr = []) => {
    let total = 0;
    if (commandes.length > 0) {
      arr.map((c) => {
        total += totalDevente(c?.contenu);
      });
    } else {
      total = 0;
    }

    return total;
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        Cell: (data) => {
          return <>{displayDate(data.row.original?.dateCom)}</>;
        },
      },
      {
        Header: "Produits",
        Cell: (data) => {
          return (
            <div style={{ width: "350px" }}>
              {data.row.original.isdeleted == true && (
                <>
                  <div className="badge badge-danger">Supprimé</div>
                  <div className="text text-danger">
                    Date de suppression :{" "}
                    {displayDate(data.row.original.deletedat)}
                  </div>
                </>
              )}
              {data.row.original?.isdeleted == null && (
                <p>
                  {isModified(data.row.original?.contenu) && (
                    <div className="badge badge-warning">Modifié</div>
                  )}
                </p>
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
              {!data.row.original.isdeleted && (
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
                  <DeleteFromMagasin
                    model="fromagasins"
                    entity={data.row.original}
                  />
                </>
              )}
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
        <div className="p-3 container">
          <div class="d-flex justify-content-end">
            <Link class="btn btn-primary my-3" to={VENDEUR}>
              Revenir en arriere
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div>
                <h3 className="text-uppercase">
                  {type == "vente-cva" ? "Historique de vente" : "CREDIT"}
                </h3>
                <p>{`${displayDate(search.deb)} ->  ${displayDate(
                  search.fin
                )}`}</p>
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
            filter={false}
            //  addUrl={NOUVELLEFACTURE}
            //  urlName={"Ajouter un facture"}
          />
        </div>{" "}
      </div>
    </>
  );
};
