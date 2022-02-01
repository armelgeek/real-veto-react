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
import { getCommande } from "./store/actions/commandes";
import { vetoo } from "./data/realdata";
function strOp(str) {
  return str.toString().replace(/\s/g, "").toLowerCase();
}
function App() {
  const filterData = (data, query) => {
    return data.filter((el) => {
      return strOp(el.name).includes(strOp(query));
    });
  };
  /* const input = [ { calories: '1170.00', upload_date: '2019-12-31T21:41:42.943Z' },
  { calories: '2188.00', upload_date: '2019-12-31T21:41:56.604Z' },
  { calories: '1079.00', upload_date: '2019-12-31T21:43:06.372Z' },
  { calories: '2188.00', upload_date: '2019-12-31T21:42:56.577Z' },
  { calories: '445.00', upload_date: '2019-12-31T21:42:45.559Z' },
  { calories: '1170.00', upload_date: '2019-12-31T21:42:28.609Z' },
  { calories: '445.00', upload_date: '2019-12-31T21:42:15.793Z' },
  { calories: '1079.00', upload_date: '2019-12-31T21:42:05.049Z' },
  { calories: '1079.00', upload_date: '2019-12-30T21:42:05.049Z' } // added for demo
  ]
  const output = input.reduce((all, next) => {
    const s = new Date(next.upload_date)
    const key = `${s.getFullYear()}-${(s.getUTCMonth() + 1)}-${s.getUTCDate()}`
    const exist = all.find(v => v.upload_date === key)
    if (exist) {
      exist.calories += Number(next.calories)
    } else {
      all.push({
        calories: Number(next.calories),
        upload_date: key
      })
    }
  
    return all
  
  
  }, [])  

  console.log(output)


  var myArray = [
    {date: "2017-01-01", num: "2"},
    {date: "2017-01-02", num: "3"},
    {date: "2017-02-04", num: "6"},
    {date: "2017-02-05", num: "15"}
],
    groupKey = 0;
    groups = myArray.reduce(function (r, o) {
        var m = o.date.split(('-'))[1];
        (r[m])? r[m].data.push(o) : r[m] = {group: String(groupKey++), data: [o]};
        return r;
    }, {});

var result = Object.keys(groups).map(function(k){ return groups[k]; });

console.log(result);
myArray = [
  {group: "0", data: [
     {date: "2017-01-01", num: "2"}
     {date: "2017-01-02", num: "3"}]
  },
  {group: "1", data: [  
     {date: "2017-02-04", num: "6"}
     {date: "2017-02-05", num: "15"}]
  },
]


var _ = require('lodash');
let myArray = [
  {date: "2017-01-01", num: "2"},
  {date: "2017-01-02", num: "3"},
  {date: "2017-02-04", num: "6"},
  {date: "2017-02-05", num: "15"}
]

// The one liner
_.groupBy(myArray, ({date})=> new Date(date).getMonth());



const arr = [{
    name: "Alice",
    created_at : "2017-04-18"
},
{
    name: "James",
    created_at : "2017-06-30"
},
{
    name: "Melisa",
    created_at : "2017-04-03"
},
{
    name: "Amy",
    created_at : "2017-05-03"
}];

var result = _(arr)
  .groupBy(v => moment(v.created_at).format('MMMM'))
  .mapValues(v => _.map(v, 'name'))
  .value();
  
console.log(result);

{
    Apr: [
        { name: "Alice", created_at : "2017-04-18" },
        { name: "Melisa", created_at : "2017-04-03" }
    ],
    Jun: .....
}
*/
  var data = [
      {
        version: "3.1.1",
        released_on: "2016-08-21T00:00:00.000Z",
        high_vulns: 15,
        medium_vulns: 10,
        low_vulns: 5,
      },
      {
        version: "3.1.1",
        released_on: "2011-08-21T00:00:00.000Z",
        high_vulns: 15,
        medium_vulns: 10,
        low_vulns: 5,
      },
      {
        version: "3.1.1",
        released_on: "2009-08-21T00:00:00.000Z",
        high_vulns: 15,
        medium_vulns: 10,
        low_vulns: 5,
      },
      {
        version: "3.1.1",
        released_on: "2006-08-21T00:00:00.000Z",
        high_vulns: 15,
        medium_vulns: 10,
        low_vulns: 5,
      },
      {
        version: "3.1.1",
        released_on: "2013-08-21T00:00:00.000Z",
        high_vulns: 15,
        medium_vulns: 10,
        low_vulns: 5,
      },
      {
        version: "3.1.1",
        released_on: "2017-08-21T00:00:00.000Z",
        high_vulns: 15,
        medium_vulns: 10,
        low_vulns: 5,
      },
      {
        version: "3.1.1",
        released_on: "2015-08-21T00:00:00.000Z",
        high_vulns: 15,
        medium_vulns: 10,
        low_vulns: 5,
      },
    ],
    ed = new Date("2016-08-21T00:00:00.000Z").getTime(),
    sd = new Date("2010-08-21T00:00:00.000Z").getTime(),
    result = data.filter((d) => {
      var time = new Date(d.released_on).getTime();
      return sd < time && time < ed;
    });
  console.log(result);
  return (
    <>
      <Content>
        <ContentHeader title="Journal de vente">
          <ActiveLink title="Journal de vente"></ActiveLink>
        </ContentHeader>
        <Page>{JSON.stringify(filterData(vetoo.rows, "albe"))}</Page>
      </Content>
    </>
  );
}

export default App;
