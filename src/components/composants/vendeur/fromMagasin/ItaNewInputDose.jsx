import React from 'react'
import { useDispatch } from 'react-redux';
import { addQtyFromMagasinDoseItem, minusQtyFromMagasinDoseItem } from '../../../../store/frommagasin/actions/itanewMagasin';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
export const ItaNewInputDose = ({product}) => {
    const dispatch = useDispatch();
    const onAddQtyPortion = (value) => {
      dispatch(addQtyFromMagasinDoseItem(product.id,value));
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
          }}
          min={0}
          defaultValue={0}
          max={
            product.quantityBruteCVA > 0
              ? product.doseDefault
              : product.quantityCCCVA
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </div>
    )
}
