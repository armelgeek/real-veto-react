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
  var input = [
    {"quantity":1067,"gross_revenue":4094.2,"date":"03","company":"Cat1","product":"Car"},
    {"quantity":106,"gross_revenue":409,"date":"02","company":"Cat2","product":"Car"},
    {"quantity":106,"gross_revenue":85,"date":"03","company":"Cat2","product":"House"},
    {"quantity":106,"gross_revenue":100,"date":"02","company":"Cat3","product":"House"},
    {"quantity":20,"gross_revenue":150,"date":"03","company":"Cat5","product":"Technology"},
    {"quantity":40,"gross_revenue":100,"date":"01","company":"Cat5","product":"Technology"},
    {"quantity":20,"gross_revenue":15,"date":"01","company":"Cat5","product":"Car"},
    {"quantity":20,"gross_revenue":18,"date":"01","company":"Cat5","product":"House"},
    {"quantity":20,"gross_revenue":2,"date":"01","company":"Cat2","product":"House"},
    {"quantity":20,"gross_revenue":25,"date":"01","company":"Cat3","product":"House"}
  ];


  var result = [];

  var groupedByProduct = _.groupBy(input, "product");
  var dates = _.uniq(_.map(input, 'date'));
  _.forEach(groupedByProduct, function(value, key) {
      data = [];
      for (var i = 0; i < dates.length; i++) {
          data.push(null);
      _.forEachRight(_.groupBy(groupedByProduct[key], "date"), function(dateValue, dateKey) {
          data[parseInt(dateKey) - 1] = _.sumBy(dateValue, function(o) {
              return o.gross_revenue
          });
      });
      result.push({"name": key, "data": data});
  });
  return (
    <div>ceci est l'accueil</div>
  );
}

export default withCrudify(App);
