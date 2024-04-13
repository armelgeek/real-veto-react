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
  update,
  index,
  state,
  setState,
  setRealQtt,
  realQtt,
}) => {
  const onAddQtyBrute = (value) => {
    update(index, "prixVente", value);
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        bg={"whitesmoke"}
        onChange={(value) => {
          if (value == "") {
            setRealQtt(product?.prixVente);
            onAddQtyBrute(product?.prixVente);
          } else {
            setRealQtt(Number(value));
            onAddQtyBrute(Number(value));
          }
        }}
        min={0}
        value={realQtt}
        defaultValue={product?.quantityParProduct}
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
