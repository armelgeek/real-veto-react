import React from "react";
import { useDispatch } from "react-redux";
import {
  addQtyFromMagasinSovaxItem,
  minusQtyFromMagasinSovaxItem,
} from "../../../../store/frommagasin/actions/itanewMagasin";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
export const SovaxInputDose = ({
  product,
  setRealQttCC,
  maxRealQttCC,
  realQttCC,
}) => {
  const dispatch = useDispatch();
  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromMagasinSovaxItem(product.id, value));
  };

  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyPortion(Number(value));
          setRealQttCC(Number(value));
        }}
        min={0}
        value={realQttCC}
        defaultValue={product?.qttByCC}
        max={maxRealQttCC}
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
