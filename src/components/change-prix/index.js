import React, { useEffect, useCallback } from "react";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import Content from "../../@adminlte/adminlte/Content";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import Form from "../../utils/form/index";
import { validationSchema } from "./validation";
import { Price } from "./Price";
export default function ChangerPrix() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("commandes").meta);
  useEffect(() => {
    dispatch(action("products").get(id));
  }, []);
  const postInfos = useCallback((values) => {
    dispatch(
      action("commandes").createTransaction(
        { ...values, id },
        "get-commande-bw"
      )
    );
  }, []);
  return (
    <Content>
      <ContentHeader title="Rectification de prix">
        <ActiveLink title="Rectification de prix"></ActiveLink>
      </ContentHeader>
      <Page>
        <h3>{products[0]?.name}</h3>
        <h2>Ajouter des dates</h2>
        {JSON.stringify(meta)}
        <Form
          enableReinitialize
          initialValues={{
            prices: [],
          }}
          validations={validationSchema}
          onSubmit={postInfos}
          render={({ values }) => (
            <Form.Element>
              <Price />
              <div className="mt-3">
                <button className="btn btn-green  btn-sm " type="submit">
                  Appliquer les changements
                </button>
                <button className="btn btn-danger ml-2  btn-sm " type="reset">
                  Annuler
                </button>
              </div>
            </Form.Element>
          )}
        />
      </Page>
    </Content>
  );
}
