import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FromDepotItem from "./FromDepotItem";
import { Card } from "react-bootstrap";
import { action, getData } from "../../utils/lib/call";
import { displayMoney, checkHasExistText } from "../../utils/functions";
import { useHistory } from "react-router-dom";
import {
  handleMinusProductDepot,
  handlePhtyoSpecificDepot,
  handleSoldQuantityCCDepot,
} from "../../store/functions/function-depot";
import { clearFromDepot } from "../../store/fromdepot/actions/fromdepot";
import { SORTIE, CREDITVACCINATEUR, CREDIT } from "../../constants/routes";
import { Select } from '@chakra-ui/react';
import { isSpecialProductHandle } from '../composants/vendeur/fromMagasin/block-it';
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
  return total;
};

const FromDepot = ({ setRegenerate }) => {
  const [type, setType] = useState("vente-depot");
  const [idFournisseur, setIdFournisseur] = useState(1);
  const [vaccinateurId, setVaccinateurId] = useState(null);
  const [emprunter, setEmprunter] = useState(null);
  const history = useHistory();

  const { fromdepots } = useSelector((state) => ({
    fromdepots: state.fromdepots,
  }));
  const dispatch = useDispatch();
  const emprunters = useSelector(getData("emprunters").value);
  const vaccinateurs = useSelector(getData("vaccinateurs").value);
  const meta = useSelector(getData("commandes").meta);
  const commandes = useSelector(getData("commandes").value);
  const date = new Date();
  const [dateCom, setDateCom] = useState(date);
  useEffect(() => {
    dispatch(clearFromDepot());
    dispatch(action("commandes").fetch());
    dispatch(action("emprunters").fetch());
    dispatch(action("vaccinateurs").fetch());
  }, []);

  const onCheckOut = () => {
    if (dateCom == null || dateCom == "") {
      alert("Vous avez oublié de mettre la date de l'operation !!!");
      return;
    }
    for (let i = 0; i < fromdepots.length; ++i) {
      if (fromdepots[i].quantityParProductDepot == 0) {
        alert("Commande non conforme:" + fromdepots[i].name + " : 0");
        return;
      }
    }
    fromdepots.forEach((element) => {
      delete element.busy;
      delete element.pendingCreate;
      handleMinusProductDepot(element);
      if (element.condmldepot != 0 && element.qttccpventedepot != 0) {
        handlePhtyoSpecificDepot(element);
      } else {
        handleSoldQuantityCCDepot(element);
      }
    });
    //console.log(fromdepots);
    dispatch(
      action("commandes").createTransaction(
        {
          id: Math.floor(Date.now() / 1000),
          contenu: fromdepots,
          type: type,
          sorte: "sortie",
          vaccinateurId: vaccinateurId,
          status: type === "vente-depot" ? true : false,
          emprunterId: emprunter,
          dateCom: dateCom != null || dateCom != "" ? dateCom : date,
        },
        "add-from-depot"
      )
    );
    dispatch(clearFromDepot());
    if (type === "vente-depot-credit") {
      history.push(CREDIT);
    } else if (type === "vente-depot-vaccinateur") {
      history.push(CREDITVACCINATEUR);
    } else {
      history.push(SORTIE);
    }
  };

  const onClearBasket = () => {
    fromdepots.forEach((element) => {
      element.quantityParProductDepot = 0;
      element.qttByCCDepot = 0;
    });

    dispatch(clearFromDepot());
  };

  return (
    <>
      <Card>
        <Card.Header className=" bg-dark py-2 text-white d-flex justify-content-between align-items-center">
          <div style={{ width: "60%" }}>BON DE SORTIE </div>
          <div style={{ width: "30%" }} className="text-right">
            <Select
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="vente-depot" selected>
                Comptant
              </option>
              <option value="vente-depot-credit">Credit</option>
              <option value="vente-depot-vaccinateur">Vaccinateur</option>
            </Select>
          </div>
        </Card.Header>
        <div className="commande-vente">
          <Card.Body
            style={{ padding: 12, marginTop: 3, marginRight: 2, marginLeft: 2 }}
          >
            <div
              style={{
                overflowY: "auto",
                height: "350px",
                maxHeight: "350px",
                overflowX: "hidden",
              }}
            >
              <div class="form-group">
                <label>Date de sortie :</label>
                <div>
                  <input
                    type="date"
                    onChange={(e) => setDateCom(e.target.value)}
                    value={dateCom}
                    className="form-control"
                  />
                </div>
              </div>
              {type === "vente-depot-credit" && (
                <>
                  <label>Nom du persone:</label>
                  <select
                    className="form-control mb-2"
                    onChange={(e) => {
                      setEmprunter(e.target.value);
                    }}
                  >
                    <option>Selectionner une personne</option>
                    {emprunters.map((v) => (
                      <option value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </>
              )}
              {type === "vente-depot-vaccinateur" && (
                <>
                  <label>Nom du vaccinateur:</label>
                  <select
                    className="form-control mb-2"
                    onChange={(e) => {
                      setVaccinateurId(e.target.value);
                    }}
                  >
                    <option>Selectionner un vaccinateur</option>
                    {vaccinateurs.map((v) => (
                      <option value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </>
              )}
              {fromdepots?.length <= 0 && (
                <div className="alert alert-success">
                Choississez un produit sur la section "Produits" puis cliquez sur "Ajouter"
                </div>
              )}
              {fromdepots?.map((product, i) => (
                <FromDepotItem
                  key={`${product?.id}_${i}`}
                  product={product}
                  type={type}
                  basket={fromdepots}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </Card.Body>

          {fromdepots?.length > 0 && (
            <Card.Footer className="d-flex align-items-center justify-content-between">
              <div style={{ width: "30%" }}>
                <h2 className="p-2 text-uppercase bg-primary">
                  <strong data-test-id="total-price-orders">
                    Total:
                    {displayMoney(
                      calculateTotal(
                        fromdepots.map((product) => {
                          return isSpecialProductHandle(product) ? product.prixlitre * product.quantityParProductDepot : (type=="vente-depot" ? product.prixVente: product.prixVaccinateur) * product.quantityParProductDepot;
                        })
                      ) +
                        calculateTotal(
                          fromdepots.map((product) => {
                            return product.prixParCC * product.qttByCCDepot;
                          })
                        )
                    )}
                  </strong>
                </h2>
              </div>
              <div style={{ width: "70%" }}>
                {fromdepots.length > 0 && (
                  <div className="d-flex text-right align-items-end justify-content-end">
                    <button
                      className="btn btn-green btn-sm mr-2"
                      disabled={fromdepots.length === 0}
                      onClick={onCheckOut}
                      type="button"
                    >
                      Valider l'operation
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={onClearBasket}
                      type="button"
                    >
                      <span>Annuler</span>
                    </button>
                  </div>
                )}
              </div>
            </Card.Footer>
          )}
        </div>
      </Card>
    </>
  );
};

export default FromDepot;
