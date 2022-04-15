import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQttBrute } from "../../../../store/frommagasin/actions/frommagasin";

import {
  canBuyCCFromCva,
  hasCondVal,
} from "../../../../store/functions/function";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const FromMagasinItemBrute = ({
  product,
}) => {
  const dispatch = useDispatch();
  const onAddQtyBrute = (value) => {
    dispatch(setQttBrute(product.id, value));
  };

  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        min={0}
        defaultValue={product?.quantityBrute}
        onChange={(value) => {
          if (value == "") {
            //setRealQtt(0);
            onAddQtyBrute(0);
          } else {
            //  setRealQtt(value);
            onAddQtyBrute(Number(value));
          }

          /**  if (isEnough(product)) {
            alert("Le stock ne satisfait pas votre commande");
          } */
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
export default FromMagasinItemBrute;
