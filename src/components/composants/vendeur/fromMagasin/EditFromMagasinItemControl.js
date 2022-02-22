import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
const EditFromMagasinItemControl = ({
  product,
  index,
  state,
  setState,
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
}) => {
  const dispatch = useDispatch();

  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setState(temp_state);
  };
  const onAddQtyBrute = (value) => {
    updateObjectValue(index, "quantityParProduct", value);
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
          onAddQtyBrute(Number(value));
          setRealQtt(Number(value));
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
export default EditFromMagasinItemControl;
