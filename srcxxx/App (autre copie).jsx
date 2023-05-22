import 'react-app-polyfill/stable';
import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, Suspense } from "react";
import moment from "moment";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import ContentHeader from "./@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "./@adminlte/adminlte/Content/ActiveLink";
import Content from "./@adminlte/adminlte/Content";
import Page from "./@adminlte/adminlte/Content/Page";
import { ActionCreators } from "react-redux-undo";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { displayDate } from "./utils/functions";
import NameOfDay from "./components/composants/journal/NameOfDay";
import DateInterval from "./components/composants/journal/DateInterval";
import Items from "./components/composants/journal/Items";

import getByRangeDateAndProduct from "./filters/getByRangeDateAndProduct";
import getByRangeDate from "./filters/getByRangeDate";
import flatify from "./filters/flatify";
import { vetoProducts } from "./data/product";
import { action, getData } from "./utils/lib/call";
import { getTdbCommande } from "./store/actions/commandes";
import { NoItems } from "./components/composants/journal/NoItems";
import { LastStock } from "./components/composants/journal/LastStock";
import { MenuTdb } from "./components/composants/journal/MenuTdb";
export const groupBy = (array, key, subkey) => {
  return array.reduce((result, currentValue) => {
    if (!subkey) {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
    } else {
      (result[currentValue[key][subkey]] =
        result[currentValue[key][subkey]] || []).push(currentValue);
    }
    return result;
  }, {});
};
function last(array) {
  return array[array.length - 1];
}
function App() {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [rangeDate, setRangeDate] = useState([]);
  const [rangeMonth, setRangeMonth] = useState([]);
  let [startofDate, setStartofDate] = useState(start);
  let [endDate, setEndDate] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  const [byDateProduct, setByDateProduct] = useState([]);
  const [result, setResult] = useState([]);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();

  let getAllMonthBetweenDates = (startDate, endDate) => {
    const months = [];
    while (endDate.diff(startDate, "months") >= 0) {
      months.push(startDate.format("MMMM YYYY"));
      startDate.add(1, "month");
    }
    return months;
  };
  let getDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone();
    const dates = [];
    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };

  useEffect(() => {
    if (dateRange !== null) {
      if (dateRange[0]) {
        setStartofDate(dateRange[0]);
      }
      if (dateRange[0]) {
        setEndDate(dateRange[1]);
      }
    } else {
      setStartofDate(start);
      setEndDate(end);
    }
  }, [dateRange]);

  useEffect(() => {
    if (startofDate && endDate) {
      setRangeDate(getDaysBetweenDates(moment(startofDate), moment(endDate)));
      setRangeMonth(
        getAllMonthBetweenDates(moment(startofDate), moment(endDate))
      );
      dispatch(getTdbCommande('vente-cva',startofDate, endDate));
    }
  }, [startofDate, endDate]);
  useEffect(() => {
    if (!meta.isFetching) {
      setByDateProduct(
        getByRangeDate(commandes, "dateCom", startofDate, endDate)
      );
    }
  }, [meta]);
  let rs = flatify(byDateProduct, "contenu");
  let res = rs
    .reduce(
      (
        r,
        {
          id,
          name,
          type,
          category,
          fournisseur,
          quantityParProduct,
          quantityBruteCVA,
          quantityCCCVA,
          qttByCC,
        }
      ) => {
        var temp = r.find((o) => o.id === id);
        if (!temp) {
          r.push({
            id,
            name,
            type,
            category,
            fournisseur,
            quantityBruteCVA,
            quantityCCCVA,
            quantityParProduct,
            qttByCC,
          });
        } else {
            (temp.quantityParProduct =
              parseInt(temp.quantityParProduct) + parseInt(quantityParProduct));
          temp.qttByCC = parseInt(temp.qttByCC) + parseInt(qttByCC);
        }
        return r;
      },
      []
    )
    .sort(function (a, b) {
      return a.id > b.id;
    });
  const flato = (data, attribute) => {
    return [...new Set([].concat(...data.map((o) => o[attribute])))];
  };

  const groupedBasket = groupBy(byDateProduct, "dateCom");
  return (
    <>
      <Content>
        <ContentHeader title="Journal de vente du magasin">
          <ActiveLink title="Journal de vente du magasin"></ActiveLink>
        </ContentHeader>
        <Page>
        <MenuTdb/>
          <div className="date-range">
            <div className="d-flex justify-content-between my-3">
              <div>
                {startofDate && endDate && (
                  <>
                    <h2 class="text-uppercase my-1">
                      Journal de vente du magasin{" "}
                    </h2>
                    <span>
                      Du: {displayDate(startofDate)} Au {displayDate(endDate)}
                    </span>
                  </>
                )}{" "}
              </div>
              <div>
                <DateRangePicker
                  locale="fr-FR"
                  onChange={onChangeDateRange}
                  value={dateRange}
                />
              </div>
            </div>
            <div className="bg-white py-3 px-2 mb-2">
              <div>
                <span
                  className="bg-primary px-2"
                  style={{
                    width: 5,
                    height: 5,
                  }}
                ></span>
                 <span className=" ml-2">: Quantité de commande en (FLACON,BOLUS,UNITE,SACHET)</span>
              </div>
              <div>
                <span
                  className="bg-warning px-2"
                  style={{
                    width: 5,
                    height: 5,
                  }}
                ></span>
                 <span className=" ml-2">: Quantité de vente en ML</span>
              </div>
            </div>
            <div className="table-responsive">
        
              <table class="table">
                <tr className="sticky-this">
                  <td>Produit</td>
                  {rangeDate.map((r) => (
                    <>
                      <DateInterval date={r} />
                    </>
                  ))}
                  <td className="bg-thead text-uppercase text-center">Total</td>
                  <td className="bg-thead text-uppercase text-center">Total ML</td>
                </tr>
                {res.map((b) => (
                  <>
                    <tr class="bg-white">
                      <td className="bg-thead">{b.name}</td>
                      {rangeDate.map((r) => (
                        <>
                          {groupedBasket[r] != undefined ? (
                            <Items
                              flat={flato(groupedBasket[r], "contenu")}
                              gr={r}
                              id={b.id}
                            />
                          ) : (
                            <NoItems />
                          )}
                        </>
                      ))}
                      <td className="text-center">{b.quantityParProduct}</td>

                      <td className="text-center">{b.qttByCC}</td>
                       
                    </tr>
                  </>
                ))}
                {res.length == 0 && (
                  <tr>
                    <td className="text-center" colSpan={rangeDate.length + 3}>
                      Aucune enregistrement trouvé
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div>

          {/**  <div className="date-range">
            <div className="d-flex justify-content-between my-3">
              <div>
                {startofDate && endDate && (
                  <>
                    <h2>Journal de vente </h2>
                    <span>
                      Du: {displayDate(startofDate)} Au {displayDate(endDate)}
                    </span>
                  </>
                )}{" "}
              </div>
              <div>
                <DateRangePicker
                  locale="fr-FR"
                  onChange={onChangeDateRange}
                  value={dateRange}
                />
                <button
                  className="ml-3 btn btn-primary btn-sm"
                  onClick={getDataa}
                >
                  Filtrer
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table class="table">
                <tr className="sticky-this">
                  <td>Produit</td>
                  {rangeDate.map((r) => (
                    <>
                      <DateInterval date={r} />
                    </>
                  ))}
                  <td className="bg-green text-center">INV</td>
                  <td className="bg-info text-center">INV CC</td>
                </tr>
                {resultat.map((b) => (
                  <>
                    <tr>
                      <td className="bg-gray">{b.name}</td>
                      {rangeDate.map((r) => (
                        <>
                       <Items product={b} data={resultat} date={r} />{" "}
                        </>
                      ))}
                      <td className="text-center">{b.quantityParProduct}</td>
                      <td className="text-center">{b.qttByCC}</td>
                    </tr>
                  </>
                ))}
                {resultat.length == 0 && (
                  <tr>
                    <td className="text-center" colSpan={rangeDate.length + 3}>
                      Aucune enregistrement trouvé
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div> */}
        </Page>
      </Content>
    </>
  );
}

export default App;
