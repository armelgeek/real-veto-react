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
  setRealQtt,
  realQtt,
  maxRealQtt,
}) => {
  //const dispatch = useDispatch();

  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setState(temp_state);
  };
  const onAddQtyBrute = (value) => {
    updateObjectValue(index, "quantityParProduct", value);
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        bg={"whitesmoke"}
        onChange={(value) => {
          if (value == "") {
            setRealQtt(0);
            onAddQtyBrute(0);
          } else {
            setRealQtt(Number(value));
            onAddQtyBrute(Number(value));
          }
        }}
        min={0}
        value={realQtt}
        defaultValue={product?.quantityParProduct}
        max={maxRealQtt}
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
