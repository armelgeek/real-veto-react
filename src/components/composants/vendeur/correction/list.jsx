import React, { useState, useEffect, useRef } from "react";
import Content from "../../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import { useSelector } from "react-redux";
import { action, getData } from "../../../../utils/lib/call";
import { useDispatch } from "react-redux";
import { getCommandeVenteCorrection } from "../../../../store/actions/commandes";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { VENDEUR } from "../../../../constants/routes";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import DataTable from "../../../../utils/admin/DataTable";
import { setSearchByDate } from "../../../../store/actions/search/search";
import { isSpecialProductHandle } from '../../../../store/functions/function';
const isModified = (contenu) => {
  for (let i = 0; i < contenu.length; ++i) {
    if (contenu[i].correction > 0 || contenu[i].correctionml > 0) {
      return true;
    } else return false;
  }
};
export const HistoriqueDeCorrection = () => {
  const search = useSelector((state) => state.searchbydate);
  console.log(search);
  const [dateRange, onChangeDateRange] = useState([search.deb, search.fin]);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommandeVenteCorrection(search.deb, search.fin));
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
        arr.map((product) => {
          return isSpecialProductHandle(product) ? product.prixlitre * product.quantityParProduct : product.prixVente * product.quantityParProduct;
          ;
        })
      ) +
      calculateTotal(
        arr.map((product) => {
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
              {data.row.original?.isdeleted == true && (
                <>
                  <div className="badge badge-danger">Supprimé</div>
                  <div className="text text-danger">
                    Date de suppression :{" "}
                    {displayDate(data.row.original?.deletedat)}
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
                <tr>
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
                    {"  "}
                  </span>
                </tr>
              ))}
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
                to={`/detailcorrection/${data.row.original?.id}`}
                className="btn btn-green btn-sm mr-2"
              >
                Détails
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
      <ContentHeader title="Historique de correction">
        <ActiveLink title="Historique de correction"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="text-uppercase">Historique de correction</h3>
              <p>{`${displayDate(search.deb)} ->  ${displayDate(
                search.fin
              )}`}</p>
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
        />
      </Page>
    </Content>
  );
};
