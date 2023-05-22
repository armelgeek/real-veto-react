import React from "react";
import { useDispatch } from "react-redux";
import {
  addQtyFromMagasinPhytoCondItem,
  minusQtyFromMagasinPhytoCondItem,
} from "../../../../store/frommagasin/actions/itanewMagasin";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
export const EditPhytoConditionnementInput = ({
  product,
  update,
  state,
  setState,
  realQttCC,
  setRealQttCC,
  maxRealQttCC,
  index,
}) => {
  const onAddQtyPortion = (value) => {
    update(index, "prixqttccvente", value);
  };
  
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"decimal"}
        w={28}
        bg={"whitesmoke"}
        onChange={(value) => {
          if (value == "") {
            onAddQtyPortion(product?.prixqttccvente);
            setRealQttCC(product?.prixqttccvente);
          } else {
            setRealQttCC(Number(value));
            onAddQtyPortion(Number(value));
          }
        }}
        min={0}
        value={realQttCC}
        defaultValue={product?.prixqttccvente}
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
