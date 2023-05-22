import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { action, getData } from "../../utils/lib/call";
import { useLocation } from "react-router-dom";
import { CREDIT } from "../../constants/routes";
import { getCredit, setPayerCommande } from "../../store/actions/commandes";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { displayDate, displayMoney } from "../../utils/functions";
import { useHistory } from 'react-router-dom';
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  let total = 0;
  arr.forEach((el) => {
    total += el.prixVente * el.quantityParProductDepot * 1;
  });
  return total;
};
function Detail(props) {
  let history = useHistory();
  const { id } = useParams();
  const commande = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").get(id));
  }, [id]);;
  return (
    <Content>
      <ContentHeader title="Détail de sortie ou entrée">
        <ActiveLink title="Détail de sortie ou entrée"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="badge badge-info my-2">
          {commande[0]?.type == "vente-depot-credit" && <h3>Credit</h3>}

          {commande[0]?.type == "vente-depot-vaccinateur" && (
            <h3>Credit pour vaccinateur</h3>
          )}

          {commande[0]?.type == "direct" && <h3>Direct</h3>}
        </div>
        {commande[0]?.type == "vente-depot-vaccinateur" && (
          <div className="border pl-3 py-3 bg-white">
            <>
              <h3 className="my-2">
                {" "}
                Nom du vaccinateur : {commande[0]?.vaccinateur.name}
              </h3>
              <h5>Contact : {commande[0]?.vaccinateur.contact}</h5>
            </>
          </div>
        )}
        {commande[0]?.type == "vente-depot-credit" && (
          <div className="border pl-3 py-3 bg-white">
            <>
              <h3 className="my-2">Nom:{commande[0]?.emprunter.name}</h3>
              <h5>Contact: {commande[0]?.emprunter.contact}</h5>
            </>
          </div>
        )}
        {commande.length > 0 && (
          <div className="d-flex justify-content-between">
            <p className="text-uppercase">
              Commande du : {displayDate(commande[0]?.dateCom)}
            </p>
            {commande[0]?.status == true ? (
              <p className="btn btn-sm btn-green my-2 mt-4">payé</p>
            ) : (
              <button
              className="btn btn-sm btn-warning my-3"
              onClick={() => {
                dispatch(setPayerCommande(commande[0]?.id));
                history.goBack();
              }}
            >
              Marquer comme payé
            </button>
            )}
          </div>
        )}
        <table className="table table-bordered ">
          <tr className="bg-thead">
            <td>Nom de l'article</td>
            <td>Quantité</td>
            <td>Sous total</td>
          </tr>
          {commande.length > 0 &&
            commande[0]?.contenu.map((c) => (
              <tr>
                <td style={{ width: "40%" }}>{c.name}</td>
                <td className="d-flex align-items-center">
                  {displayMoney(c.prixVente)}({"x"} {c.quantityParProductDepot})
                </td>

                <td>{displayMoney(c.prixVente * c.quantityParProductDepot)}</td>
              </tr>
            ))}
        </table>
        <div className="d-flex justify-content-end">
          <strong>Total</strong>:
          {displayMoney(calculateTotal(commande[0]?.contenu))}
        </div>
        
      </Page>
    </Content>
  );
}

export default withRouter(Detail);
