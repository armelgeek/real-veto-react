import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  displayMoney,
  checkHasExistText,
  displayDate,
} from "../../../../utils/functions";
import EditFromDepotItemControl from "./EditFromMagasinItemControl";
import { ItaNewInputDose } from "./ItaNewInputDose";
import { PhytoConditionnementInput } from "./PhytoConditionnementInput";
import { SovaxInputDose } from "./SovaxInputDose";
import EditFromMagasinItemPartial from "./EditFromMagasinItemPartial";
import EditFromMagasinItemLitre from "./EditFromMagasinItemLitre";
import { EditPhytoConditionnementInput } from "./EditPhytoConditionnementInput";
import { blockItOnEdit } from "./block-it";
import { action, getData } from "../../../../utils/lib/call";
const getCorrection = (product) => {
  if (product.correctiontype == 1) {
    return {
      text:
        "plus (+" + product.correction + ") et (" + product.correctionml + ")",
      textStyle: "text text-info",
      date: displayDate(product.datedecorrection),
      style: "badge badge-info",
    };
  } else if (product.correctiontype == 2) {
    return {
      text:
        "moins (-" +
        product.correction +
        ")  et (" +
        product.correctionml +
        ")",
      textStyle: "text text-warning",
      date: displayDate(product.datedecorrection),
      style: "badge badge-warning",
    };
  } else if (product.correctiontype == 3) {
    return {
      text:
        "ajouter au commande ( + " +
        product.correction +
        ")  et (" +
        product.correctionml +
        ")",
      textStyle: "text text-success",
      date: displayDate(product.datedecorrection),
      style: "badge badge-success",
    };
  } else if (product.correctiontype == 4) {
    return {
      text:
        "supprimer du commande ( - " +
        product.correction +
        ")  et (" +
        product.correctionml +
        ")",
      textStyle: "text text-danger",
      date: displayDate(product.datedecorrection),
      style: "badge badge-danger",
    };
  }
};
const EditItem = ({ state, index, setState, product, realcommande }) => {
  const dispatch = useDispatch();
  const [realQttCC, setRealQttCC] = useState(product?.qttByCC);
  const [realQtt, setRealQtt] = useState(product?.quantityParProduct);
  const [realQttLitre, setRealQttLitre] = useState((typeof product?.qttbylitre!="number" || typeof product?.qttbylitre!="string") ?  0 : product?.qttbylitre );
  const [maxRealQtt, setMaxRealQtt] = useState(2000);
  const [maxRealQttCC, setMaxRealQttCC] = useState(2000);
  const [maxRealQttByLitre, setMaxRealQttByLitre] = useState(2000);
  const realproduct = useSelector(getData("products").value);

  React.useEffect(() => {
    dispatch(action("products").get(product?.id));
  }, []);
  React.useEffect(() => {
    const { normalQtt, normalQttCC, normalQttLitre, isSpecific, isValid } =
      blockItOnEdit(
        realQtt,
        realQttCC,
        realQttLitre,
        realproduct,
        realcommande
      );
    if (!isValid) {
      alert("stock insuffisant :(");
      if (!isSpecific) {
        setRealQtt(normalQtt);
        setMaxRealQtt(normalQtt);
        setRealQttCC(normalQttCC);
        setMaxRealQttCC(normalQttCC);
      }else{
        setRealQttLitre(normalQttLitre);
        setMaxRealQttByLitre(normalQttLitre);
        setRealQtt(normalQtt);
        setMaxRealQtt(normalQtt);
        setRealQttCC(normalQttCC);
        setMaxRealQttCC(normalQttCC);
      }
    }else{
      /// n'oublie pas ici
    }
    console.log(isValid);
  }, [realQtt, realQttCC, realQttLitre]);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border mt-3  mb-2 p-2">
        <div style={{ width: "45%" }}>
          {product.correction > 0 && (
            <div>
              <div className={getCorrection(product).style}>
                <p>{getCorrection(product).text}</p>
              </div>
              <p className={getCorrection(product).textStyle}>
                Date de modification:{getCorrection(product).date}
              </p>
            </div>
          )}
          <p className="text-blue">{product.name}</p>
          <span className="text-lowercase">
            <strong>
              {product.quantityParProduct != 0 &&
                displayMoney(product.prixVente)}
              {product.quantityParProduct == 0 && product.prixParCC != 0 && (
                <>
                  {product.prixqttccvente != null && product.prixqttccvente != 0
                    ? displayMoney(product.prixqttccvente)
                    : displayMoney(product.prixParCC)}
                </>
              )}
              {product.quantityParProduct != 0 &&
                " x " + product.quantityParProduct + " " + product.type}{" "}
              {product.prixqttccvente == null &&
                product.prixqttccvente == 0 && (
                  <>
                    {product.qttByCC != 0 &&
                      (product.quantityParProduct == 0 ? " x " : "+") +
                        product.qttByCC +
                        "ML"}
                  </>
                )}
            </strong>
          </span>
        </div>
        {product.condml !== 0 && product.qttccpvente !== 0 && (
          <div className="text-inline text-center mr-3">
            <h5 className="mb-1 text-uppercase">Boite</h5>
            <EditFromMagasinItemLitre
              product={product}
              setState={setState}
              state={state}
              index={index}
              realQttLitre={realQttLitre}
              setRealQttLitre={setRealQttLitre}
              maxRealQttByLitre={maxRealQttByLitre}
            />{" "}
          </div>
        )}
        <div className="d-flex  justify-content-between align-items-center ">
          <div className="text-center mr-2">
            <h5 className="mb-1">{product.type}</h5>
            <EditFromDepotItemControl
              index={index}
              state={state}
              setState={setState}
              product={product}
              setRealQtt={setRealQtt}
              realQtt={realQtt}
              maxRealQtt={maxRealQtt}
            />
          </div>
          {product.type === "FLACON" && (
            <div className="text-inline text-center">
              <h5 className="mb-1">
                {product.categoryId == 3 ? "DOSE" : "ML"}
              </h5>
              {checkHasExistText(product.name, "ita new") && (
                <ItaNewInputDose
                  product={product}
                  index={index}
                  state={state}
                  setState={setState}
                  setRealQttCC={setRealQttCC}
                  realQttCC={realQttCC}
                  maxRealQttCC={maxRealQttCC}
                />
              )}
              {checkHasExistText(product.name, "sovax") && (
                <SovaxInputDose
                  index={index}
                  state={state}
                  setState={setState}
                  realQttCC={realQttCC}
                  setRealQttCC={setRealQttCC}
                  product={product}
                  maxRealQttCC={maxRealQttCC}
                />
              )}
              {product.condml == 0 &&
                product.qttccpvente == 0 &&
                !checkHasExistText(product.name, "sovax") &&
                !checkHasExistText(product.name, "ita new") && (
                  <EditFromMagasinItemPartial
                    index={index}
                    realQttCC={realQttCC}
                    setRealQttCC={setRealQttCC}
                    state={state}
                    setState={setState}
                    product={product}
                    maxRealQttCC={maxRealQttCC}
                  />
                )}
              {product.condml !== 0 && product.qttccpvente !== 0 && (
                <EditPhytoConditionnementInput
                  product={product}
                  state={state}
                  realQttCC={realQttCC}
                  setRealQttCC={setRealQttCC}
                  maxRealQttCC={maxRealQttCC}
                  setState={setState}
                  index={index}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditItem;
