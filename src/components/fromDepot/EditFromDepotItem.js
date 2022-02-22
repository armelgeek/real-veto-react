import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FromDepotItemControl from "./FromDepotItemControl";
import FromDepotItemPartial from "./FromDepotItemPartial";
import { displayMoney, checkHasExistText } from "../../utils/functions";
import { ItaNewInputDose } from "./ItaNewInputDose";
import { PhytoConditionnementInput } from "./PhytoConditionnementInput";
import { SovaxInputDose } from "./SovaxInputDose";
import EditFromDepotItemControl from "./EditFromDepotItemControl";
const EditFromDepotItem = ({ state, index, setState, product }) => {
  const [realQttCC, setRealQttCC] = useState(null);
  const [realQtt, setRealQtt] = useState(null);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
        <div style={{ width: "45%" }}>
          <p className="text-blue">{product.name}</p>
          <span className="text-lowercase">
            <strong>
              {product.quantityParProductDepot != 0 &&
                displayMoney(product.prixVente)}
              {product.quantityParProductDepot == 0 &&
                product.prixParCC != 0 && (
                  <>
                    {product.prixqttccventedepot != null &&
                    product.prixqttccventedepot != 0
                      ? displayMoney(product.prixqttccventedepot)
                      : displayMoney(product.prixParCC)}
                  </>
                )}
              {product.quantityParProductDepot != 0 &&
                " x " +
                  product.quantityParProductDepot +
                  " " +
                  product.type}{" "}
              {product.prixqttccventedepot == null &&
                product.prixqttccventedepot == 0 && (
                  <>
                    {product.qttByCCDepot != 0 &&
                      (product.quantityParProductDepot == 0 ? " x " : "+") +
                        product.qttByCCDepot +
                        "ML"}
                  </>
                )}
            </strong>
          </span>
        </div>
        <div className="text-inline text-center">
          <h5 className="mb-1">{product.type}</h5>
          <EditFromDepotItemControl
            index={index}
            state={state}
            setState={setState}
            product={product}
            setRealQttCC={setRealQttCC}
            setRealQtt={setRealQtt}
            realQtt={realQtt}
            realQttCC={realQttCC}
          />
        </div>
       {/** {product.type === "FLACON" && (
          <div className="text-inline text-center">
            <h5 className="mb-1">{product.categoryId == 3 ? "DOSE" : "ML"}</h5>
            {checkHasExistText(product.name, "ita new") && (
              <ItaNewInputDose
                product={product}
                setRealQttCC={setRealQttCC}
                setRealQtt={setRealQtt}
                realQtt={realQtt}
                realQttCC={realQttCC}
              />
            )}
            {checkHasExistText(product.name, "sovax") && (
              <SovaxInputDose
                setRealQttCC={setRealQttCC}
                setRealQtt={setRealQtt}
                realQtt={realQtt}
                realQttCC={realQttCC}
                product={product}
              />
            )}
            {product.condmldepot == 0 &&
              product.qttccpventedepot == 0 &&
              !checkHasExistText(product.name, "sovax") &&
              !checkHasExistText(product.name, "ita new") && (
                <FromDepotItemPartial
                  setRealQttCC={setRealQttCC}
                  setRealQtt={setRealQtt}
                  realQtt={realQtt}
                  realQttCC={realQttCC}
                  product={product}
                />
              )}
            {product.condmldepot !== 0 && product.qttccpventedepot !== 0 && (
              <PhytoConditionnementInput product={product} />
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EditFromDepotItem;
