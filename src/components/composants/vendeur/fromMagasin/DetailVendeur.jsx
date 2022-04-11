import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { action, getData } from "../../../../utils/lib/call";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import Content from "../../../../@adminlte/adminlte/Content/index";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { HISTORIQUEVENTEVENDEUR } from "../../../../constants/routes";
import { isSpecialProductHandle } from '../../../../store/functions/function';

const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
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
    <div>
      <div className="bg-dark text-white p-3 d-flex justify-content-center align-items-center">
        <h1 className="">CABINET VETERINAIRE AMBALAVAO</h1>
      </div>
      <div className="py-5 container">
        <div class="d-flex justify-content-start">
          <Link class="btn btn-primary btn-sm " to={HISTORIQUEVENTEVENDEUR}>
            Revenir en arriere
          </Link>
        </div>
        <div>
          <p>{commande[0]?.type == "credit-cva" && <p>Credit</p>}</p>
          {commande[0]?.type == "credit-cva" && (
            <div className="border">
              <>
                <h3>{commande[0]?.emprunter.name}</h3>
                <h5>{commande[0]?.emprunter.contact}</h5>
              </>
            </div>
          )}
          {commande.length > 0 && (
            <div className="d-flex justify-content-between">
              <div className="my-2">
                <h2 className="my-2">
                  Date : {displayDate(commande[0]?.dateCom)}
                </h2>
                <Link
                  to={`/vendeur-commande/${commande[0]?.id}`}
                  className="btn btn-warning btn-sm mr-2"
                >
                  Editer le commande
                </Link>
              </div>

              <div className="d-flex justify-content-end">
                <div className="bg-thead p-1 mb-1">
                  <strong>Recette:</strong>:
                  <h3 className="text-lg">
                    {displayMoney(
                      calculateTotal(
                        commande[0]?.contenu.map((product) => {
                          return product.prixVente * product.quantityParProduct;
                        })
                      ) +
                        calculateTotal(
                          commande[0]?.contenu.map((product) => {
                            return product.prixParCC * product.qttByCC;
                          })
                        )
                    )}
                  </h3>
                </div>
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
 
                  {isSpecialProductHandle(c) && (
                      <>
                        {c.qttbylitre != 0 && (
                          <div className="d-flex align-items-center py-0 px-2">
                            <strong>Boite :</strong>
                            {displayMoney(c.prixVente)} ({"x"}{" "}
                            {c.qttbylitre}) {" = "}
                            {displayMoney(c.prixVente * c.qttbylitre)}
                          </div>
                        )}
                      </>
                    )}
                    {c.quantityParProduct != 0 && (
                      <div className="d-flex align-items-center py-0">
                        <strong>{c.type}:</strong>
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
                          <strong>ML:</strong> {displayMoney(c.prixParCC)} {"x"}{" "}
                          {c.qttyspecificmirror != 0
                            ? c.qttyspecificmirror + " Dose"
                            : c.qttByCC + " Ml"}{" "}
                          {" = "} {displayMoney(c.prixParCC * c.qttByCC)}
                        </div>
                      )}
                    </>
                  )}
                  <td>
                    {displayMoney(
                      c.prixVente * c.quantityParProduct +
                        c.prixParCC * c.qttByCC
                    )}
                  </td>
                </tr>
              ))}
          </table>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default withRouter(Detail);
