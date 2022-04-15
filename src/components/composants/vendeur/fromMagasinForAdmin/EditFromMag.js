import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { action, getData } from "../../../../utils/lib/call";
import {
  displayMoney,
  checkHasExistText,
  displayDate,
} from "../../../../utils/functions";

import { useHistory } from "react-router-dom";
import {
  handleMinusProductDepot,
  handlePhtyoSpecificDepot,
  handleSoldQuantityCCDepot,
} from "../../../../store/functions/function-depot";
import { clearFromDepot } from "../../../../store/fromdepot/actions/fromdepot";
import EditFromDepotItem from "./EditItem";
import { HISTORIQUEVENTEVENDEUR_ADMIN } from "../../../../constants/routes";
import { Link } from "react-router-dom";
import { isSpecialProductHandle, locked } from "./block-it";
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
  return total;
};
function copy(object) {
  var output, value, key;
  output = Array.isArray(object) ? [] : {};
  for (key in object) {
    value = object[key];
    output[key] = typeof value === "object" ? copy(value) : value;
  }
  return output;
}
const EditToFromMag = ({
  state,
  meta,
  setState,
  disabled,
  products,
  commandes,
}) => {
  const [type, setType] = useState("direct");
  const [idFournisseur, setIdFournisseur] = useState(1);
  const [vaccinateurId, setVaccinateurId] = useState(null);
  const [emprunter, setEmprunter] = useState(null);
  const history = useHistory();
  const [realContent, setRealContent] = useState([]);

  const { fromdepots } = useSelector((state) => ({
    fromdepots: state.fromdepots,
  }));
  useEffect(() => {
    setRealContent(commandes?.contenu);
  }, [commandes]);
  const dispatch = useDispatch();
  const emprunters = useSelector(getData("emprunters").value);
  //const meta = useSelector(getData("commandes").meta);
  const date = new Date();
  const [dateCom, setDateCom] = useState(date);
  useEffect(() => {
    //  dispatch(action("commandes").fetch());
    dispatch(action("emprunters").fetch());
  }, []);

  const getContenu = () => {
    // console.log(missing);
    const missing = copy(realContent).filter(
      (e) => !state.find((a) => e.id === a.id)
    );
    const added = copy(realContent).filter(
      (e) => !state.find((a) => e.id === a.id)
    );

    const exist = copy(realContent).map((element) =>
      state.find((p) => p.id === element.id)
    );
    return {
      exist: exist.filter((e) => e != null),
      added,
      missing,
    };
  };

  const onCheckOut = () => {
    const { exist, added, missing } = getContenu();

    if (!locked(state)) {
      dispatch(
        action("commandes").updateTransaction(
          {
            id: commandes?.id,
            contenu: state,
            commande: state,
            type: "vente-cva",
            sorte: "sortie",
            sorte: "sortie",
            status: true,
            dateCom: dateCom != null ? dateCom : date,
            exist: exist,
            added: added,
            missing: missing,
          },
          "update-from-magasin"
        )
      );
      //history.push(HISTORIQUEVENTEVENDEUR);
    } else {
      alert("modification non conforme,veuillez verifier");
    }
  };

  const onClearBasket = () => {
    state?.forEach((element) => {
      element.quantityParProduct = 0;
      element.qttByCCDepot = 0;
    });

    dispatch(clearFromDepot());
  };
  return (
    <>
      <Card>
        <Card.Header className=" bg-dark py-3 text-white d-flex justify-content-between align-items-center">
          <div style={{ width: "60%" }}>BON DE SORTIE</div>
        </Card.Header>
        <div className="commande-vente">
          <Card.Body
            style={{ padding: 12, marginTop: 3, marginRight: 2, marginLeft: 2 }}
          >
            <div className="d-flex justify-content-end">
              <Link
                className="btn btn-primary mb-2 btn-sm"
                to={HISTORIQUEVENTEVENDEUR_ADMIN}
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
                <label>Date de sortie : {displayDate(dateCom)}</label>
                <div>
                  <input
                    type="date"
                    disabled={disabled}
                    onChange={(e) => setDateCom(e.target.value)}
                    value={dateCom}
                    className="form-control"
                  />
                </div>
              </div>
              {type === "credit" && (
                <>
                  <label>Crediteur:</label>
                  <select
                    disabled={disabled}
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
              {state?.length <= 0 && (
                <div className="alert alert-success ">
                  Aucune enregistrement trouvé
                </div>
              )}
              {state
                ?.sort(
                  (low, high) => high.quantityBruteCVA - low.quantityBruteCVA
                )
                .map((product, i) => (
                  <EditFromDepotItem
                    key={`${product?.id}_${i}`}
                    product={product}
                    realcommande={commandes[0]?.find((e) => e.id == product.id)}
                    state={state}
                    index={i}
                    products={products?.find((e) => e.id == product.id)}
                    setState={setState}
                    basket={fromdepots}
                    dispatch={dispatch}
                  />
                ))}
            </div>
          </Card.Body>

          {state?.length > 0 && (
            <Card.Footer className="d-flex align-items-center justify-content-between">
              <div style={{ width: "40%" }}>
                <h2 className="p-2 text-uppercase bg-primary">
                  <strong data-test-id="total-price-orders">
                    Total:
                    {displayMoney(
                      calculateTotal(
                        state?.map((product) => {
                          return isSpecialProductHandle(product)
                            ? product.prixqttccvente *
                                product.quantityParProduct *
                                product.qttccpvente +
                                product.prixlitre * product.qttbylitre
                            : product.prixVente * product.quantityParProduct;
                        })
                      ) +
                        calculateTotal(
                          state?.map((product) => {
                            return product.prixParCC * product.qttByCC;
                          })
                        )
                    )}
                  </strong>
                </h2>
              </div>
              <div style={{ width: "60%" }}>
                {state?.length > 0 && (
                  <div className="d-flex text-right align-items-end justify-content-end">
                    <button
                      className="btn btn-green btn-sm mr-2"
                      disabled={state?.length === 0}
                      onClick={onCheckOut}
                      type="button"
                    >
                      Valider l'operation
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => history.goBack()}
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

export default EditToFromMag;
