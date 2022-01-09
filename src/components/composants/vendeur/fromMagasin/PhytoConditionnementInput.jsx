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
export const PhytoConditionnementInput = ({ product }) => {
  const dispatch = useDispatch();
  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromMagasinPhytoCondItem(product.id, value));
  };
  const total = () => {
    if (product.quantityBruteCVA > 0) {
      return product.condml * 1;
    } else {
      if (product.condval > 0) {
        return product.condml;
      } else {
        return product.quantityCCCVA * 1;
      }
    }
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"decimal"}
        w={28}
        step={product?.qttccpvcheckMaxente}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyPortion(value);
        }}
        min={0}
        defaultValue={0}
     //   max={total()}
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
