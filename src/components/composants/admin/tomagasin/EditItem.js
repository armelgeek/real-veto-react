import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { displayMoney, checkHasExistText } from "../../../../utils/functions";
import EditToMagItemControl from "./EditToMagItemControl";
const EditItem = ({ state, index, setState, cloneCommandes,product, realstock,realcommand }) => {
  const [realQttCC, setRealQttCC] = useState(null);
  const [realQtt, setRealQtt] = useState(null);
  const stock = realstock.find((r) => r.id == product.id);
  const clc = cloneCommandes?.contenu.find(p => p.id == product.id);
  return (
    <div
      className=" mb-2 p-2"
      style={{
        opacity: stock?.quantityBruteCVA < clc?.quantityParProduct ? 0.8 : 1,
        border: stock?.quantityBruteCVA < clc?.quantityParProduct ? "1px solid red" : '1px solid gray'
      }}
    >

      {stock?.quantityBruteCVA < clc?.quantityParProduct && (
        <div className="text-danger text-sm">
          ** Des operations ont ête déja faite apres la sortie vers magasin et vous ne pourrez pas retourner tous les produits au depôt**
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center">
        <div style={{ width: "45%" }}>
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
        <div className="text-inline text-center">
          <h5 className="mb-1">{product.type}</h5>
          <EditToMagItemControl
            index={index}
            state={state}
            setState={setState}
            product={product}
            realcommand={clc}
            setRealQttCC={setRealQttCC}
            setRealQtt={setRealQtt}
            realQtt={realQtt}
            stock={stock}
            realQttCC={realQttCC}
          />
        </div>
      </div>
    </div>
  );
};

export default EditItem;
