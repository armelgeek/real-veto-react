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
  index,
  state,
  setState,
  setRealQttCC,
  realQttCC,
  maxRealQttCC
}) => {
  const dispatch = useDispatch();
 
  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setState(temp_state);
  };
  const onAddQtyPortion = (value) => {
    updateObjectValue(index, "prixParCC", value);
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"decimal"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyPortion(value);
          setRealQttCC(value);
        }}
        min={0}
        value={realQttCC}
        defaultValue={product?.prixParCC}
    //    max={maxRealQttCC}
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
