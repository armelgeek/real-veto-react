import React from "react";
import { useDispatch } from "react-redux";

import { addQtyFromDepotDoseItem } from "../../store/fromdepot/actions/itanewDepot";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
export const ItaNewInputDose = ({
  product,
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
}) => {
  const dispatch = useDispatch();
  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromDepotDoseItem(product.id, value));
  };

  const isEnough = () => {
    return (
      product.quantityCC - product.qttByCCDepot < 0 &&
      product.quantityBrute - 1 - product.quantityParProductDepot * 1 < 0
    );
  };
  return (
    <div className="basket-item-control">
      {product.quantityCC - product.qttByCCDepot}
      <NumberInput
        inputMode={"decimal"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyPortion(value);
          setRealQttCC(value);
          if (isEnough()) {
            alert("Le stock ne satisfait pas votre commande");
          }
        }}
        min={0}
        defaultValue={0}
        max={!isEnough() ? product.doseDefault * 2 : product.quantityCC * 2}
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
