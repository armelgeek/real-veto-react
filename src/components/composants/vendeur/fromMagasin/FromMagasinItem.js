import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FromMagasinItemControl from "./FromMagasinItemControl";
import FromMagasinItemPartial from "./FromMagasinItemPartial";
import { displayMoney, checkHasExistText } from "../../../../utils/functions";
import { ItaNewInputDose } from "./ItaNewInputDose";
import { PhytoConditionnementInput } from "./PhytoConditionnementInput";
import { SovaxInputDose } from "./SovaxInputDose";
import useFromMagasin from "../../../../hooks/useFromMagasin";
import FromMagasinItemLitre from "./FromMagasinItemLitre";
import { isSpecialProductHandle,blockItOnSold } from "./block-it";
const FromMagasinItem = ({ product }) => {
  const [realQttCC, setRealQttCC] = useState(product?.qttByCC);
  const [realQtt, setRealQtt] = useState(product?.quantityParProduct);
  const [realQttLitre, setRealQttLitre] = useState(0);
  const [maxRealQtt, setMaxRealQtt] = useState(2000);
  const [maxRealQttCC, setMaxRealQttCC] = useState(2000);
  const [maxRealQttByLitre, setMaxRealQttByLitre] = useState(2000);
  const frommagasins = useSelector((state) => state.frommagasins);
  const dispatch = useDispatch();
  const { isItemFromMagasin, addFromMagasin } = useFromMagasin(
    frommagasins,
    dispatch
  );
  useEffect(() => {
    /**  if (realQttCC > 2) {
      alert("attention c'est la merte");
      setMaxRealQtt(2);
      setMaxRealQttCC(10);
      setRealQttCC(10);
      setRealQtt(1);
      setRealQttLitre(1);
      setMaxRealQttByLitre(1);
    }
    console.log("qtt", realQtt);
    console.log("qttv", realQttCC);
    console.log("condval", realQttLitre); */

    const { normalQtt, normalQttCC,normalQttLitre,isSpecific, isValid } = blockItOnSold(
      realQtt,
      realQttCC,
      realQttLitre,
      product
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
    }
  }, [realQtt, realQttCC, realQttLitre]);
  const itemOnBasket = isItemFromMagasin
    ? isItemFromMagasin(product.id)
    : false;
  const handleAddToBasket = () => {
    if (addFromMagasin) addFromMagasin(product);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
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
        {product.condml !== 0 && product.qttccpvente !== 0 && (
          <div className="text-inline text-center mr-3">
            <h5 className="mb-1 text-uppercase">Boite</h5>
            <FromMagasinItemLitre
              product={product}
              setRealQttLitre={setRealQttLitre}
              realQttLitre={realQttLitre}
              maxRealQttByLitre={maxRealQttByLitre}
            />{" "}
          </div>
        )}
        <div className="text-inline text-center mr-2">
          <h5 className="mb-1">{product.type}</h5>

          <FromMagasinItemControl
            product={product}
            setRealQtt={setRealQtt}
            setMaxRealQtt={setMaxRealQtt}
            maxRealQtt={maxRealQtt}
            realQtt={realQtt}
          />
        </div>
        {product.type === "FLACON" && (
          <div className="text-inline text-center">
            <h5 className="mb-1">{product.categoryId == 3 ? "DOSE" : "ML"}</h5>
            {checkHasExistText(product.name, "ita new") && (
              <ItaNewInputDose
                product={product}
                setRealQttCC={setRealQttCC}
                realQttCC={realQttCC}
              />
            )}
            {checkHasExistText(product.name, "sovax") && (
              <SovaxInputDose
                setRealQttCC={setRealQttCC}
                realQttCC={realQttCC}
                product={product}
              />
            )}
            {product.condml == 0 &&
              product.qttccpvente == 0 &&
              !checkHasExistText(product.name, "sovax") &&
              !checkHasExistText(product.name, "ita new") && (
                <FromMagasinItemPartial
                  setRealQttCC={setRealQttCC}
                  realQttCC={realQttCC}
                  maxRealQttCC={maxRealQttCC}
                  product={product}
                />
              )}
            {product.condml !== 0 && product.qttccpvente !== 0 && (
              <PhytoConditionnementInput
                product={product}
                setRealQttCC={setRealQttCC}
                realQttCC={realQttCC}
                maxRealQttCC={maxRealQttCC}
              />
            )}
          </div>
        )}

        <div className="ml-2">
          {itemOnBasket && (
            <button
              onClick={handleAddToBasket}
              className="btn btn-danger btn-xs text-right"
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FromMagasinItem;
