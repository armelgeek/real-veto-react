import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useBasket from "../../../hooks/useBasket";
import { removeFromBasket } from "../../../store/basket/actions/basket";
import { displayMoney } from "../../../utils/functions";
import BasketItemControl from "./BasketItemControl";
import BasketItemPartial from "./BasketItemPartial";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));
  const { basket } = useSelector((state) => ({
    basket: state.basket,
  }));
  const { isItemOnBasket, addToBasket } = useBasket(basket, dispatch);

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(product.id) : false;

  const handleAddToBasket = () => {
    if (addToBasket) addToBasket(product);
  };

  return (
    <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
      <div style={{ width: "45%" }}>
        <p>{product.name}</p>
        <span>
          <strong> {displayMoney(product.prixVente)}</strong>
        </span>
      </div>
      <div className="text-inline">
        <small>{product.type} </small>

        <BasketItemControl product={product} />
      </div>
      <div>
        {itemOnBasket && (
          <button
            onClick={handleAddToBasket}
            className="btn btn-danger btn-xs text-right"
          >
            X
          </button>
        )}
      </div>{" "}
    </div>
  );
};

export default BasketItem;
