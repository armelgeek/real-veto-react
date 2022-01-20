import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
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
import Journal from "./components/composants/Journal";
import Items from "./components/composants/journal/Items";
import getByRangeDateAndProduct from "./filters/getByRangeDateAndProduct";
import getByRangeDate from "./filters/getByRangeDate";
import flatify from "./filters/flatify";
import { vetoProducts } from './data/product';
function App() {
  var start = moment("2021-11-27");
  var end = moment("2021-12-01");
  const [rangeDate, setRangeDate] = useState([]);
  const [rangeMonth, setRangeMonth] = useState([]);
  const [debut, setDebut] = useState({});
  const [fin, setFin] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  let [startofDate, setStartofDate] = useState(start);
  let [endDate, setEndDate] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  var a = [
    {
      dateCom: "2021-11-27",
      createdAt: "2022-01-04",
      id: 1,
      contenu: [
        {
          id: 38,
          name: "MAXZOL  2 500 mg",
          type: "BOLUS",
          condml: 0,
          condval: 0,
          publish: true,

          shared: false,
          category: {
            id: 1,
            name: "VETO",
            createdAt: "2021-12-14",
            updatedAt: "2021-12-14",
          },
          datePer: "2023-01-01",
          qttByCC: 0,
          quantityParProduct: "14",
        },
        {
          id: 37,
          name: "VERMVOL  1000mg",
          type: "BOLUS",
          condml: 0,
          condval: 0,
          publish: false,
          shared: true,
          category: {
            id: 1,
            name: "VETO",
            createdAt: "2021-12-14",
            updatedAt: "2021-12-14",
          },
          datePer: "2023-01-01",
          qttByCC: 0,
          quantityParProduct: "86",
        },
      ],
    },
    {
      dateCom: "2021-11-29",
      createdAt: "2022-01-04",
      id: 1,
      contenu: [
        {
          id: 38,
          name: "MAXZOL  2 500 mg",
          type: "BOLUS",
          condml: 0,
          publish: true,

          shared: false,
          condval: 0,
          category: {
            id: 1,
            name: "VETO",
            createdAt: "2021-12-14",
            updatedAt: "2021-12-14",
          },
          datePer: "2023-01-01",
          qttByCC: 0,
          quantityParProduct: "1",
        },
        {
          id: 37,
          name: "VERMVOL  1000mg",
          type: "BOLUS",
          condml: 0,
          condval: 0,
          publish: false,
          shared: true,
          category: {
            id: 2,
            name: "PHYTO",
            createdAt: "2021-12-14",
            updatedAt: "2021-12-14",
          },
          datePer: "2023-01-01",
          qttByCC: 12,
          quantityParProduct: "10",
        },
      ],
    },
  ];
  let getAllMonthBetweenDates = (startDate, endDate) => {
    const months = [];
    while (endDate.diff(startDate, "months") >= 0) {
      months.push(startDate.format("MMMM YYYY"));
      startDate.add(1, "month");
    }
    return months;
  };
  let getDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone(),
      dates = [];
    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };
  let byDateProduct = getByRangeDate(vetoProducts.rows, "dateCom", "2021-11-27", "2021-11-29");
  const result = flatify(byDateProduct, "contenu");
  let resultat = result
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
  useEffect(() => {
    if (startofDate && endDate) {
      setRangeDate(getDaysBetweenDates(moment(startofDate), moment(endDate)));
      setRangeMonth(getAllMonthBetweenDates(moment(startofDate), moment(endDate)));
    }
  }, [startofDate, endDate]);
  useEffect(() => {
    if (dateRange != null) {
      if (dateRange[0]) {
        setStartofDate(dateRange[0]);
      }
      if (dateRange[1]) {
        setEndDate(dateRange[1]);
      }
    }
  }, [dateRange]);
  return (
    <>
      <Content>
        <ContentHeader title="Journal de sortie">
          <ActiveLink title="Journal de sortie"></ActiveLink>
        </ContentHeader>
        <Page>
          {startofDate && endDate && (
            <span>
              {displayDate(startofDate)} -- {displayDate(endDate)}
            </span>
          )}{" "}
          <div className="range-date">
            Etat des stocks à jour au :
            <DateRangePicker
              locale="fr-FR"
              onChange={onChangeDateRange}
              value={dateRange}
            />
            <div className="table-responsive">
              {/*<table id="rapport" className="table table-striped" border={1}>
                <thead>
                  {" "}
                  <>
                  
                  </>
                </thead>
                <tbody>
                <td
                    className=" bg-primary text-white text-center text-uppercase"
                    colSpan={3}
                  >
                    Product
                  </td>
                  <td
                    className=" bg-primary text-white text-center text-uppercase"
                    colSpan={3}
                  >
                    Product
                  </td>
                  <td
                    className=" bg-primary text-white text-center text-uppercase"
                    colSpan={3}
                  >
                    Product
                  </td>
                  <tr className="text-center text-uppercase">
                    {rangeDate.map((r) => (
                      <>
                      <tr>
                        <div class="d-flex flex-column ">
                          <NameOfDay date={r} />
                          <DateInterval date={r} />
                          <Items date={r} />
                          <Items date={r} />
                          <Items date={r} />
                          <Items date={r} />
                        </div>
                        </tr>

                      </>
                    ))}
                  </tr>
                </tbody>
              </table>*/}

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
                        <Items product={b.id} data={vetoProducts.rows} date={r} />
                      ))}
                      <td className="text-center">{b.quantityParProduct}</td>
                      <td className="text-center">{b.qttByCC}</td>
                    </tr>
                  </>
                ))}
              </table>
            </div>
          </div>
        </Page>
      </Content>
    </>
  );
}

export default App;
