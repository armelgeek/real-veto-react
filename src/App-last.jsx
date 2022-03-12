import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import _ from "lodash";
import withCrudify from "./decorators/withCrudify";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";
import Products from "./components/composants/product";
import ContentHeader from "./@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "./@adminlte/adminlte/Content/ActiveLink";
import Content from "./@adminlte/adminlte/Content";
import Page from "./@adminlte/adminlte/Content/Page";
import BeneficeEtResteApay from "./components/composants/BeneficeEtResteApay";
import moment from "moment";
function App() {
/*  const input = [
    {
      name: "John",
      events: "600",
      created_at: "2021-01-20T14:56:42.368+00:00",
    },
    {
      name: "Edward",
      events: "900",
      created_at: "2021-01-20T20:56:42.368+00:00",
    },
    {
      name: "Jane",
      events: "100",
      created_at: "2021-01-19T13:56:42.368+00:00",
    },
    {
      name: "Robert",
      events: "700",
      created_at: "2021-01-19T15:56:42.368+00:00",
    },
  ];
  const messages = [
    {
      id: "messageId",
      text: "Hello!",
      date: new Date("2021/01/01")
    },
    {
      id: "messageId",
      text: "Same day!",
      date: new Date("2021/01/01")
    },
    {
      id: "messageId",
      text: "Another day!",
      date: new Date("2021/01/02")
    },
 ];
//https://stackoverflow.com/questions/48945753/javascript-group-items-from-array-of-objects-or-records-by-date
 const object = messages.reduce((r, { date: day, ...rest }) => {
   const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`
   if (!r[key]) r[key] = {day, data: [rest]}
   else r[key].data.push(rest)
   return r;
 }, {})

 const result = Object.values(object)

 console.log(result)
  function groupDataBeyondDaily(data) {
    const group = data.reduce((a, o) => {
      const date = new Date(o["created_at"]),
        day = Math.floor(date / 8.64e7); // 86,400,000ms per day
      //let entry = (a[day] ??= { ...o }); using logical nullish assignment
      let entry = (a[day] = a[day] || { ...o });
      if (new Date(entry["created_at"]) < date) {
        a[day] = { ...o };
      }
      return a;
    }, {});

    return Object.values(group);
  }

  console.log(groupDataBeyondDaily(input));

*/
/*

  const data = [{"id": 470830,"input": "MANUAL","value": 10000,"date": "2019-09-23T08:01:09.976Z"},{"id": 435258,"input": "AUTO","value": 20000,"date": "2019-09-23T10:01:09.976Z"},{"id": 435207,"input": "MANUAL","value": 5000,"date": "2019-09-24T12:01:09.976Z"},{"id": 435208,"input": "AUTO","value": 15000,"date": "2019-09-24T14:01:09.976Z"}]
  const result = Object
    .values(data.reduce((acc, { id, input, value, date }) => {
      const ds = date.substring(0, 10)
      acc[ds] = acc[ds] || { id, value: 0, date: ds }
      acc[ds] = {
        id: acc[ds].id,
        date: ds,
        value: acc[ds].value + value
      }
      return acc
    }, {}))

  console.log(result)*//*
  var showtimesData = [
    {"location":"location1", "date":"
    
    ", "time":"1:00"},
    {"location":"location1", "date":"31-12-2016", "time":"2:00"},
    {"location":"location1", "date":"01-01-2017", "time":"3:00"},
    {"location":"location1", "date":"01-01-2017", "time":"4:00"},
    {"location":"location2", "date":"31-12-2016", "time":"1:00"},
    {"location":"location2", "date":"31-12-2016", "time":"2:00"},
    {"location":"location2", "date":"01-01-2017", "time":"3:00"},
    {"location":"location2", "date":"01-01-2017", "time":"4:00"},
];

var transformed = showtimesData.reduce(function(obj, show){
//var { location, date, time } = show; //if destructuring is available
var location = show.location,
  date = show.date,
  time = show.time,
  objLocation = obj[location] = obj[location] || { dates : { } },
  dates = objLocation.dates,
  date = dates[date] = dates[date] || [ ];

  date.push(time);
  return obj;
}, {});

var secondTransformed = Object.keys(transformed).map(function(key){
var dates = transformed[key].dates,
  transformedDates = Object.keys(dates).map(function(key){
      return { date : key, times : dates[key] }
  });
return { location : key, dates : transformedDates }
});
console.log(secondTransformed)
var data = [{ car: "audi", type: "A6", style: "Avant", year: 1996 }, { car: "audi", type: "A4", style: 2, year: 2006 }, { car: "audi", type: "A4", style: "L W12", year: 2006 }, { car: "audi", type: 80, style: "GLE", year: 1975 }, { car: "audi", type: "A6", style: "Avant L", year: 1996 }, { car: "audi", type: "A6", style: "3.2 Multitronic", year: 2006 }],
keys = ['car', 'year', 'type'],
result = [];

data.forEach(function (a) {
keys.reduce(function (r, k) {
    var o = {};
    if (!r[a[k]]) {
        r[a[k]] = { _: [] };
        o[a[k]] = r[a[k]]._;
        r._.push(o);
    }
    return r[a[k]];
}, this)._.push(a.style);
}, { _: result });

console.log(result);*/
var datat = [
  {"dateCom": "2022-01-08","contenu": [{
    "id": 25,
    "name": "ALBECTIN 2 500 mg",
    "quantityBrute": 260,
    "quantityCCCVA": 0,
  }] }
]
var showtimesData = [
  {"location":"location1", "date":"", "time":"1:00"},
  {"location":"location1", "date":"31-12-2016", "time":"2:00"},
  {"location":"location1", "date":"01-01-2017", "time":"3:00"},
  {"location":"location1", "date":"01-01-2017", "time":"4:00"},
  {"location":"location2", "date":"31-12-2016", "time":"1:00"},
  {"location":"location2", "date":"31-12-2016", "time":"2:00"},
  {"location":"location2", "date":"01-01-2017", "time":"3:00"},
  {"location":"location2", "date":"01-01-2017", "time":"4:00"},
];

var transformed = showtimesData.reduce(function(obj, show){
//var { location, date, time } = show; //if destructuring is available
var location = show.location,
date = show.date,
time = show.time,
objLocation = obj[location] = obj[location] || { dates : { } },
dates = objLocation.dates,
date = dates[date] = dates[date] || [ ];

date.push(time);
return obj;
}, {});

var secondTransformed = Object.keys(transformed).map(function(key){
var dates = transformed[key].dates,
transformedDates = Object.keys(dates).map(function(key){
    return { date : key, times : dates[key] }
});
return { location : key, dates : transformedDates }
});
console.log(secondTransformed)
  return (
    <Content>
      <ContentHeader title="Journal de vente">
        <ActiveLink title="Journal de vente"></ActiveLink>
      </ContentHeader>
      <Page></Page>


      
    </Content>
  );
}

export default App;
