import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addQtyFromMagasinItem,
  minusQtyFromMagasinItem,
  setQtyFromMagasinItem,
} from "../../../../store/frommagasin/actions/frommagasin";

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

const FromMagasinItemControl = ({
  product,
  setRealQtt,
  maxRealQtt,
  realQtt,
}) => {
  const dispatch = useDispatch();
  const onAddQtyBrute = (value) => {
    dispatch(setQtyFromMagasinItem(product.id, value));
  };
  function copy(object) {
    var output, value, key;
    output = Array.isArray(object) ? [] : {};
    for (key in object) {
      value = object[key];
      output[key] = typeof value === "object" ? copy(value) : value;
    }
    return output;
  }

  return (
    <div className="basket-item-control">
    
      <NumberInput
        inputMode={"numeric"}
        w={28}
        bg={"whitesmoke"}
        min={0}
        value={realQtt}
        defaultValue={product?.quantityParProduct}
        onChange={(value) => {
          if ((value == "")) {
            setRealQtt(0);
            onAddQtyBrute(0);
          } else {
            setRealQtt(value);
            onAddQtyBrute(value);
          }
        }}
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
export default FromMagasinItemControl;
