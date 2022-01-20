import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useFromMagasin from "../../../../hooks/useFromMagasin";
import { displayMoney } from "../../../../utils/functions";
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

  return (
    <>
      <ListGroup.Item
        className="mb-2 mr-3"
        style={{ width: "250px", border: "1px solid gray" }}
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
            <div class="badge badge-primary">{product?.fournisseur?.name}</div>
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
            {" "}
         </div>
         <div>
  
         {product.id && (
            <>
            {product.id==14 || product.id == 15 ? (
              <button
                disabled={ 
                  product.quantityBruteCVA === 0 || (product.quantityCCCVA == 0 || product.quantityCCCVA == null)
                }
              className={`mt-3 ${
                itemOnBasket
                  ? "btn btn-danger btn-sm"
                  : "btn btn-green btn-sm"
              }`}
              onClick={handleAddToBasket}
            >
              {!itemOnBasket ? "Ajouter" : "Retirer"}
            </button>
            ):(
              <button
                  disabled={ 
                    product.quantityBruteCVA === 0 &&
                    (product.quantityCCCVA == 0 || product.quantityCCCVA == null)
                  }
                className={`mt-3 ${
                  itemOnBasket
                    ? "btn btn-danger btn-sm"
                    : "btn btn-green btn-sm"
                }`}
                onClick={handleAddToBasket}
              >
                {!itemOnBasket ? "Ajouter" : "Retirer"}
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

export default ProductItem;
