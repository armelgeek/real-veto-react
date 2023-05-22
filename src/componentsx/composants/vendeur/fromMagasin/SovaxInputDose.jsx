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
  index,
  state,
  setState,
  setRealQttCC,
  maxRealQttCC,
  realQttCC,
}) => {
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
        inputMode={"numeric"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        onChange={(value) => {
          if(value==""){
            setRealQttCC(product?.prixParCC);
          }else{
            onAddQtyPortion(Number(value));
          setRealQttCC(Number(value));
          }
         
        }}
        min={0}
        value={realQttCC}
        defaultValue={product?.prixParCC}
       // max={maxRealQttCC}
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
