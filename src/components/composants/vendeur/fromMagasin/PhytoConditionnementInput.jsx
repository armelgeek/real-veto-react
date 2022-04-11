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

export const PhytoConditionnementInput = ({
  product,
  setRealQttCC,
  realQttCC,
  maxRealQttCC,
}) => {
  const dispatch = useDispatch();
  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromMagasinPhytoCondItem(product.id, value));
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"decimal"}
        w={28}
        bg={"whitesmoke"}
        onChange={(value) => {
          if (value == "") {
            onAddQtyPortion(0);
            setRealQttCC(0);
          } else {
            onAddQtyPortion(Number(value));
            setRealQttCC(Number(value));
          }
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
