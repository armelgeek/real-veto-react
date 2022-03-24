import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,Text
} from "@chakra-ui/react";
const EditToMagItemControl = ({
  product,
  index,
  state,
  setState,
  setRealQttCC,
  setRealQtt,
  stock,
  realcommand,
  realQtt,
  realQttCC,
}) => {
  function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  const dispatch = useDispatch();
  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setState(temp_state);
  };
  const onAddQtyBrute = (value) => {
    updateObjectValue(index, "quantityParProduct", value);
  };
  
  const onAddQtyRestitue = (value) => {
    updateObjectValue(index, "quantityrestitueParProduct", value);
  };
  const getValue = () => {
    return isEnough() == true
      ? product?.quantityBrute * 1 - 1
      : product?.quantityBrute * 1;
  };
  const isEnough = () => {
    return stock?.quantityBruteCVA < realcommand?.quantityParProduct;
  };
  return (
    <div className="basket-item-control">
      {isEnough() ? (
        <>
          <NumberInput
            inputMode={"numeric"}
            w={28}
            step={1}
            disabled
            bg={"whitesmoke"}
            onChange={(value) => {
              onAddQtyBrute(Number(value));
              setRealQtt(Number(value));
              if (
                stock?.quantityBruteCVA - realcommand?.quantityParProduct <
                0
              ) {
                alert("Le stock ne satisfait pas votre commande");
              }
            }}
            defaultValue={product?.quantityParProduct}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text textTransform="uppercase">Restituable</Text>
          <NumberInput
            inputMode={"numeric"}
            w={28}
            step={1}
            bg={"whitesmoke"}
            min={0}
            onChange={(value) => {
              onAddQtyRestitue(Number(value));
            }}
            defaultValue={stock?.quantityBruteCVA}
            max={stock?.quantityBruteCVA}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </>
      ) : (
        <>
          <NumberInput
            inputMode={"numeric"}
            w={28}
            step={1}
            bg={"whitesmoke"}
            onChange={(value) => {
              onAddQtyBrute(Number(value));
              setRealQtt(Number(value));
              if (
                stock?.quantityBruteCVA - realcommand?.quantityParProduct <
                0
              ) {
                alert("Le stock ne satisfait pas votre commande");
              }
            }}
            min={0}
            defaultValue={product?.quantityParProduct}
            max={stock?.quantityBruteCVA}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </>
      )}
    </div>
  );
};
export default EditToMagItemControl;
