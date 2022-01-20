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
import { DateRangePicker } from "react-dates";
import { displayDate } from "./utils/functions";
import NameOfDay from "./components/composants/journal/NameOfDay";
import DateInterval from "./components/composants/journal/DateInterval";
import Journal from "./components/composants/Journal";
import { vetoProducts } from "./data/product";
import useMergeState from "./hooks/mergeState";
import { xor } from "lodash";
function App() {
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
  let filters = {};
  var startDate = new Date("2021-11-21");
  var endDate = new Date("2021-11-30");
  {
    /**
  target.isBetween(start, finish, 'days', '()') // default exclusive
  target.isBetween(start, finish, 'days', '(]') // right inclusive
  target.isBetween(start, finish, 'days', '[)') // left inclusive
  target.isBetween(start, finish, 'days', '[]') // all inclusive
More units to consider: years, months, days, hours, minutes, seconds, milliseconds
*/
  }
  const [filterData, setFilters] = useMergeState(filters);
  const byDateProduct = vetoProducts.rows.filter((fa) => {
    var date = new Date(fa.dateCom);
    return moment(date).isBetween(startDate, endDate, "days", "[]");
  });
  const result = [
    ...new Set([].concat(...byDateProduct.map((o) => o.contenu))),
  ];
  let resultat = result
    .reduce((r, { id, name, type, category, quantityParProduct, qttByCC }) => {
      var temp = r.find((o) => o.id === id);
      if (!temp) {
        r.push({
          id,
          name,
          type,
          category,
          quantityParProduct,
          qttByCC,
        });
      } else {
        temp.quantityParProduct =
          parseInt(temp.quantityParProduct) + parseInt(quantityParProduct);
        temp.qttByCC = parseInt(temp.qttByCC) + parseInt(qttByCC);
      }
      return r;
    }, [])
    .sort(function (a, b) {
      return a.id > b.id;
    });
  ///const search = ["VETO", "PHYTO", "VACCIN"];
  //  let records = resultat.filter((s) => search.includes(s.category?.name));

  const Formin = (data, attribute, label, option, action) => {
    let categorySelect = [];
    const [arrayData, setArrayData] = useState([]);
    useEffect(() => {
      data.map((r) => {
        if (r.hasOwnProperty(attribute)) {
          categorySelect.push(r[attribute]);
        }
      });
      if (categorySelect.length > 0) {
        const res = categorySelect.reduce((r, data) => {
          var temp = r.find((o) => o.id === data.id);
          if (!temp) {
            r.push(data);
          }
          return r;
        }, []);
        setArrayData(
          res.sort(function (a, b) {
            return a.id > b.id;
          })
        );
      }
    }, [attribute, option]);
    return (
      <>
        <select
          name={attribute}
          onChange={(e) => action({ [attribute]: e.target.value })}
        >
          <option value="">{label}</option>
          {arrayData.map((arr) => (
            <option value={arr.id}>{arr[option]}</option>
          ))}
        </select>
      </>
    );
  };
  return (
    <Content>
      {JSON.stringify(filterData)}
      <div>
        {Formin(
          result,
          "category",
          "selectionner un categorie",
          "name",
          setFilters
        )}
        {Formin(
          result,
          "fournisseur",
          "selectionner un fournisseur",
          "name",
          setFilters
        )}
        <p>Resultat:{JSON.stringify(resultat)}</p>
      </div>
    </Content>
  );
}

export default App;
