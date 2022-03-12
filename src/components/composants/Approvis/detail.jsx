import React from "react";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { action, getData } from "../../../utils/lib/call";
import { useParams } from "react-router-dom";
import { NumberToLetter } from "convertir-nombre-lettre";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import { Card } from "react-bootstrap";
import { displayDate } from "../../../utils/functions";
const DetailApprov = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const approv = useSelector(getData("approvis").value);
  React.useEffect(() => {
    dispatch(action("approvis").get(id));
  }, [id]);
  console.log(approv);
  return (
    <Content>
      <ContentHeader title="Détail d'approv.">
        <ActiveLink title="Detail d'approv."></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="bg-white p-2">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white">
              Détail du facture ({displayDate(approv[0]?.dateApprov)})
            </Card.Header>
            <Card.Body>
              <p>Arrêté à la somme de </p>
              <p className="text-uppercase my-2">
                <strong>{NumberToLetter(approv[0]?.total)} ARIARY</strong>
              </p>
              <tr>
                <td>
                  <strong>Date Echeance</strong> :{" "}
                  {displayDate(approv[0]?.dateEcheance)}
                </td>{" "}
              </tr>
              <td className="mb-1">
                <h3>Remarque</h3>
                <p class="text-info">{approv[0]?.remarque}</p>
              </td>
              <br />
              <h3 >
                {" "}
                <strong>ARTICLES</strong>
              </h3>
              {approv[0]?.contenu.map((app) => (
                <div className="border mb-3 p-3">
                  <tr>
                    <td>Nom de l'article:</td>
                    <td>{app?.name}</td>
                  </tr>
                  <tr>
                    <td>Quantité:</td>
                    <td>{app?.quantityParProduct}</td>
                  </tr>
                  <tr>
                    <td>Prix unitaire:</td>
                    <td>
                      <NumberFormat
                        value={app?.prixFournisseur}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"Ar"}
                        renderText={(value, props) => (
                          <div {...props}>{value}</div>
                        )}
                      />
                    </td>
                  </tr>
                </div>
              ))}
              <tr>
                <td>
                  <strong>Remise :</strong> {approv[0]?.remise} %
                </td>
              </tr>
              <tr>
                <td class="text-uppercase">
                  <strong>Paiement en :</strong>
                  {approv[0]?.typePaye}
                </td>
              </tr>
              <tr>
                <td class="text-uppercase">
                  <strong>Total:</strong>
                  <NumberFormat
                    value={approv[0]?.total}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"Ar"}
                    renderText={(value, props) => <div {...props}>{value}</div>}
                  />
                </td>
              </tr>{" "}
            </Card.Body>
          </Card>
        </div>
      </Page>
    </Content>
  );
};

export default DetailApprov;
