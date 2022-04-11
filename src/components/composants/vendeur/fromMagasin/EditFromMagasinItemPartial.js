import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQtyFromMagasinPortionItem,
  minusQtyFromMagasinPortionItem,
} from "../../../../store/frommagasin/actions/frommagasin";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const EditFromMagasinItemPartial = ({
  product,
  setRealQttCC,
  maxRealQttCC,
  index,
  setState,
  state,
  realQttCC,
}) => {
  // const dispatch = useDispatch();

  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setState(temp_state);
  };
  const onAddQtyByCC = (value) => {
    updateObjectValue(index, "qttByCC", value);
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        bg={"whitesmoke"}
        onChange={(value) => {
          if (value == "") {
            onAddQtyByCC(0);
            setRealQttCC(0);
          } else {
            setRealQttCC(value * 1);
            onAddQtyByCC(value * 1); 
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
      {/*<button
        className="btn btn-dark btn-sm"
        data-testid="from-magasin-item-partial-plus"
        disabled={
          Number(product.qttByCC) == Number(product.doseDefault - 1) ||
          (product.quantityParProduct == product.quantityBruteCVA &&
            product.quantityCCCVA == 0)
        }
        onClick={onAddQtyPortion}
        type="button"
      >
        +
      </button>
      <span className="mx-1" data-testid="counter-partial">{product.qttByCC}</span>
      <button
        className="btn btn-dark btn-sm"
        data-testid="from-magasin-item-partial-minus"
        disabled={product.qttByCC == 0}
        onClick={onMinusQtyPortiion}
        type="button"
      >
        -
      </button>*/}
    </div>
  );
};
export default EditFromMagasinItemPartial;
