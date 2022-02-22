import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { displayMoney, checkHasExistText } from "../../../../utils/functions";
import EditFromDepotItemControl from "./EditToMagItemControl";
const EditItem = ({ state, index, setState, product }) => {
  const [realQttCC, setRealQttCC] = useState(null);
  const [realQtt, setRealQtt] = useState(null);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
        <div style={{ width: "45%" }}>
          <p className="text-blue">{product.name}</p>
          <span className="text-lowercase">
            <strong>
              {product.quantityParProduct != 0 &&
                displayMoney(product.prixVente)}
              {product.quantityParProduct == 0 &&
                product.prixParCC != 0 && (
                  <>
                    {product.prixqttccvente != null &&
                    product.prixqttccvente != 0
                      ? displayMoney(product.prixqttccvente)
                      : displayMoney(product.prixParCC)}
                  </>
                )}
              {product.quantityParProduct != 0 &&
                " x " +
                  product.quantityParProduct +
                  " " +
                  product.type}{" "}
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
       
      </div>
    </div>
  );
};

export default EditItem;
