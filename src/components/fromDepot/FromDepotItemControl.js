import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { setQtyFromDepotItem } from "../../store/fromdepot/actions/fromdepot";

const FromDepotItemControl = ({
  product,
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
}) => {
  const dispatch = useDispatch();
  const onAddQtyBrute = (value) => {
    dispatch(setQtyFromDepotItem(product.id, value));
  };

  const getValue = () => {
    return isEnough() == true
      ? product?.quantityBrute * 1 
      : product?.quantityBrute * 1;
  };
  const isEnough = () => {
    return product.quantityBrute - 1 - product.quantityParProductDepot * 1 < 0;
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        disabled={product?.condmldepot != 0 && product?.qttccpventedepot != 0}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyBrute(value);
          setRealQtt(value);
          if (isEnough() == true) {
            alert(
              "Le reste du stock est : " +
                product.quantityBrute +
                " < " +
                value +
                " demandé"
            );
          }
        }}
        min={0}
        defaultValue={product?.quantityParProductDepot}
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
export default FromDepotItemControl;
