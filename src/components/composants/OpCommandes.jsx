import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { action, getData } from "../../utils/lib/call";
import { getOperationCommandeCVA } from "../../store/actions/commandes";
import { displayDate, displayMoney } from "../../utils/functions";
import Content from "../../@adminlte/adminlte/Content/index";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../@adminlte/adminlte/Content/Page";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import DataTable from "../../utils/admin/DataTable";
import { isSpecialProductHandle } from "./vendeur/fromMagasin/block-it";
import DeleteAtUpdate from './DeleteAtUpdate';
const isModified = (contenu) => {
  for (let i = 0; i < contenu.length; ++i) {
    if (contenu[i].correction > 0 || contenu[i].correctionml > 0) {
      return true;
    } else return false;
  }
};
const filterData = (data) => {
  return data.filter((d) => d.deletedat != moment("2021-01-01"));
};
const OpCommandes = () => {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOperationCommandeCVA(deb, fin));
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
        arr?.map((product) => {
          return isSpecialProductHandle(product)
            ? product.prixqttccvente *
                product.quantityParProduct *
                product.qttccpvente +
                product.prixVente * product.qttbylitre
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
    let filteredCommande = arr.filter(v => v.isdeleted!=true);
    let total = 0;
    if (commandes.length > 0) {
      filteredCommande.map((c) => {
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
      }
    ],
    []
  );
/**
 * 

 ,
      {
        Header: "Actions",
        Cell: (data) => {
          return (
            <>
              <DeleteAtUpdate model="fromagasins" entity={data.row.original} />
            </>
          );
        },
      },
 */
  return (
    <>
      <Content>
        <ContentHeader title="Operations sur les commandes">
          <ActiveLink title="Operations sur les commandes"></ActiveLink>
        </ContentHeader>
        <Page>
          <div className="row my-2">
            <div className="col-lg-8">
              <div>
                {deb && fin && (
                  <>
                    <h2>Operations sur les commandes</h2>
                    <span>
                      Du: {displayDate(deb)} Au {displayDate(fin)}
                    </span>
                  </>
                )}{" "}
              </div>
            </div>
            <div className="col-lg-4 text-right">
              <div>
                <DateRangePicker
                  locale="fr-FR"
                  onChange={onChangeDateRange}
                  value={dateRange}
                />
              </div>
            </div>
          </div>
          <DataTable
            filter={false}
            data={filterData(commandes)}
            meta={meta}
            columns={columns}
          />
        </Page>
      </Content>
    </>
  );
};
export default OpCommandes;
