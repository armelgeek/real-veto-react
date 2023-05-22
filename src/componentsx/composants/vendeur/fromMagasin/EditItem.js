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
import { blockItOnEdit, blockItis } from "./block-it";
import { action, getData } from "../../../../utils/lib/call";
import { isSpecialProductHandle } from './buy-it';
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
const EditItem = ({ state, index, setState, product }) => {
  const [realQttCC, setRealQttCC] = useState(!isSpecialProductHandle(product) ? product?.prixParCC: product?.prixqttccvente);
  const [realQtt, setRealQtt] = useState(product?.prixVente);
  const [realQttLitre, setRealQttLitre] = useState(product?.prixVente);
  const [maxRealQtt, setMaxRealQtt] = useState(2000);
  const [maxRealQttCC, setMaxRealQttCC] = useState(2000);
  const [maxRealQttByLitre, setMaxRealQttByLitre] = useState(2000);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border mt-3  mb-2 p-2">
        <div style={{ width: "45%" }}>
          
          <p className="text-blue">{product.name}</p>
        </div>
        {product.condml !== 0 && product.qttccpvente !== 0 && (
          <div className="text-inline text-center mr-3">
            <h5 className="mb-1 text-uppercase">Litre</h5>
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
