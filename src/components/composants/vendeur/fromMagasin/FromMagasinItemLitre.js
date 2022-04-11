import React from "react";
import { useDispatch } from "react-redux";
import { setQtyLitreFromMagasinItem } from "../../../../store/frommagasin/actions/frommagasin";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const FromMagasinItemLitre = ({
  product,
  setRealQttLitre,
  realQttLitre,
  maxRealQttByLitre,
}) => {
  const dispatch = useDispatch();
  const onAddQtyBrute = (value) => {
    dispatch(setQtyLitreFromMagasinItem(product.id, value));
  };

  return (
    <div className="basket-item-control">
      <NumberInput
        inputMode={"numeric"}
        w={28}
        step={1}
        bg={"whitesmoke"}
        min={0}
        value={realQttLitre}
        defaultValue={0}
        onChange={(value) => {
          if (value == "") {
            setRealQttLitre(0);
            onAddQtyBrute(0);
          } else {
            setRealQttLitre(Number(value));
            onAddQtyBrute(Number(value));
          }
        }}
        max={maxRealQttByLitre}
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
export default FromMagasinItemLitre;
