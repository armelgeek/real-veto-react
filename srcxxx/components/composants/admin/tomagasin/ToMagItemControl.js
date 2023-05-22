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
  const onAddQtyBrute = (value) => {
    dispatch(setQtyMagasinItem(product.id, value));
  };
  return (
    <div className="basket-item-control">
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
