import React, { useState,useEffect } from "react";
import moment from 'moment';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import { withRouter } from "react-router-dom";
import { action, getData } from "../../../../utils/lib/call";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import Content from "../../../../@adminlte/adminlte/Content/index";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { HISTORIQUEVENTEVENDEUR } from "../../../../constants/routes";
import { isSpecialProductHandle } from "../../../../store/functions/function";
import { toast } from 'react-toastify';
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
  return total;
};

function Detail(props) {
  let history = useHistory();
  const { id } = useParams();
  const commande = useSelector(getData("commandes").value);
  const [dateCom, setDateCom] = useState(commande[0]?.dateCom || moment(new Date()));
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").get(id));
  }, [id]);
  const toggleShow = (value) =>{
    setToggle(value);
  }
  const appliquer = () =>{
  dispatch(
      action("commandes").updateData(
        {
        id: id,
        dateCom: dateCom
        },
        "update-price"
      )
    )
   toast('Modification de la date appliqué !!!', { autoClose: 5000 });
   history.push("/historique/vente/vendeur/vente-cva");
 }
 
  return (
    <div>
      <div className="bg-dark text-white p-3 d-flex justify-content-center align-items-center">
        <h1 className="">CABINET VETERINAIRE AMBALAVAO</h1>
      </div>
      <div className="py-5 container">
        <div className="d-flex justify-content-start">
          <button className="btn btn-primary btn-sm " onClick={()=> history.goBack()}>
            Revenir en arriere
          </button>
        </div>
        <div>
          {commande[0]?.type == "credit-cva" && (
            <div className="bg-info my-3 py-2">
              <>
                <h3 className="p-2">Nom:{commande[0]?.emprunter.name}</h3>
                <h5 className="p-2">Contact:{commande[0]?.emprunter.contact}</h5>
              </>
            </div>
          )}
          {commande.length > 0 && (
            <div className="d-flex justify-content-between">
            {toggle == true ? (
            <div className="my-2">
              <h5 className="mb-1 mt-2 text-md">Changement de date</h5>
              <div className="d-flex justify-content-between">
                <div>
                  <input
                    type="date"
                    onChange={(e) => setDateCom(e.target.value)}
                    value={dateCom}
                    className="form-control"
                  />
                </div>
                <div className="ml-2">
                  <button onClick={appliquer} className="btn btn-primary mr-1">Appliquer</button>
                  <button onClick={()=> toggleShow(false)}  className="btn btn-danger">Annuler</button>
                </div>
              </div>
              </div>
            ): (
              <div className="my-2">
                    <h3 className="p-2">Date de commande :{displayDate(commande[0]?.dateCom)}</h3>
                     <button  onClick={()=> toggleShow(true)} className="btn btn-warning btn-sm">Changer la date</button>
               </div>
            )} 

              <div className="d-flex justify-content-end">
                <div className="bg-thead p-1 mb-1">
                  <strong>Recette:</strong>:
                  <h3 className="text-lg">
                    {displayMoney(
                      calculateTotal(
                        commande[0]?.contenu?.map((product) => {
                          return isSpecialProductHandle(product)
                            ? product.prixqttccvente *
                                product.quantityParProduct *
                                product.qttccpvente +
                                product.prixlitre * product.qttbylitre
                            : product.prixVente * product.quantityParProduct;
                        })
                      ) +
                        calculateTotal(
                          commande[0]?.contenu?.map((product) => {
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
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default withRouter(Detail);
