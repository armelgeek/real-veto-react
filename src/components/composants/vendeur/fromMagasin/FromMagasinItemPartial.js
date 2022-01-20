import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQtyFromMagasinPortionItem,
  minusQtyFromMagasinPortionItem,
} from "../../../../store/frommagasin/actions/frommagasin";
import {
  handleSoldQuantityCC,
  handleMinusProduct,
  isSpecialProductHandle,
  handlePhtyoSpecific,
} from "../../../../store/functions/function";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
const FromMagasinItemPartial = ({ product }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { frommagasins } = useSelector((state) => ({
    frommagasins: state.frommagasins,
  }));

  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromMagasinPortionItem(product.id, value));
  };
  const checkQuantityBrute = (frommagasins) => {
    let qtt = 0;
    frommagasins.forEach((element) => {
      if (element.quantityBruteCVA <= 0) {
        qtt += 1;
      }
    });
    return qtt;
  };
  const checkQuantityCCCVA = (frommagasins) => {
    let qtt = 0;
    frommagasins.forEach((element) => {
      if (element.id == product.id) {
        if (element.quantityCCCVA <= 0) {
          qtt += 1;
        }
      }
    });
    return qtt;
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        ref={ref}
        bg={"whitesmoke"}
        onChange={(value) => {
          console.log(frommagasins);
            onAddQtyPortion(value);
        }}
        min={0}
        defaultValue={product.qttByCC}
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
export default FromMagasinItemPartial;
