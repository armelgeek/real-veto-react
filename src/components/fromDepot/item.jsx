import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useFromDepot from "../../hooks/useFromDepot";
import { displayMoney } from "../../utils/functions";
const ProductItem = ({ product }) => {
  const fromdepots = useSelector((state) => state.fromdepots);
  const dispatch = useDispatch();
  const { isItemFromDepot, addFromDepot } = useFromDepot(fromdepots, dispatch);

  const itemOnBasket = isItemFromDepot ? isItemFromDepot(product.id) : false;
  /* useEffect(()=>{
    if(!itemOnBasket){
      product.qttByCC =0;
      product.quantityParProduct=0;
    }
  },[itemOnBasket])*/
  const handleAddToBasket = () => {
    if (addFromDepot) addFromDepot(product);
  };

  return (
    <>
      <ListGroup.Item
        className="mb-2 mr-3"
        style={{ width: "100%", border: "1px solid gray" }}
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
            </div>

            <div>
              {product.id && (
                <>
                  <button
                    disabled={
                      product.quantityBrute === 0}
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
        </div>
      </ListGroup.Item>
    </>
  );
};

export default ProductItem;
