import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useApprov from "../../../hooks/useApprov";
import { displayMoney } from "../../../utils/functions";

const ProductItemApprov = ({
  key,
  product,
  isItemOnApprov,
  handleAddToApprov,
}) => {
  return (
    <> 
      <ListGroup.Item key={key}>
        <Row
          className={`product-card m-2 ${!product.id ? "product-loading" : ""}`}
          style={{
            border:
              product && isItemOnApprov(product.id) ? "1px solid #a6a5a5" : "",
            boxShadow:
              product && isItemOnApprov(product.id)
                ? "0 10px 15px rgba(0, 0, 0, .07)"
                : "none",
          }}
        >
          <Col xs={9}>
            <>
              <p>{product?.name}</p>
              <div class="badge badge-primary">
                {product?.fournisseur?.name}
              </div>
              <p>
                <strong> {displayMoney(product?.prixFournisseur)}</strong>
              </p>
            </>
          </Col>

          <Col xs={3}>
            {product?.id && (
              <button
                className={` ${
                  isItemOnApprov(product.id)
                    ? "btn btn-danger btn-sm"
                    : "btn btn-green btn-sm"
                }`}
                onClick={() => handleAddToApprov(product)}
              >
                {!isItemOnApprov(product.id) ? "Ajouter" : "Retirer"}
              </button>
            )}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default React.memo(ProductItemApprov);
