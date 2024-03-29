import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQtyFromMagasinPortionItem,
  minusQtyFromMagasinPortionItem,
} from "../../../../store/frommagasin/actions/frommagasin";
import { isSpecialProductHandle } from "../fromMagasin/block-it";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const FromMagasinItemPartial = ({
  product,
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { frommagasins } = useSelector((state) => ({
    frommagasins: state.frommagasins,
  }));
  const isEnough = () => {
    return (
      product.quantityCCCVA - product.qttByCC < 0 &&
      product.quantityBruteCVA - 1 - product.quantityParProduct * 1 < 0
    );
  };
  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromMagasinPortionItem(product.id, value));
  };
  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        ref={ref}
        bg={"whitesmoke"}
        defaultValue={product.quantityCCCVA}
        onChange={(value) => {
          if (value == "") {
            onAddQtyPortion(product.quantityCCCVA);
            setRealQttCC(product.quantityCCCVA);
          } else {
            setRealQttCC(value * 1);
            onAddQtyPortion(value * 1);
          }
        }}
        min={0}
        max={
          isSpecialProductHandle(product)
            ? product?.condml
            : product?.doseDefault
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
