import React, { useState } from "react";
import {
  checkHasExistText
} from "../../../../utils/functions";
import EditFromDepotItemControl from "./EditFromMagasinItemControl";
import { ItaNewInputDose } from "./ItaNewInputDose";
import { SovaxInputDose } from "./SovaxInputDose";
import EditFromMagasinItemPartial from "./EditFromMagasinItemPartial";
import EditFromMagasinItemLitre from "./EditFromMagasinItemLitre";
import { EditPhytoConditionnementInput } from "./EditPhytoConditionnementInput";
import { isSpecialProductHandle } from './buy-it';

const EditItem = ({ state, index, id,update, setState, product }) => {
  const [realQttCC, setRealQttCC] = useState(!isSpecialProductHandle(product) ? product?.prixParCC : product?.prixqttccvente);
  const [realQtt, setRealQtt] = useState(product?.prixVente);
  const [realQttLitre, setRealQttLitre] = useState(product?.prixVente);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center border mt-3  mb-2 p-2">
        <div style={{ width: "45%" }}>
          <p className="text-blue">{product.name}</p>
        </div>
        {product.condml !== 0 && product.qttccpvente !== 0 && (
          <div className="text-inline text-center mr-3">
            <h5 className="mb-1 text-uppercase">Litre</h5>
            <EditFromMagasinItemLitre
              product={product}
              update={update}
              setState={setState}
              state={state}
              index={index}
              realQttLitre={realQttLitre}
              setRealQttLitre={setRealQttLitre}
            />{" "}
          </div>
        )}
        <div className="d-flex  justify-content-between align-items-center ">
          <div className="text-center mr-2">
            <h5 className="mb-1">{product.type}</h5>
            <EditFromDepotItemControl
              index={index}
              update={update}
              state={state}
              setState={setState}
              product={product}
              setRealQtt={setRealQtt}
              realQtt={realQtt}
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
                  update={update}
                  index={index}
                  state={state}
                  setState={setState}
                  setRealQttCC={setRealQttCC}
                  realQttCC={realQttCC}
                />
              )}
              {checkHasExistText(product.name, "sovax") && (
                <SovaxInputDose
                  index={index}
                  update={update}
                  state={state}
                  setState={setState}
                  realQttCC={realQttCC}
                  setRealQttCC={setRealQttCC}
                  product={product}
                />
              )}
              {product.condml == 0 &&
                product.qttccpvente == 0 &&
                !checkHasExistText(product.name, "sovax") &&
                !checkHasExistText(product.name, "ita new") && (
                  <EditFromMagasinItemPartial
                    index={index}
                    update={update}
                    realQttCC={realQttCC}
                    setRealQttCC={setRealQttCC}
                    state={state}
                    setState={setState}
                    product={product}
                  />
                )}
              {product.condml !== 0 && product.qttccpvente !== 0 && (
                <EditPhytoConditionnementInput
                  product={product}
                  update={update}
                  state={state}
                  update={update}
                  realQttCC={realQttCC}
                  setRealQttCC={setRealQttCC}
                  setState={setState}
                  index={index}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditItem;
