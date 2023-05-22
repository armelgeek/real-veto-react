import React from "react";
import { useDispatch } from "react-redux";
import {
  addQtyFromMagasinSovaxItem,
  minusQtyFromMagasinSovaxItem,
} from "../../store/frommagasin/actions/itanewMagasin";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { addQtyFromDepotSovaxItem } from "../../store/fromdepot/actions/itanewDepot";
export const SovaxInputDose = ({
  product,
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
}) => {
  const dispatch = useDispatch();
  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromDepotSovaxItem(product.id, value));
  };
  const isEnough = () => {
    return (
      product.quantityCC - product.qttByCCDepot < 0 &&
      product.quantityBrute - 1 - product.quantityParProductDepot * 1 < 0
    );
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
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
        max={!isEnough() ? product.doseDefault/2 : product.quantityCC / 2}
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
