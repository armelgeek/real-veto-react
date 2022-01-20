import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState } from "react";
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
  return (
    <div>ceci est l'accueil</div>
  );
}

export default withCrudify(App);
