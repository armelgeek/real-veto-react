import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { action, getData } from "../../../../utils/lib/call";
import { displayMoney, checkHasExistText } from "../../../../utils/functions";
import { useHistory } from "react-router-dom";
import {
  handleMinusProductDepot,
  handlePhtyoSpecificDepot,
  handleSoldQuantityCCDepot,
} from "../../../../store/functions/function-depot";
import { clearFromDepot } from "../../../../store/fromdepot/actions/fromdepot";
import EditFromDepotItem from "./EditItem";
import {HISTORIQUEVENTEVENDEUR } from '../../../../constants/routes';
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
const EditTo = ({ state, meta, setState, products, commandes }) => {
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
        quantityBruteCVA: element.quantityBruteCVA - element.quantityParProduct,
        quantityParProduct: 0,
      });
    });*/
    const added = state.filter(
      (e) => !copy(realContent).find((a) => e.id === a.id)
    );

    const exist = state.map((element) => {
      let commandeLast = copy(realContent).find((p) => p.id === element.id);

      if (commandeLast != null || commandeLast != undefined) {
        // if(element.quantityParProduct){}
        let qtt = 0;
        if (
          element.quantityParProduct * 1 >
          commandeLast.quantityParProduct * 1
        ) {
          qtt =
            element.quantityParProduct * 1 -
            commandeLast.quantityParProduct * 1;
          element.quantityBruteCVA = commandeLast.quantityBruteCVA + qtt;
        }
        if (
          commandeLast.quantityParProduct * 1 >
          element.quantityParProduct * 1
        ) {
          qtt =
            commandeLast.quantityParProduct * 1 -
            element.quantityParProduct * 1;
          element.quantityBruteCVA = commandeLast.quantityBruteCVA - qtt;
        }
        if (
          element.quantityParProduct * 1 ==
          commandeLast.quantityParProduct * 1
        ) {
          element.quantityBruteCVA = commandeLast.quantityBruteCVA;
        }
        return element;
      } else {
        return null;
      }
    });
    return {
      exist: exist.filter((e) => e != null),
      added,
      missing,
    };
  };

  const onCheckOut = () => {
    const { exist, added, missing } = getContenu();
    dispatch(
      action("commandes").update({
        id: commandes?.id,
        contenu: state,
        type: "vente-cva",
        sorte: "sortie",
        sorte: "sortie",
        status: true,
        dateCom: dateCom != null ? dateCom : date,
      })
    );

    copy(state).forEach((element) => {
      if (!isInArray(element, added)) {
        console.log("exist ----", element);
        const actualProduct = products.find((p) => p.id == element.id);
        const commandeLast = copy(realContent).find((p) => p.id == element.id);
        let qtt = 0;
        if (
          element.quantityParProduct * 1 >
          commandeLast?.quantityParProduct * 1
        ) {
          qtt =
            element.quantityParProduct * 1 -
            commandeLast?.quantityParProduct * 1;
          element.quantityBruteCVA = copy(actualProduct).quantityBruteCVA + qtt;
          console.log(
            "+ plus",
            element.quantityParProduct * 1 -
              commandeLast?.quantityParProduct * 1
          );
        }
        if (
          commandeLast?.quantityParProduct * 1 >
          element.quantityParProduct * 1
        ) {
          qtt =
            commandeLast?.quantityParProduct * 1 -
            element.quantityParProduct * 1;
          element.quantityBruteCVA = copy(actualProduct).quantityBruteCVA - qtt;
          console.log(
            "-moins",
            commandeLast?.quantityParProduct * 1 -
              element.quantityParProduct * 1
          );
        }
        if (
          element.quantityParProduct * 1 ==
          commandeLast?.quantityParProduct * 1
        ) {
          element.quantityBruteCVA = copy(actualProduct).quantityBruteCVA;
        }

        //  console.log(element.name, updateQtt(is, element, commandeLast, qtt));
        //console.log(element.name, element.quantityBruteCVA);
        dispatch(
          action("products").update({
            id: element.id,
            quantityBruteCVA: element.quantityBruteCVA,
            quantityParProduct: 0,
          })
        );
      } else {
        console.log("added---" + JSON.stringify(element));

        dispatch(
          action("products").update({
            id: element.id,
            quantityBruteCVA:
              element.quantityBruteCVA + element.quantityParProduct * 1,
            quantityParProduct: 0,
          })
        );
      }
    });
    if (missing.length > 0) {
      console.log("misssing", missing);
      missing.map((e) => {
        const actualp = products.find((p) => p.id == e.id);
        console.log(actualp);
        dispatch(
          action("products").update({
            id: e.id,
            quantityBruteCVA: actualp.quantityBruteCVA - e.quantityParProduct * 1,
            quantityParProduct: 0,
          })
        );
      });
    }
    history.push(HISTORIQUEVENTEVENDEUR);
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
        element.quantityParProduct = 0;
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
              {type === "credit" && (
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
                          return product.prixVente * product.quantityParProduct;
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
                      className="btn btn-green btn-sm mr-2"
                      disabled={state?.length === 0}
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

export default EditTo;
