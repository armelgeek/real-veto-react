import React, { useState, useEffect } from "react";
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

const FromMagasinItemControl = ({
  product,
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
}) => {
  const dispatch = useDispatch();
  const onAddQtyBrute = (value) => {
    dispatch(setQtyFromMagasinItem(product.id, value));
  };

  const getValue = () => {
    return isEnough() == true
      ? product?.quantityBruteCVA * 1 - 1
      : product?.quantityBruteCVA * 1;
  };
  const isEnough = () => {
    return (
      product.quantityCCCVA - product.qttByCC < 0 &&
      product.quantityBruteCVA - 1 - product.quantityParProduct * 1 < 0
    );
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        disabled={product?.condml != 0 && product?.qttccpvente != 0}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyBrute(value);
          setRealQtt(value);
          if (isEnough()) {
            alert("Le stock ne satisfait pas votre commande");
          }
        }}
        min={0}
        defaultValue={product?.quantityParProduct}
        max={getValue()}
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
