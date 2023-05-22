import React, { useEffect, useState, useCallback } from "react";
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
import DataTable from "../../utils/admin/DataTable";
import { displayDate, displayMoney } from "../../utils/functions";
import { Select } from "@chakra-ui/react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
export default function ChangerPrix() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [type, setType] = useState("vente-magasin");
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("commandes").meta);
  const [dateRange, onChangeDateRange] = useState([]);
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
  const columns = React.useMemo(
    () => [
      {
        Header: "Date Début",
        accessor: "deb",
      },
      {
        Header: "Date Fin",
        accessor: "fin",
      },
      {
        Header: "Informations",
        Cell: (data) => {
          return (
            <table className="table text-center">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ancien prix du litre</th>
                  <th>Nouvel prix du litre </th>
                  <th>Ancien prix en quantité</th>
                  <th>Nouvel prix en quantité</th>
                  <th>Ancien prix en ML</th>
                  <th>Nouvel prix en ML</th>
                </tr>
              </thead>
              <tbody>
                {data.row.original?.data.map((item, index) => (
                  <tr key={index}>
                    <td>{displayDate(item.createdAt)}</td>
                    <td>
                      {item.lastPriceLitre != "no"
                        ? displayMoney(
                            item.lastPriceLitre != "" ? item.lastPriceLitre : 0
                          )
                        : ""}
                    </td>
                    <td>
                      {item.newPriceLitre != "no"
                        ? displayMoney(item.newPriceLitre)
                        : ""}
                    </td>
                    <td>{displayMoney(item.lastPrice)}</td>
                    <td>{displayMoney(item.newPrice)}</td>
                    <td>
                      {item.lastPriceCC != "no"
                        ? displayMoney(item.lastPriceCC)
                        : ""}
                    </td>
                    <td>
                      {item.newPriceCC != "no"
                        ? displayMoney(item.newPriceCC)
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <Content>
        <ContentHeader title="Rectification de prix">
          <ActiveLink title="Rectification de prix"></ActiveLink>
        </ContentHeader>
        <Page>
          <div className="d-flex flex-row justify-content-between">
            <h2
              className="mb-2"
              style={{
                fontSize: 20,
              }}
            >
              {products[0]?.name}
            </h2>
            <div></div>
          </div>

          <Form
            enableReinitialize
            initialValues={{
              type: "vente-magasin",
              prices: [],
            }}
            validations={validationSchema}
            onSubmit={postInfos}
            render={({ values }) => (
              <Form.Element>
                <div
                  style={{
                    width: "30%",
                  }}
                >
                  <Form.Field.Select
                    name="type"
                    label="Type de sortie"
                    emptyValue={false}
                    valueKey="name"
                    disabled={false}
                    defaultValue={1}
                    options={[
                      {
                        id: 1,
                        name: "Vente du Magasin",
                      },
                      {
                        id: 2,
                        name: "Facture",
                      },
                    ]}
                  />
                </div>

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
          <h2 className="my-3">Recapitulatif des changements</h2>
          <DataTable
            filter={false}
            data={meta?.data?.recap}
            meta={meta}
            columns={columns}
          />
        </Page>
      </Content>
    </>
  );
}
