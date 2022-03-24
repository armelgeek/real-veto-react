import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import useModal from '../../hooks/useModal';
import { Link } from "react-router-dom";
import FromMagasinItem from "./FromMagasinItem";
import { Card } from "react-bootstrap";
import { clearFromMagasin } from "../../../../store/frommagasin/actions/frommagasin";
import { action, getData } from "../../../../utils/lib/call";
import { displayMoney, checkHasExistText } from "../../../../utils/functions";
import { HISTORIQUEVENTEVENDEUR } from "../../../../constants/routes";
import { useHistory } from "react-router-dom";
import Lang from "../../../../constants/lang";
import {
  handleSoldQuantityCC,
  handleMinusProduct,
  isSpecialProductHandle,
  handlePhtyoSpecific,
  handleMinusCondML,
} from "../../../../store/functions/function";
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
  return total;
};

const FromMagasin = () => {
  const [type, setType] = useState("vente-cva");
  const [idFournisseur, setIdFournisseur] = useState(1);
  const [vaccinateurId, setVaccinateurId] = useState(null);
  const [emprunter, setEmprunter] = useState(null);
  const history = useHistory();

  const { frommagasins } = useSelector((state) => ({
    frommagasins: state.frommagasins,
  }));
  const dispatch = useDispatch();
  const emprunters = useSelector(getData("emprunters").value);
  const meta = useSelector(getData("commandes").meta);
  const commandes = useSelector(getData("commandes").value);
  const date = new Date();
  const [dateCom, setDateCom] = useState(date);
  useEffect(() => {
    dispatch(action("commandes").fetch());
    dispatch(action("emprunters").fetch());
  }, []);

  const onCheckOut = () => {
    frommagasins.forEach((element) => {
      if (isSpecialProductHandle(element)) {
        handleMinusCondML(element);
      } else {
        //  handleMinusProduct(element);
        handleSoldQuantityCC(element);
      }
    });
    dispatch(
      action("commandes").createTransaction(
        {
          id: Math.floor(Date.now() / 1000),
          contenu: frommagasins,
          type: "vente-cva",
          sorte: "sortie",
          vaccinateurId: vaccinateurId,
          status: type === "vente-cva" ? true : false,
          emprunterId: emprunter,
          dateCom: dateCom != null ? dateCom : date,
        },
        "add-from-magasin"
      )
    );
    /*if (!meta.error) {
      frommagasins.forEach((element) => {
        let idElement = element.id;
        element.quantityParProduct = 0;
        element.qttByCC = 0;
        element.qttyspecificmirror = 0;
        element.id = idElement;
        dispatch(action("products").update(element));
      });
    }*/
    dispatch(clearFromMagasin());
    history.push(HISTORIQUEVENTEVENDEUR);
  };

  const onClearBasket = () => {
    frommagasins.forEach((element) => {
      element.quantityParProduct = 0;
      element.qttByCC = 0;
    });

    dispatch(clearFromMagasin());
  };

  return (
    <>
      <Card>
        <Card.Header className=" bg-dark py-2 text-white d-flex justify-content-between align-items-center">
          <div style={{ width: "60%" }}>
            BON DE SORTIE (
            {` ${frommagasins?.length} ${
              frommagasins?.length > 1 ? "articles" : "article"
            }`}
            )
          </div>
          <div style={{ width: "40%" }} className="text-right">
            <select
              className="form-control input-sm"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="vente-cva" selected>
                Comptant
              </option>
              <option value="credit-cva">Credit</option>
            </select>
          </div>
        </Card.Header>
        <div className="commande-vente">
          <Card.Body
            style={{ padding: 2, marginTop: 3, marginRight: 2, marginLeft: 2 }}
          >
            <div className="d-flex justify-content-end">
              <Link
                className="btn btn-primary mb-2 btn-sm"
                to={HISTORIQUEVENTEVENDEUR}
              >
                Voir l'historique de vente
              </Link>
            </div>
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
              {type === "credit-cva" && (
                <>
                  <label>Crediteur:</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setEmprunter(e.target.value);
                    }}
                  >
                    <option value=""></option>
                    {emprunters.map((v) => (
                      <option value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </>
              )}
              {frommagasins?.length <= 0 && (
                <div className="alert alert-success ">
                  {Lang.fromMagasin.emptyOrder}
                </div>
              )}
              {frommagasins?.map((product, i) => (
                <FromMagasinItem
                  key={`${product?.id}_${i}`}
                  product={product}
                  basket={frommagasins}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </Card.Body>

          {frommagasins?.length > 0 && (
            <Card.Footer className="d-flex align-items-center justify-content-between">
              <div style={{ width: "30%" }}>
                <h2 className="p-2 text-uppercase bg-primary">
                  <strong data-test-id="total-price-orders">
                    Total:
                    {displayMoney(
                      calculateTotal(
                        frommagasins.map((product) => {
                          return product.prixVente * product.quantityParProduct;
                        })
                      ) +
                        calculateTotal(
                          frommagasins.map((product) => {
                            return product.prixParCC * product.qttByCC;
                          })
                        )
                    )}
                  </strong>
                </h2>
              </div>
              <div style={{ width: "70%" }}>
                {frommagasins.length > 0 && (
                  <div className="d-flex text-right align-items-end justify-content-end">
                    <button
                      className="btn btn-green btn-sm mr-2"
                      disabled={frommagasins.length === 0}
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

export default FromMagasin;
