import React from "react";
import { useDispatch } from "react-redux";
import { addQtyFromDepotPhytoCondItem } from '../../store/fromdepot/actions/itanewDepot';
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
    dispatch(addQtyFromDepotPhytoCondItem(product.id, value));
  };
  const total = () => {
    if (product.quantityBrute > 0) {
      return product.condmldepot * 1;
    } else {
      if (product.condvaldepot > 0) {
        return product.condmldepot;
      } else {
        return product.quantityCC * 1;
      }
    }
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"decimal"}
        w={28}
        step={product?.qttccpventedepot}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyPortion(value);
          
        }}
        min={0}
        defaultValue={0}
        max={total()}
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
