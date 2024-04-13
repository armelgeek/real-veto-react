import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useDepotToMagasin from "../../../../hooks/useDepotToMagasin";
const ProductItem = ({ product }) => {
  const tomagasin = useSelector((state) => state.tomagasins);
  const dispatch = useDispatch();
  const { isItemOnDepotToMagasin, addToMagasin } = useDepotToMagasin(
    tomagasin,
    dispatch
  );
  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      //  history.push(`/product/${product.id}`)
    }
  };

  const itemOnBasket = isItemOnDepotToMagasin
    ? isItemOnDepotToMagasin(product.id)
    : false;

  const handleAddToBasket = () => {
    if (addToMagasin) addToMagasin(product);
  };

  return (
    <>
      <ListGroup.Item>
        <Row
          className={`product-card m-2 ${!product.id ? "product-loading" : ""}`}
          style={{
            border: product && itemOnBasket ? "1px solid #a6a5a5" : "",
            paddingTop:product && itemOnBasket ? "5px":"0px",
            boxShadow:
              product && itemOnBasket
                ? "0 10px 15px rgba(0, 0, 0, .07)"
                : "none",
          }}
        >
          <Col xs={9}>
            <div>{product.name}{" "}</div>
            <div className="badge badge-primary">{product?.fournisseur?.name}</div>
       
          </Col>
          <Col xs={3}>
            {product.id && (
              <button
                disabled={product.quantityBrute <= 0}
                className={` ${
                  itemOnBasket
                    ? "btn btn-danger btn-sm"
                    : "btn btn-green btn-sm"
                }`}
                onClick={handleAddToBasket}
              >
                {!itemOnBasket ? "Ajouter" : "Retirer"}
              </button>
            )}
           
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default ProductItem;
