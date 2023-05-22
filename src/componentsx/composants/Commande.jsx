import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import Products from "./product";
export default function Commande() {
  const basket = useSelector((state) => state.basket);

  return (
    <Content>
      <ContentHeader title="Effectuer une sortie">
        <ActiveLink title="Effectuer une sortie"></ActiveLink>
      </ContentHeader>
      <Page>
        <Products />
      </Page>
    </Content>
  );
}
