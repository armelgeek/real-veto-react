import React from "react";
import { useDispatch } from "react-redux";
import {
  addQtyFromMagasinDoseItem,
  minusQtyFromMagasinDoseItem,
} from "../../../../store/frommagasin/actions/itanewMagasin";
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
    dispatch(addQtyFromMagasinDoseItem(product.id, value));
  };

  const isEnough = () => {
    return (
      product.quantityCCCVA  - product.qttByCC < 0 &&
      product.quantityBruteCVA - 1 - product.quantityParProduct * 1 < 0
    );
  };
  return (
    <div className="basket-item-control">
      {product.quantityCCCVA  - product.qttByCC}
      <NumberInput
        inputMode={"decimal"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyPortion(value);
          setRealQttCC(value);
          if(isEnough()){
            alert("Le stock ne satisfait pas votre commande");
          }
        }}
        min={0}
        defaultValue={0}
        max={!isEnough() ? product.doseDefault *2 : product.quantityCCCVA * 2}
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
