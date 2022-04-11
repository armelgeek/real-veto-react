import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FromMagasinItemControl from "./FromMagasinItemControl";
import FromMagasinItemPartial from "./FromMagasinItemPartial";
import { displayMoney, checkHasExistText } from "../../../../utils/functions";
import { ItaNewInputDose } from "./ItaNewInputDose";
import { PhytoConditionnementInput } from "./PhytoConditionnementInput";
import { SovaxInputDose } from "./SovaxInputDose";
import useFromMagasin from "../../../../hooks/useFromMagasin";
import FromMagasinItemLitre from "./FromMagasinItemLitre";
const FromMagasinItem = ({ product }) => {
  const [realQttCC, setRealQttCC] = useState(null);
  const [realQtt, setRealQtt] = useState(null);
  const frommagasins = useSelector((state) => state.frommagasins);
  const dispatch = useDispatch();
  const { isItemFromMagasin, addFromMagasin } = useFromMagasin(
    frommagasins,
    dispatch
  );

  const itemOnBasket = isItemFromMagasin
    ? isItemFromMagasin(product.id)
    : false;
  /* useEffect(()=>{
    if(!itemOnBasket){
      product.qttByCC =0;
      product.quantityParProduct=0;
    }
  },[itemOnBasket])*/
  const handleAddToBasket = () => {
    if (addFromMagasin) addFromMagasin(product);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
        <div style={{ width: "45%" }}>
          <p className="text-blue">{product.name}</p>
          <div class="badge badge-primary">
            {product?.fournisseur?.name}
          </div>
        </div>
        {product.condml !== 0 && product.qttccpvente !== 0 && (
        <div className="text-inline text-center mr-3">
        <h5 className="mb-1 text-uppercase">Boite</h5>
        <FromMagasinItemLitre
          product={product}
          setRealQttCC={setRealQttCC}
          setRealQtt={setRealQtt}
          realQtt={realQtt}
          realQttCC={realQttCC}
        /> </div>)}
        <div className="text-inline text-center mr-2">
          <h5 className="mb-1">{product.type}</h5>

          <FromMagasinItemControl
            product={product}
            setRealQttCC={setRealQttCC}
            setRealQtt={setRealQtt}
            realQtt={realQtt}
            realQttCC={realQttCC}
          />
        </div>
        {product.type === "FLACON" && (
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
            {product.condml == 0 &&
              product.qttccpvente == 0 &&
              !checkHasExistText(product.name, "sovax") &&
              !checkHasExistText(product.name, "ita new") && (
                <FromMagasinItemPartial
                  setRealQttCC={setRealQttCC}
                  setRealQtt={setRealQtt}
                  realQtt={realQtt}
                  realQttCC={realQttCC}
                  product={product}
                />
              )}
            {product.condml !== 0 && product.qttccpvente !== 0 && (
              <PhytoConditionnementInput product={product} />
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
