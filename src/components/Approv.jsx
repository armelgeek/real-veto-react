import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../utils/lib/call";
import ApprovItem from "../components/ApprovItem";import Content from "../@adminlte/adminlte/Content";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";

export default function Approv() {
  const products = useSelector(getData("products").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  return (
    <Content>
      <ContentHeader title="Approvisionnement">
        <ActiveLink title="Approvisionnement"></ActiveLink>
      </ContentHeader>
      <Page>
        <table className="table table-bordered table-striped">
          <thead>
            <tr className="text-center">
              <th>Nom de l'article</th>
              <th style={{ width: "15%" }}>Qte</th>
              <th style={{ width: "15%" }}>Nouvel</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
    <tbody>
          {products.map((p) => (
            <ApprovItem product={p} />
          ))}

    </tbody>
        </table>
      </Page>
    </Content>
  );
}
