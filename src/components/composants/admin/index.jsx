import React from "react";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import Products from '../../composants/admin/tomagasin/product';

export const AdminDashboard = () => {
  return (
    <>
      <Content>
        <ContentHeader title="Depot vers magasin">
          <ActiveLink title="Depot vers magasin"></ActiveLink>
        </ContentHeader>
        <Page>
        <Products />
          {/**   <GetAll model={"products"}>
            <Data>{({ data, meta }) => <>{JSON.stringify(data)}</>}</Data>
          </GetAll> */}
        </Page>
      </Content>
    </>
  );
};
