import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addQtyFromMagasinItem,
  minusQtyFromMagasinItem,
  setQtyFromMagasinItem,
} from "../../../../store/frommagasin/actions/frommagasin";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const FromMagasinItemControl = ({ product }) => {
  const dispatch = useDispatch();
  const onAddQtyBrute = (value) => {
    dispatch(setQtyFromMagasinItem(product.id, value));
  };

  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyBrute(value);
        }}
        min={0}
        defaultValue={product?.quantityParProduct}
        max={product?.quantityBruteCVA * 1}
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
export default FromMagasinItemControl;
