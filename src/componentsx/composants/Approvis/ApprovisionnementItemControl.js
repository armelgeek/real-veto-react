import React from "react";
import { useDispatch } from "react-redux";
import {
  addQtyApprovItem,
  minusQtyApprovItem,
  setQtyApprovItem,
} from "../../../store/approvis/actions/approvis";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
const ApprovisionnementItemControl = ({ product }) => {
  const dispatch = useDispatch();
  const onAddQty = () => {
    dispatch(addQtyApprovItem(product.id));
  };
  const onAddQtyBrute = (value) => {
    dispatch(setQtyApprovItem(product.id, value));
  };

  const onMinusQty = () => {
    //  if ((product.quantityBrute >= product.quantityParProduct) && product.quantityParProduct !== 0) {
    dispatch(minusQtyApprovItem(product.id));
    // }
  };

  return (
    <div className="basket-item-control">
    
      <NumberInput
        w={28}
        bg={"whitesmoke"}
        onChange={(value) => {
          onAddQtyBrute(Number(value));
        }}
        min={0}
        defaultValue={product.quantityParProduct}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {/**    <button
        className="btn btn-dark btn-sm"
        onClick={onAddQty}
        type="button"
      >
        +
      </button>
      <div className="mr-2 ml-1 d-flex">
      <span>{product.quantityParProduct}</span>
      </div>
      <button
        className="btn btn-dark btn-sm"
        disabled={product.quantityParProduct === 0}
        onClick={onMinusQty}
        type="button"
      >
        -
      </button>*/}
    </div>
  );
};
export default ApprovisionnementItemControl;
