import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useFromMagasin from "../../../../hooks/useFromMagasin";
import { displayMoney } from "../../../../utils/functions";
import { isSpecialProductHandle } from "../../../../store/functions/function";
import { isBlocked } from "./block-it";
const ProductItem = ({ product }) => {
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
  const isEmptyBrute = React.useCallback(() => {
    if (product.quantityBruteCVA > 15 && product.quantityBruteCVA <= 20) {
      return "yellow";
    }
    if (product.quantityBruteCVA > 10 && product.quantityBruteCVA <= 15) {
      return "#ffdb4c";
    }
    if (product.quantityBruteCVA > 5 && product.quantityBruteCVA <= 10) {
      return " orange";
    }
    if (product.quantityBruteCVA > 0 && product.quantityBruteCVA <= 5) {
      return "#c44e14b8";
    }
    if (product.quantityBruteCVA == 0) {
      return "red";
    } else {
      return "green";
    }
  }, [product]);
  const isEmptyCC = React.useCallback(() => {
    if (product.quantityCCCVA > 15 && product.quantityCCCVA <= 20) {
      return "yellow";
    }
    if (product.quantityCCCVA > 10 && product.quantityCCCVA <= 15) {
      return "#ffdb4c";
    }
    if (product.quantityCCCVA > 5 && product.quantityCCCVA <= 10) {
      return " orange";
    }
    if (product.quantityCCCVA > 0 && product.quantityCCCVA <= 5) {
      return "#c44e14b8";
    }
    if (product.quantityCCCVA == 0) {
      return "red";
    } else {
      return "green";
    }

    const isEmptyCondVal = React.useCallback(() => {
      if (product.condval == 0) {
        return "red";
      } else {
        return "green";
      }
    }, [product]);
  }, [product]);
  const disable = React.useCallback(() => {
    if (isSpecialProductHandle(product)) {
      if (
        product.quantityBruteCVA == 0 &&
        (product.quantityCCCVA == 0 || product.quantityCCCVA == null) &&
        product.condval == 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      if (
        product.quantityBruteCVA == 0 &&
        (product.quantityCCCVA == 0 || product.quantityCCCVA == null)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }, [product]);
  return (
    <>
      <ListGroup.Item
        className="mb-2"
        style={{
          width: "100%",
          border: "1px solid gray",
          padding: "10px",
          background: "whitesmoke",
          borderLeft: `10px solid ${isEmptyBrute()}`,
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div
            className={` ${!product.id ? "product-loading" : ""}`}
            style={{
              boxShadow:
                product && itemOnBasket
                  ? "15px 10px 15px rgba(0, 0, 0, .07)"
                  : "none",
            }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column mr-2 align-items-center w-20">
                <div className="badge badge-success mb-1" style={{
                  borderRadius:"100%"
                }}>{product.quantityBruteCVA}</div>
                <div className="badge badge-warning mb-1" style={{
                borderRadius:"100%"
                }}>{product.condval}</div>
                <div className="badge badge-info mb-1" style={{
                  borderRadius:"100%"
                }}>{product.quantityCC}</div>
              </div>
              <div>
                <div>
                  <div>{product.name}</div>
                  <div className="badge badge-primary">
                    {product?.fournisseur?.name}
                  </div>
                </div>
              </div>
            </div>
            {/**    <strong>
              {product.type}:{product.quantityBruteCVA}

             
            </strong>
            <br />
            {product.type == "FLACON" && (
              <>
                <strong>ML: {product.quantityCCCVA} ml</strong>
                <br />
                
              </>           disabled={ 
              product.quantityBruteCVA === 0 && (product.quantityCCCVA == 0 || product.quantityCCCVA == null) && product.condval==0
            }
            )}
            <strong>CondML: {product.condml}- Condval:{product.condval}</strong> */}
          </div>
          <div>
            {product.id && (
              <>
                <button
                  disabled={isBlocked(product)}
                  className={`mt-3 ${
                    itemOnBasket
                      ? "btn btn-danger btn-sm"
                      : "btn btn-green btn-sm"
                  }`}
                  onClick={handleAddToBasket}
                >
                  {!itemOnBasket ? "Ajouter" : "Retirer"}
                </button>
              </>
            )}
          </div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default React.memo(ProductItem);
