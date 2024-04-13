import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQtyLitreFromMagasinItem } from "../../../../store/frommagasin/actions/frommagasin";


import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const EditFromMagasinItemLitre = ({
  product,
  setRealQttLitre,
  setState,
  state,
  realQttLitre,
  index,
}) => {
  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setState(temp_state);
  };
  const onAddQtyBrute = (value) => {
    updateObjectValue(index, "qttbylitre", value);
  };

  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        min={0}
        value={realQttLitre}
        defaultValue={product?.qttbylitre}
        onChange={(value) => {
          if (value == "" ) {
            setRealQttLitre(product?.qttbylitre);
            onAddQtyBrute(product?.qttbylitre);
          } else {
            setRealQttLitre(Number(value));
            onAddQtyBrute(Number(value));
          }
        }}
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
export default EditFromMagasinItemLitre;
