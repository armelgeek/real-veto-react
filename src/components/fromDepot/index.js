import React from "react";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../@adminlte/adminlte/Content/Page";
import Content from "../../@adminlte/adminlte/Content";
import Products from "./product";
const BonDepot = () => {
  return (
    <Content>
      <ContentHeader title="Bon de sortie du dépot">
        <ActiveLink title="Bon de sortie du dépot"></ActiveLink>
      </ContentHeader>
      <Page><Products /></Page>
    </Content>
  );
};

export default BonDepot;
