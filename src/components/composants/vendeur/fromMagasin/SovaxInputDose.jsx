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
  update,
  index,
  state,
  setState,
  setRealQttCC,
  realQttCC,
}) => {
 
  const onAddQtyPortion = (value) => {
    update(index, "prixParCC", value);
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
