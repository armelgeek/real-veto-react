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
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
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
  const getValue = () => {
    return canBuyCCFromCva(copy(product)) == true
      ? product?.quantityBruteCVA * 1
      : product?.quantityBruteCVA * 1 - 1;
  };
  const getValueCC = () => {
    return hasCondVal(copy(product)) == true
      ? product?.condval * 1
      : product?.condval * 1 - 1;
  };
  const checkVal=()=>{
    if(isSpecialProductHandle(product)){
      return getValueCC();
    }else{
      return getValue();
    }
  }
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyBrute(value);
          setRealQtt(value);
          if (!canBuyCCFromCva(product)) {
            alert("Le stock ne satisfait pas votre commande");
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
export default FromMagasinItemControl;
