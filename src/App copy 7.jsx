import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import ContentHeader from "./@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "./@adminlte/adminlte/Content/ActiveLink";
import Content from "./@adminlte/adminlte/Content";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import Page from "./@adminlte/adminlte/Content/Page";
import { displayDate } from "./utils/functions";
import NameOfDay from "./components/composants/journal/NameOfDay";
import DateInterval from "./components/composants/journal/DateInterval";
import Journal from "./components/composants/Journal";
import { vetoProducts } from "./data/product";
import useMergeState from "./hooks/mergeState";
import { xor } from "lodash";
import { FilterContent, Data } from "./filters/context/filter-context";
import getByRangeDate from "./filters/getByRangeDate";
import flatify from "./filters/flatify";
function App() {
  /*const [begin, setBegin] = useState(
    moment(new Date()).startOf("week").add("d", 1).format('MM/DD/YYYY')
  );
  const [end, setEnd] = useState(moment(new Date()).endOf("week").format('MM/DD/YYYY'));*/
  const [dateRange, onChangeDateRange] = useState([new Date(),new Date()]);
  const [dataByDate, setDataByDate] = useState([]);
  const [result, setResult] = useState([]);
  const [resultat, setResultat] = useState([]);
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
  let schema = {
    category: [],
    fournisseur: [],
  };

  {
    /**
  target.isBetween(start, finish, 'days', '()') // default exclusive
  target.isBetween(start, finish, 'days', '(]') // right inclusive
  target.isBetween(start, finish, 'days', '[)') // left inclusive
  target.isBetween(start, finish, 'days', '[]') // all inclusive
More units to consider: years, months, days, hours, minutes, seconds, milliseconds
*/
  }
  useEffect(() => {
    if (dateRange == null) {
      setDataByDate(getByRangeDate(a, "dateCom", begin, end));
    } else {
      setDataByDate(getByRangeDate(a, "dateCom", new Date(dateRange[0]), new Date(dateRange[1])));
    }
  }, [dateRange]);
  useEffect(() => {
    setResult(flatify(dataByDate, "contenu"));
  }, [dataByDate]);
  useEffect(() => {
    setResultat(
      result
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
                parseInt(temp.quantityParProduct) +
                parseInt(quantityParProduct);
              temp.qttByCC = parseInt(temp.qttByCC) + parseInt(qttByCC);
            }
            return r;
          },
          []
        )
        .sort(function (a, b) {
          return a.id > b.id;
        })
    );
  }, [result]);
  return (
    <Content>
      <DateRangePicker
        locale="fr-FR"
        minDate={new Date("27-11-2021")}
        onChange={onChangeDateRange}
        value={dateRange}
      />
      {JSON.stringify(dateRange)}
      <FilterContent
        data={result}
        resultat={resultat}
        sortBy={["name", "description"]}
        labelSelect={["categorie"]}
        labelChoice={["publié"]}
        exclude={["sortiedepots"]}
        moreAttribute={[
          {
            label: "type",
            value: "type",
            type: "select",
          },
        ]}
      >
        <Data>
          {({ data, filters, records, setFilters }) => (
            <>
              <div>{JSON.stringify(filters)}</div>
              <div>{JSON.stringify(records)}</div>
            </>
          )}
        </Data>
      </FilterContent>
    </Content>
  );
}

export default App;

{
  /*
export const FilterContent = ({ data }) => {
  let filters = {};

  return (
    <div>
      {JSON.stringify(filterData)}
      <div>
        {Formin(
          data,
          "category",
          "selectionner un categorie",
          "name",
          setFilters
        )}
        {Formin(
          data,
          "fournisseur",
          "selectionner un fournisseur",
          "name",
          setFilters
        )}
      </div>{" "}
    </div>
  );
};
*/
}
