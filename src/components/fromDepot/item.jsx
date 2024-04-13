import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useFromDepot from "../../hooks/useFromDepot";
import { displayMoney } from "../../utils/functions";
const ProductItem = ({ key, product }) => {
  const fromdepots = useSelector((state) => state.fromdepots);
  const dispatch = useDispatch();
  const { isItemFromDepot, addFromDepot } = useFromDepot(fromdepots, dispatch);

  const itemOnBasket = isItemFromDepot ? isItemFromDepot(product.id) : false;
  useEffect(() => {
    if (!itemOnBasket) {
      product.qttByCC = 0;
      product.quantityParProduct = 0;
    }
  }, [itemOnBasket]);
  const handleAddToBasket = () => {
    if (addFromDepot) addFromDepot(product);
  };
  return (
    <>
      <ListGroup.Item key={key} style={{
        width:"100%"
      }}>
        <Row
          className={` ${!product.id ? "product-loading" : ""}`}
          style={{
            boxShadow:
              product && itemOnBasket
                ? "15px 10px 15px rgba(0, 0, 0, .07)"
                : "none",
          }}
        >
          <Col xs={9}>
            <>
              <p>{product?.name}</p>
              <div className="badge badge-primary">
                {product?.fournisseur?.name}
              </div>
            </>
          </Col>
          <Col xs={3}>
            {product?.id && (
              <button
                disabled={product.quantityBrute === 0}
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
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default ProductItem;
