import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../../../store/basket/actions/basket";
import BasketItemControl from "./BasketItemControl";
import BasketItemPartial from "./BasketItemPartial";
const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
        <div style={{ width: "45%" }}>
          <p>
            {product.name}({product.prixVente}{"Ar"} )
          </p>
        </div>
        <div className="text-inline">
          <small>Vrac </small>

          <BasketItemControl product={product} />
        </div>
        <div>
          <small>CC </small>
          <BasketItemPartial product={product} />
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
