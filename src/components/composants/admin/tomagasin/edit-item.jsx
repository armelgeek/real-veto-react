import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
const EditProductItemToMag = ({ state, setState, product }) => {

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
              {product.name}{" "}
              <div class="badge badge-primary">
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
                      disabled={
                        product.quantityBrute === 0 &&
                        (product.quantityCC == 0 || product.quantityCC == null)
                      }
                      className={"btn btn-green btn-sm"}
                      onClick={handleAddToBasket}
                    >
                      Ajouter
                    </button>
                  ) : (
                    <button
                      disabled={
                        product.quantityBrute === 0 &&
                        (product.quantityCC == 0 || product.quantityCC == null)
                      }
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
