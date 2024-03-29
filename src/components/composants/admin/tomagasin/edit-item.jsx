import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
const EditProductItemToMag = ({ state, setState, product, cloneCommandes }) => {
  const dispatch = useDispatch();

  const itemOnBasket = !!state?.find((item) => item?.id === product.id);
  const clc = cloneCommandes?.contenu.find((p) => p.id == product.id);
  const canMinus = product?.quantityBruteCVA < clc?.quantityParProduct;
  const removeProduct = (id) => {
    setState(state.filter((t) => t.id !== id));
  };
  const handleAddToBasket = () => {
    setState(
      state.some((p) => p.id === product.id) ? state : [product, ...state]
    );
  };

  return (
    <>
      <ListGroup.Item
        className="mb-2 mr-3"
        style={{ border: "1px solid gray" }}
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
            {clc?.correctiontype == 4 && (
                <div className="badge badge-danger">
                  <h2 textTransform="uppercase">
                    CE PRODUIT A ETE RETIRÉ
                  </h2>
                </div>
              )}
              <div>
              {product.name}{" "}</div>
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
            <div>
              {product?.id && (
                <>
               
                  {!itemOnBasket ? (
                    <button

                      className={"btn btn-green btn-sm"}
                      onClick={handleAddToBasket}
                    >
                      Ajouter
                    </button>
                  ) : (
                    <button
                    disabled={canMinus}
                      className={"btn btn-danger btn-sm"}
                      onClick={() => removeProduct(product?.id)}
                    >
                      Retirer
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </ListGroup.Item>
    </>
  );
};

export default EditProductItemToMag;
