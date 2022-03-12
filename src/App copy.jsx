import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import _ from 'lodash';
import withCrudify from "./decorators/withCrudify";
import Notification from "./components/Notification";
import { useSelector } from "react-redux";
import Products from "./components/composants/product";
import ContentHeader from "./@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "./@adminlte/adminlte/Content/ActiveLink";
import Content from "./@adminlte/adminlte/Content";
import Page from "./@adminlte/adminlte/Content/Page";
import Form from "./utils/Form/Form";
import BeneficeEtResteApay from "./components/composants/BeneficeEtResteApay";
function App({ redux, location }) {
  var data = [
    {'name' : 'example1', 'date' : '2011-01-01'},
    {'name' : 'example1', 'date' : '2011-01-02'},
    {'name' : 'example1', 'date' : '2011-02-02'},
    {'name' : 'example1', 'date' : '2011-02-15'},
    {'name' : 'example1', 'date' : '2011-02-17'},
    {'name' : 'example1', 'date' : '2012-01-01'},
    {'name' : 'example1', 'date' : '2012-03-03'},
  ];

  function groupByMonthWeek(data) {
    var year, month, week
    return data.reduce(function (acc, obj) {
      var b = obj.date.split(/\D/);
    
      // Get custom week number, zero padded
      var weekNum = '0' + Math.ceil(b[2]/7);

      // Add year if not already present
      if (!acc[b[0]]) acc[b[0]] = {};
      year = acc[b[0]];
    
      // Add month if not already present
      if (!year[b[1]]) year[b[1]] = {};
      month = year[b[1]];
    
      // Add week if not already present
      if (!month[weekNum]) month[weekNum] = [];

      // Add object to  week
      month[weekNum].push(obj);

      return acc;    
    }, Object.create(null));
  }

  console.log(groupByMonthWeek(data));
  return (
    <div>ceci est l'accueil</div>
  );
}

export default withCrudify(App);
