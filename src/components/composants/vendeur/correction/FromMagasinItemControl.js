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
  isSpecialProductHandle,
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
  const checkVal = () => {
    if (isSpecialProductHandle(product)) {
      return getValueCC();
    } else {
      return getValue();
    }
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
        bg={"whitesmoke"}
        min={0}
        defaultValue={
          isSpecialProductHandle(product)
            ? product?.condval
            : product?.quantityBruteCVA
        }
        onChange={(value) => {
          if (value == "") {
            setRealQtt(0);
            onAddQtyBrute(0);
          } else {
            setRealQtt(value);
            onAddQtyBrute(value);
          }

          if (isEnough(product)) {
            alert("Le stock ne satisfait pas votre commande");
          }
        }}
        //max={product.quantityBruteCVA}
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
