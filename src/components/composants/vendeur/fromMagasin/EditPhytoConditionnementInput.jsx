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
  state,
  setState,
  realQttCC,
  setRealQttCC,
  maxRealQttCC,
  index,
}) => {
  const dispatch = useDispatch();
  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setState(temp_state);
  };
  const onAddQtyPortion = (value) => {
    updateObjectValue(index, "qttByCC", value);
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
            setRealQttCC(Number(value));
            onAddQtyPortion(Number(value));
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
