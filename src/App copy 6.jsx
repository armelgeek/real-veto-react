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
import {
  FilterContent,
  Data as FilterData,
} from "./filters/context/filter-context";
import getByRangeDate from "./filters/getByRangeDate";
import flatify from "./filters/flatify";
import {
  RangeDateFilter,
  Data,
} from "./filters/context/range-date-filter-context";
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

  return (
    <Content>
      <RangeDateFilter records={a} key={"dateCom"} local={"fr-FR"}>
        <Data>
          {({ data }) => (
            <>
             {JSON.stringify(data)}
            </>
          )}
        </Data>
      </RangeDateFilter>
    </Content>
  );
}

export default App;
