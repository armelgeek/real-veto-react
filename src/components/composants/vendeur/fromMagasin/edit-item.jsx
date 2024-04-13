import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { blockItOnMinus } from "./block-it";
const EditProductItemToMag = ({
  state,
  setState,
  id,
  product,
}) => {
  const dispatch = useDispatch();

  const itemOnBasket = !!state?.find((item) => item?.id === product.id);
  const removeProduct = (id) => {
    setState(state.filter((t) => t.id !== id));
  };
  const handleAddToBasket = () => {
    setState(
      state.some((p) => p.id === product.id) ? state : [product, ...state]
    );
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
  }, [product]);
  return (
    <>
      <ListGroup.Item
        className="mb-2 mr-3"
        style={{
          width: "100%",
          border: "1px solid gray",
          background: "whitesmoke",
          borderLeft: `10px solid ${isEmptyBrute()}`,
        }}
      >
        <div className=" d-flex justify-content-between align-items-center">
          <div
            className={` ${!product.id ? "product-loading" : ""}`}
            style={{
              boxShadow:
                product && itemOnBasket
                  ? "15px 10px 15px rgba(0, 0, 0, .07)"
                  : "none",
            }}
          >
            <div>
              <div
                style={{
                  width: 10,
                  height: 4,
                  background: `${isEmptyCC()}`,
                }}
              ></div>
              <div>{product.name} </div>
              <div className="badge badge-primary">
                {product?.fournisseur?.name}
              </div>
              <br />
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
            </div>{" "}
          </div>
          <div>
            {product?.id && (
              <>
                {!itemOnBasket ? (
                  <button
                    disabled={
                      product.quantityBruteCVA === 0 &&
                      (product.quantityCCCVA == 0 ||
                        product.quantityCCCVA == null)
                    }
                    className={"btn btn-green btn-sm"}
                    onClick={handleAddToBasket}
                  >
                    Ajouter
                  </button>
                ) : (
                  <button
                    disabled={
                      product.quantityBruteCVA === 0 &&
                      (product.quantityCCCVA == 0 ||
                        product.quantityCCCVA == null)
                    }
                    className={"btn btn-danger btn-sm"}
                    onClick={() => {
                        removeProduct(product?.id);
                    }}
                  >
                    Retirer
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default EditProductItemToMag;
