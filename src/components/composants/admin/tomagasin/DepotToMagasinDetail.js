import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { action, getData } from "../../../../utils/lib/call";
import { useLocation } from "react-router-dom";
import { CREDIT } from "../../../../constants/routes";
import { getCredit, setPayerCommande } from "../../../../store/actions/commandes";
import Content from "../../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { useHistory } from 'react-router-dom';
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  let total = 0;
  arr.forEach((el) => {
    total += el.prixVente * el.quantityParProduct * 1;
  });
  return total;
};
function DepotToMagasinDetail(props) {
  let history = useHistory();
  const { id } = useParams();
  const commande = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").get(id));
  }, [id]);;
  return (
    <Content>
      <ContentHeader title="Détail de sortie vers magasin">
        <ActiveLink title="Détail de sortie vers magasin"></ActiveLink>
      </ContentHeader>
      <Page>
        
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
                  {displayMoney(c.prixVente)}({"x"} {c.quantityParProduct})
                </td>

                <td>{displayMoney(c.prixVente * c.quantityParProduct)}</td>
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

export default withRouter(DepotToMagasinDetail);
