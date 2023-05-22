import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { action, getData } from "../../utils/lib/call";
import Page from "../../@adminlte/adminlte/Content/Page";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import Content from "../../@adminlte/adminlte/Content/index";
import { displayMoney } from "../../utils/functions";
import { HISTORIQUEVENTEDEPOT } from "../../constants/routes";
import { isSpecialProductHandle } from '../../store/functions/function';

const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
  return total;
};

function DetailDepot(props) {
  let history = useLocation();
  const { id } = useParams();
  const commande = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").get(id));
  }, [id]);
  return (
    <div>
      <div className="bg-dark text-white p-3 d-flex justify-content-center align-items-center">
        <h1 className="">CABINET VETERINAIRE AMBALAVAO</h1>
      </div>
      <div className="p-3">
        <div class="d-flex justify-content-end">
          <Link class="btn btn-primary my-3" to={HISTORIQUEVENTEDEPOT}>
            Revenir en arriere
          </Link>
        </div>
        <div className="p-5">
          <p>
            {commande[0]?.type == "credit" && <p>Credit</p>}

            {commande[0]?.type == "vaccinateur" && <p>Sortie vaccinateur</p>}

            {commande[0]?.type == "direct" && <p>Sortie Magasin</p>}
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
                  <>
                  {isSpecialProductHandle(c) ? (
                      <>
                      {c.quantityParProductDepot != 0 && (
                          <div className="d-flex align-items-center py-0">
                            <strong>{c.type}:</strong>
                            {displayMoney(c.prixlitre)} ({"x"}{" "}
                            {c.quantityParProductDepot}) {" = "}
                            {displayMoney(c.prixlitre * c.quantityParProductDepot)}
                          </div>
                        )}
                      </>
                  ):(
                            <>
                            {c.quantityParProductDepot != 0 && (
                                <div className="d-flex align-items-center py-0">
                                  <strong>{c.type}:</strong>
                                  {displayMoney(c.prixVente)} ({"x"}{" "}
                                  {c.quantityParProductDepot}) {" = "}
                                  {displayMoney(c.prixVente * c.quantityParProductDepot)}
                                </div>
                              )}
                            </>
                  )}
                 
                  </>

                  {c.type == "FLACON" && (
                    <>
                      {c.qttByCCDepot != 0 && (
                        <div className="d-flex align-items-center  py-0">
                          <strong>ML:</strong> {displayMoney(c.prixParCC)} {"x"}{" "}
                          {c.qttyspecificmirrordepot!=0 ? c.qttyspecificmirrordepot + " Dose" : c.qttByCCDepot + " Ml" } {" = "}{" "}
                          {displayMoney(c.prixParCC * c.qttByCCDepot)}
                        </div>
                      )}
                    </>
                  )}
                  <td>
                    {displayMoney(
                      isSpecialProductHandle(c) ? c.prixlitre * c.quantityParProductDepot : c.prixVente * c.quantityParProductDepot +
                        c.prixParCC * c.qttByCCDepot
                    )}
                  </td>
                </tr>
              ))}
          </table>
          <div className="d-flex justify-content-end">
            <strong>Total</strong>:
            {displayMoney(
              calculateTotal(
                commande[0]?.contenu.map((product) => {
                  return isSpecialProductHandle(c) ? c.prixlitre * c.quantityParProductDepot : c.prixVente * c.quantityParProductDepot;
                })
              ) +
                calculateTotal(
                  commande[0]?.contenu.map((product) => {
                    return product.prixParCC * product.qttByCCDepot;
                  })
                )
            )}
          </div>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default withRouter(DetailDepot);
