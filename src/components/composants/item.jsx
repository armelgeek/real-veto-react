import { Button } from "@chakra-ui/button";
import { useDomEvent } from "framer-motion";
import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useBasket from "../../hooks/useBasket";
const ProductItem = ({ product }) => {
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const { isItemOnBasket, addToBasket } = useBasket(basket, dispatch);
  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      //  history.push(`/product/${product.id}`)
    }
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(product.id) : false;

  const handleAddToBasket = () => {
    if (addToBasket) addToBasket(product);
  };

  return (
    <>
      <ListGroup.Item>
        <Row
          className={`product-card m-2 ${!product.id ? "product-loading" : ""}`}
          style={{
            border: product && itemOnBasket ? "1px solid #a6a5a5" : "",
            boxShadow:
              product && itemOnBasket
                ? "0 10px 15px rgba(0, 0, 0, .07)"
                : "none",
          }}
        >
          <Col xs={9}>{product.name}</Col>
          <Col xs={3}>
            {product.id && (
              <button
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
