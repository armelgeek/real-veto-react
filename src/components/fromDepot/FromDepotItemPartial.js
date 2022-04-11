import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { addQtyFromDepotPortionItem } from "../../store/fromdepot/actions/fromdepot";

const FromDepotItemPartial = ({
  product,
  setRealQttCC,
  setRealQtt,
  realQtt,
  realQttCC,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const { fromdepots } = useSelector((state) => ({
    fromdepots: state.fromdepots,
  }));
  const isEnough = () => {
    return (
      product.quantityCC - product.qttByCCDepot < 0 &&
      product.quantityBrute - 1 - product.quantityParProductDepot * 1 < 0
    );
  };
  const onAddQtyPortion = (value) => {
    dispatch(addQtyFromDepotPortionItem(product.id, value));
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
          onAddQtyPortion(Number(value));
          setRealQttCC(Number(value));
          if (isEnough()) {
            alert("Le stock ne satisfait pas votre commande");
          }
        }}
        min={0}
        defaultValue={product.qttByCCDepot}
        max={!isEnough() ? product.doseDefault : product.quantityCC}
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
export default FromDepotItemPartial;
