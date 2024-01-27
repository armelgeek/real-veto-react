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
import { SORTIE } from "../../constants/routes";
import EditFromDepotItem from "./EditFromDepotItem";
import { isSpecialProductHandle } from '../composants/vendeur/fromMagasin/block-it';
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
const EditFromDepot = ({
  state,
  meta,
  setState,
  products,
  commandes,
  disabled,
}) => {
  const [type, setType] = useState("vente-depot");
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
  const vaccinateurs = useSelector(getData("vaccinateurs").value);
  //const meta = useSelector(getData("commandes").meta);
  //const commandes = useSelector(getData("commandes").value);
  const date = new Date();
  const [dateCom, setDateCom] = useState(date);
  useEffect(() => {
    //  dispatch(action("commandes").fetch());
    dispatch(action("emprunters").fetch());
  }, []);
  function inArray(value, values) {
    for (var i = 0; i < values.length; i++) {
      if (value === values[i]) return true;
    }
    return false;
  }

  function isInArray(value, array) {
    return array.find((a) => value.id === a.id);
  }
  const getContenu = () => {
    // console.log(missing);
    const missing = copy(realContent).filter(
      (e) => !state.find((a) => e.id === a.id)
    );
    /* missing.forEach((element) => {

      action("products").update({
        id: element.id,
        quantityBrute: element.quantityBrute - element.quantityParProduct,
        quantityParProduct: 0,
      });
    });*/
    const added = copy(realContent).filter(
      (e) => !state.find((a) => e.id === a.id)
    );

    const exist = copy(realContent).map((element) => state.find((p) => p.id == element.id));

     /* if (commandeLast != null || commandeLast != undefined) {
        // if(element.quantityParProduct){}
        let qtt = 0;
        if (
          element.quantityParProductDepot * 1 >
          commandeLast.quantityParProductDepot * 1
        ) {
          qtt =
            element.quantityParProductDepot * 1 -
            commandeLast.quantityParProductDepot * 1;
          element.quantityBrute = commandeLast.quantityBrute - qtt;
        }
        if (
          commandeLast.quantityParProductDepot * 1 >
          element.quantityParProductDepot * 1
        ) {
          qtt =
            commandeLast.quantityParProductDepot * 1 -
            element.quantityParProductDepot * 1;
          element.quantityBrute = commandeLast.quantityBrute + qtt;
        }
        if (
          element.quantityParProductDepot * 1 ==
          commandeLast.quantityParProductDepot * 1
        ) {
          element.quantityBrute = commandeLast.quantityBrute;
        }
        return element;
      } else {
        return null;
      }*/
    return {
      exist: exist.filter((e) => e != null),
      added,
      missing,
    };
  };

  const onCheckOut = () => {
    const { exist, added, missing } = getContenu();
    dispatch(
      action("commandes").updateTransaction(
        {
          id: commandes?.id,
          contenu: state,
          type: "vente-depot",
          sorte: "sortie",
          vaccinateurId: vaccinateurId,
          status: type === "direct" ? true : false,
          emprunterId: emprunter,
          dateCom: dateCom != null ? dateCom : date,
          exist: exist,
          added: added,
          missing: missing,
        },
        "update-from-depot"
      )
    );

    history.push(SORTIE);
  };

  /* const onCheckOut = () => {
    const { exist, added, missing } = getContenu();
    console.log("state", state.length);
    console.log("realcont", realContent.length);
    console.log("exist", JSON.stringify(exist));
    console.log("added", JSON.stringify(added));
    console.log("missing", JSON.stringify(missing));
     fromdepots.forEach((element) => {
      delete element.busy;
      delete element.pendingCreate;
      handleMinusProductDepot(element);
      if (element.condmldepot != 0 && element.qttccpventedepot != 0) {
        handlePhtyoSpecificDepot(element);
      } else {
        handleSoldQuantityCCDepot(element);
      }
      console.log(element);
    });*/
  //console.log(fromdepots);
  /*  dispatch(
      action("commandes").create({
        id: Math.floor(Date.now() / 1000),
        contenu: state?.state,
        type: "vente-depot",
        sorte: "sortie",
        qtteBrute: 1,
        qtteCC: 1,
        vaccinateurId: vaccinateurId,
        status: type === "direct" ? true : false,
        emprunterId: emprunter,
        dateCom: dateCom != null ? dateCom : date,
      })
    );*/
  /*if (!meta.error) {
      state?.state?.forEach((element) => {
        let idElement = element.id;
        element.quantityParProductDepot = 0;
        element.qttByCCDepot = 0;
        element.qttyspecificmirrordepot = 0;
        element.id = idElement;
        dispatch(action("products").update(element));
      });
    }
    //dispatch(clearFromDepot());
    //   history.push(SORTIE);
  };*/

  const onClearBasket = () => {
    state?.forEach((element) => {
      element.quantityParProductDepot = 0;
      element.qttByCCDepot = 0;
    });

    dispatch(clearFromDepot());
  };
  return (
    <>
      <Card>
        <Card.Header className=" bg-dark py-2 text-white d-flex justify-content-between align-items-center">
          <div style={{ width: "60%" }}>BON DE SORTIE</div>
          <div style={{ width: "30%" }} className="text-right">
            <select
              disabled={disabled}
              className="form-control input-sm"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="vente-depot">Comptant</option>
              <option value="vente-depot-credit">Credit</option>
              <option value="vente-depot-vaccinateur">Vaccinateur</option>
            </select>
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
              <div className="form-group">
                <label>Date de sortie :</label>
                <div>
                  <input
                    disabled={disabled}
                    type="date"
                    onChange={(e) => setDateCom(e.target.value)}
                    value={dateCom}
                    className="form-control"
                  />
                </div>
              </div>
              {type === "vente-depot-credit" && (
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
              {type === "vente-depot-vaccinateur" && (
                <>
                  <label>Vaccinateur:</label>
                  <select
                    className="form-control"
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
              {state?.length <= 0 && (
                <div className="alert alert-success ">
                  Aucune enregistrement trouvé
                </div>
              )}
              {state?.map((product, i) => (
                <EditFromDepotItem
                  key={`${product?.id}_${i}`}
                  product={product}
                  state={state}
                  index={i}
                  setState={setState}
                  basket={fromdepots}
                  dispatch={dispatch}
                />
              ))}
            </div>
          </Card.Body>

          {state?.length > 0 && (
            <Card.Footer className="d-flex align-items-center justify-content-between">
              <div style={{ width: "30%" }}>
                <h2 className="p-2 text-uppercase bg-primary">
                  <strong data-test-id="total-price-orders">
                    Total:
                    {displayMoney(
                      calculateTotal(
                        state?.map((product) => {
                          return (
                            isSpecialProductHandle(product) ? product.prixlitre * product.quantityParProductDepot : product.prixVente * product.quantityParProductDepot
                          );
                        })
                      ) +
                        calculateTotal(
                          state?.state?.map((product) => {
                            return product.prixParCC * product.qttByCCDepot;
                          })
                        )
                    )}
                  </strong>
                </h2>
              </div>
              <div style={{ width: "70%" }}>
                {state?.length > 0 && (
                  <div className="d-flex text-right align-items-end justify-content-end">
                    <button
                      disabled={disabled}
                      className="btn btn-green btn-sm mr-2"
                      disabled={state?.length === 0}
                      onClick={onCheckOut}
                      type="button"
                    >
                      Valider l'operation
                    </button>
                    <button
                      disabled={disabled}
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

export default EditFromDepot;
