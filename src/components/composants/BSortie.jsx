import React from "react";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
const BSortie = () => {
  return (
    <Content>
      <ContentHeader title="Sortie">
        <ActiveLink title="Sortie"></ActiveLink>
      </ContentHeader>
      <Page></Page>
    </Content>
  );
};

export default BSortie;
