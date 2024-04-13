import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { action, getData } from "../../../../utils/lib/call";
import Content from "../../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { HISTORIQUECORRECTION } from "../../../../constants/routes";
import { isSpecialProductHandle } from "../../../../store/functions/function";
import { getCorrection } from "../../admin/tomagasin/DepotToMagasinDetail";

const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
  return total;
};

function DetailCorrection(props) {
  let history = useLocation();
  const { id } = useParams();
  const commande = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").get(id));
  }, [id]);
  return (
    <Content>
      <ContentHeader title="Historique de correction">
        <ActiveLink title="Historique de correction"></ActiveLink>
      </ContentHeader>
      <Page>
        <div>
          {commande.length > 0 && (
            <div className="d-flex justify-content-between">
              <div className="my-2">
                <h2 className="my-2">
                  Date : {displayDate(commande[0]?.dateCom)}
                </h2>
              </div>
            </div>
          )}
          <table className="table table-bordered">
            <tr className="bg-thead">
              <td>Nom de l'article</td>
              <td>Quantité</td>
              <td>Sous total</td>
            </tr>
            {commande.length > 0 &&
              commande[0]?.contenu.map((c) => (
                <tr>
                  <td style={{ width: "40%" }}>{c.name}</td>
                  <>
                  
                  {c.qttbybrute != 0 && (
                      <div className="d-flex align-items-center py-0">
                        <strong className="text-lowercase">Depot:</strong>
                        {displayMoney(c.prixVente)} ({"x"}{" "}
                        {c.qttbybrute}) {" = "}
                        {displayMoney(c.prixVente * c.qttbybrute)}
                      </div>
                    )}
                    {isSpecialProductHandle(c) && (
                      <>
                        {c.qttbylitre != 0 && (
                          <div className="d-flex align-items-center py-0 px-2">
                            <strong>Litre :</strong>
                            {displayMoney(c.prixlitre)} ({"x"} {c.qttbylitre}){" "}
                            {" = "}
                            {displayMoney(c.prixlitre * c.qttbylitre)}
                          </div>
                        )}
                      </>
                    )}
                    {c.quantityParProduct != 0 && (
                      <div className="d-flex align-items-center py-0">
                        <strong className="text-lowercase">{c.type}:</strong>
                        {displayMoney(c.prixVente)} ({"x"}{" "}
                        {c.quantityParProduct}) {" = "}
                        {displayMoney(c.prixVente * c.quantityParProduct)}
                      </div>
                    )}
                  </>

                  {c.type == "FLACON" && (
                    <>
                      {c.qttByCC != 0 && (
                        <div className="d-flex align-items-center  py-0">
                          <strong>ml:</strong> {displayMoney(c.prixParCC)} {"x"}{" "}
                          {c.qttyspecificmirror != 0
                            ? c.qttyspecificmirror + " Dose"
                            : c.qttByCC + " ml"}{" "}
                          {" = "} {displayMoney(c.prixParCC * c.qttByCC)}
                        </div>
                      )}
                    </>
                  )}
                  <td>
                    {isSpecialProductHandle(c)
                      ? displayMoney(
                          c.prixqttccvente *
                            c.quantityParProduct *
                            c.qttccpvente +
                            c.prixlitre * c.qttbylitre +
                            c.prixParCC * c.qttByCC
                        )
                      : displayMoney(
                          c.prixVente * c.quantityParProduct +
                            c.prixParCC * c.qttByCC
                        )}
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </Page>
    </Content>
  );
}

export default withRouter(DetailCorrection);
