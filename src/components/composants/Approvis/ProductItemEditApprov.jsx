import { Button } from "@chakra-ui/button";
import { useDomEvent } from "framer-motion";
import React from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useApprov from "../../../hooks/useApprov";
import { displayMoney } from "../../../utils/functions";
const ProductItemEditApprov = ({ product, state, setState }) => {
  const approvisionnements = useSelector((state) => state.approvisionnements);
  const dispatch = useDispatch();

  const itemOnApprov = !!state?.find((item) => item?.id === product.id);
  const handleAddToApprov = () => {
    setState(
      state.some((p) => p.id === product.id) ? state : [product, ...state]
    );
  };
  const removeProduct = (id) => {
    setState(state.filter((t) => t.id !== id));
  };
  return (
    <>
      <ListGroup.Item>
        <Row
          className={`product-card m-2 ${!product.id ? "product-loading" : ""}`}
          style={{
            border: product && itemOnApprov ? "1px solid #a6a5a5" : "",
            boxShadow:
              product && itemOnApprov
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
              <>
                {!itemOnApprov ? (
                  <button
                    className={"btn btn-green btn-sm"}
                    onClick={handleAddToApprov}
                  >
                    Ajouter
                  </button>
                ) : (
                  <button
                    className={"btn btn-danger btn-sm"}
                    onClick={()=>removeProduct(product?.id)}
                  >
                    Retirer
                  </button>
                )}
              </>
            )}
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default ProductItemEditApprov;
