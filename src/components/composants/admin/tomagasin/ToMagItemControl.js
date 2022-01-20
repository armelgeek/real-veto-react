import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import React from "react";
import { useDispatch } from "react-redux";
import {
  addQtyMagasinItem,
  minusQtyMagasinItem,
  setQtyMagasinItem,
} from "../../../../store/tomagasin/actions/tomagasin";
const ToMagItemControl = ({ product }) => {
  const dispatch = useDispatch();
  const onAddQty = () => {
    dispatch(addQtyMagasinItem(product.id));
  };

  const onMinusQty = () => {
    //  if ((product.quantityBrute >= product.quantityParProduct) && product.quantityParProduct !== 0) {
    dispatch(minusQtyMagasinItem(product.id));
    // }
  };
  const onAddQtyBrute = (value) => {
    dispatch(setQtyMagasinItem(product.id, value));
  };
  return (
    <div className="basket-item-control">
      {/** <button
        className="btn btn-dark btn-sm"
        disabled={product.quantityBrute === product.quantityParProduct}
        onClick={onAddQty}
        type="button"
      >
        +
      </button>
      {product.quantityParProduct}
      <button
        className="btn btn-dark btn-sm"
        disabled={product.quantityParProduct === 0}
        onClick={onMinusQty}
        type="button"
      >
        -
      </button>*/}
      <NumberInput
        w={28}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyBrute(value);
        }}
        min={0}
        defaultValue={product.quantityParProduct}
        step={1}
        max={product.quantityBrute}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </div>
  );
};
export default ToMagItemControl;
