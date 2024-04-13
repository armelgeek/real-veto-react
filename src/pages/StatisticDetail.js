import React from "react";
import Content from "../@adminlte/adminlte/Content";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import Page from "../@adminlte/adminlte/Content/Page";
import StatisticToDay from "../components/StatisticToDay";

const StatisticDetail = () => {
  return (
    <Content>
      <ContentHeader title="Journal de vente du magasin">
        <ActiveLink title="Journal de vente du magasin"></ActiveLink>
      </ContentHeader>
      <Page>
        <StatisticToDay isHome={false}/>
      </Page>
    </Content>
  );
};

export default StatisticDetail;
