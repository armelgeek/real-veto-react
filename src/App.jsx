import "react-app-polyfill/stable";
import "./App.css";
import React, { useState, useEffect, Suspense, useContext } from "react";
import ContentHeader from "./@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "./@adminlte/adminlte/Content/ActiveLink";
import Content from "./@adminlte/adminlte/Content";
import Page from "./@adminlte/adminlte/Content/Page";
import { MenuTdb } from "./components/composants/journal/MenuTdb";
import StatisticToDay from "./components/StatisticToDay";
import { Link } from "react-router-dom";
import { STATISTIC_DETAIL } from "./constants/routes";
import TbdCredit from "./components/TbdCredit";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./utils/lib/call";
import { getCreditByPersons } from "./store/actions/commandes";
import { isSpecialProductHandle } from "./store/functions/function";
import { displayDate, displayMoney } from "./utils/functions";
import DataTable from "./utils/admin/DataTable";
import ExportExcel from "./components/ExportExcel";
const wait = async () => new Promise((resolve) => setTimeout(resolve, 1000));

function App() {
  const credits = useSelector(getData("creditstat").value);
  const meta = useSelector(getData("creditstat").meta);
  const [active, setActive] = useState(0);
  const [title, setTitle] = useState("");
  const [current, setCurrent] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        Cell: (data) => {
          return displayDate(data.row.original.dateCom);
        },
      },
      {
        Header: "Produit",
        accessor: "name",
      },
      {
        Header: "Litre",
        accessor: "qttbylitre",
      },
      {
        Header: "Quantité",
        accessor: "quantityParProduct",
      },
      {
        Header: "ML",
        accessor: "qttByCC",
      },
      {
        Header: "Total",
        Cell: (data) => {
          return (
            <p>
              {displayMoney(
                isSpecialProductHandle(data.row.original)
                  ? data.row.original?.prixqttccvente *
                      data.row.original?.quantityParProduct *
                      data.row.original?.qttccpvente +
                      data.row.original?.prixlitre *
                        data.row.original?.qttbylitre
                  : data.row.original?.prixVente *
                      data.row.original?.quantityParProduct +
                      data.row.original?.prixParCC * data.row.original?.qttByCC
              )}
            </p>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    if (credits.length > 0) {
      setCurrent(credits[active].contenu);
      setTitle(credits[active].emprunter.name);
      setTotal(calculTotal(credits[active].contenu));
    }
  }, [credits, active]);

  useEffect(() => {
    dispatch(getCreditByPersons());
  }, []);
  const calculTotal = (data) => {
    let total = 0;
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      console.log("element", element);
      total += isSpecialProductHandle(element)
        ? element.prixqttccvente *
            element.quantityParProduct *
            element.qttccpvente +
          element.prixlitre * element.qttbylitre
        : element.prixVente * element.quantityParProduct +
          element.prixParCC * element.qttByCC;
    }

    return total;
  };
  return (
    <>
      <Content>
        <ContentHeader title="Journal de vente du magasin">
          <ActiveLink title="Journal de vente du magasin"></ActiveLink>
        </ContentHeader>
        <Page>
          <MenuTdb />

          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12">
                  <StatisticToDay />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Link to={STATISTIC_DETAIL} className="text-green">
                      Afficher les details {">>"}
                    </Link>
                  </div>
                </div>
                <div className="col-md-12 border p-3">
                  {credits.length > 0 && (
                    <div className="d-flex flex-row  mb-2 justify-content-between align-items-center">
                      <div>
                        <h3 className="text-uppercase text-md">
                          Credit de :
                          <span class="btn bg-dark btn-sm text-uppercase mx-2">
                            {title}
                          </span>
                        </h3>
                      </div>
                      <div>
                        <div className="border p-3 bg-white">
                          <h3 className="text-uppercase text-md">
                            Total du crédit : {displayMoney(total)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                  {credits.length == 0 ? (
                    <div>Aucun credit pour le moment </div>
                  ) : (
                    <DataTable
                      filter={false}
                      data={current.sort((low, high) => high.id - low.id)}
                      meta={{
                        isFetching: false,
                      }}
                      columns={columns}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <TbdCredit
                active={active}
                setActive={setActive}
                credits={credits}
              />
            </div>
          </div>
        </Page>
      </Content>
    </>
  );
}

export default App;
