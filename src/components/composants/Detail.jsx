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
import { displayMoney } from "../../utils/functions";
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  let total = 0;
  arr.forEach((el) => {
    total += el.prixVente * el.quantityParProduct;
  });
  return total;
};
function Detail(props) {
  let history = useLocation();
  const { id } = useParams();
  const commande = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").get(id));
  }, [id]);
  return (
    <Content>
      <ContentHeader title="Détail de sortie ou entrée">
        <ActiveLink title="Détail de sortie ou entrée"></ActiveLink>
      </ContentHeader>
      <Page>
     
        <p>
          {commande[0]?.type == "credit" && <p>Credit</p>}

          {commande[0]?.type == "vaccinateur" && <p>Sortie vaccinateur</p>}

          {commande[0]?.type == "direct" && <p>Sortie Magasion</p>}
        </p>
        {commande[0]?.type == "vaccinateur" && (
          <div className="border">
            <>
              <h3>{commande[0]?.vaccinateur.name}</h3>
              <h5>{commande[0]?.vaccinateur.contact}</h5>
            </>
          </div>
        )}
        {commande[0]?.type == "credit" && (
          <div className="border">
            <>
              <h3>{commande[0]?.emprunter.name}</h3>
              <h5>{commande[0]?.emprunter.contact}</h5>
            </>
          </div>
        )}
        {commande.length > 0 && (
          <div className="d-flex justify-content-between">
            <p>
              Date : {commande[0]?.dateCom}
              <span className="text-danger ml-3">{commande[0]?.type}</span>
            </p>
            {/* <p className="btn btn-sm btn-green mt-4">payé</p>*/}
          </div>
        )}
        <table className="table table-bordered">
          <tr>
            <td>Nom de l'article</td>
            <td>Quantité</td>
            <td>Sous total</td>
          </tr>
          {commande.length > 0 &&
            commande[0]?.contenu.map((c) => (
              <tr>
                <td style={{ width: "40%" }}>{c.name}</td>
                <td className="d-flex align-items-center">
                  {displayMoney(c.prixVente)}({"x"} {c.quantityParProduct}
                  )
                </td>
                <td>
                  {displayMoney(c.prixVente * c.quantityParProduct)}
                </td>
              </tr>
            ))}
        </table>
        <div className="d-flex justify-content-end">
          <strong>Total</strong>:
          <NumberFormat
            value={calculateTotal(commande[0]?.contenu)}
            displayType={"text"}
            thousandSeparator={true}
            suffix={"Ar"}
            renderText={(value, props) => <div {...props}>{value}</div>}
          />
        </div>

        {commande[0]?.status == false && (
          <button
            className="btn btn-sm btn-green"
            onClick={() => {
              dispatch(setPayerCommande(commande[0]?.id));
              dispatch(getCredit());
              history.push(CREDIT);
            }}
          >
            Marquer comme payé
          </button>
        )}
      </Page>
    </Content>
  );
}

export default withRouter(Detail);
