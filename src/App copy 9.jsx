import logo from "./logo.svg";
import "./App.css";
import React,{ useState, useEffect, Suspense } from "react";
import moment from "moment";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import ContentHeader from "./@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "./@adminlte/adminlte/Content/ActiveLink";
import Content from "./@adminlte/adminlte/Content";
import Page from "./@adminlte/adminlte/Content/Page";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { displayDate } from "./utils/functions";
import NameOfDay from "./components/composants/journal/NameOfDay";
import DateInterval from "./components/composants/journal/DateInterval";
const Items = React.lazy(() => import("./components/composants/journal/Items"));

import getByRangeDateAndProduct from "./filters/getByRangeDateAndProduct";
import getByRangeDate from "./filters/getByRangeDate";
import flatify from "./filters/flatify";
import { vetoProducts } from "./data/product";
import { action, getData } from "./utils/lib/call";
import { getCommande } from "./store/actions/commandes";
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

  useEffect(() => {}, [startofDate, endDate]);
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
    }
  }, [startofDate, endDate]);
  useEffect(() => {
    if (commandes.length > 0) {
      setByDateProduct(
        getByRangeDate(commandes, "dateCom", startofDate, endDate)
      );
    }
  }, [commandes]);
  let rs = flatify(byDateProduct, "contenu");
  let resultat = rs
    .reduce(
      (
        r,
        {
          id,
          name,
          type,
          category,
          fournisseur,
          publish,
          shared,
          quantityParProduct,
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
            publish,
            shared,
            fournisseur,
            quantityParProduct,
            qttByCC,
          });
        } else {
          temp.quantityParProduct =
            parseInt(temp.quantityParProduct) + parseInt(quantityParProduct);
          temp.qttByCC = parseInt(temp.qttByCC) + parseInt(qttByCC);
        }
        return r;
      },
      []
    )
    .sort(function (a, b) {
      return a.id > b.id;
    });
  const getDataa = () => {
    dispatch(getCommande(startofDate, endDate));
  };
  return (
    <>
      <Content>
        <ContentHeader title="Journal de vente">
          <ActiveLink title="Journal de vente"></ActiveLink>
        </ContentHeader>
        <Page>
          <div className="date-range">
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
                          <Suspense fallback={<p>loading...</p>}>
                            <Items product={b} data={commandes} date={r} />{" "}
                          </Suspense>
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
          </div>
        </Page>
      </Content>
    </>
  );
}

export default App;
