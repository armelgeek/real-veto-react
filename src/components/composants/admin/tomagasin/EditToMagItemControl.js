import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { displayDate } from '../../../../utils/functions';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";
const EditToMagItemControl = ({
  product,
  index,
  state,
  setState,
  setRealQttCC,
  setRealQtt,
  stock,
  realcommand,
  realQtt,
  realQttCC,
}) => {
  const updateObjectValue = (index, key, value) => {
    let temp_state = [...state];
    temp_state[index] = { ...temp_state[index], [key]: value };
    console.log(temp_state);
    setState(temp_state);
  };
  const onAddQtyBrute = (value) => {
    console.log(value);
    updateObjectValue(index, "quantityParProduct", value);
  };

  const isEnough = () => {
    return stock?.quantityBruteCVA < realcommand?.quantityParProduct;
  };
  return (
    <div className="basket-item-control">
      {isEnough() ? (
        <>
        <div>

          <NumberInput
            inputMode={"numeric"}
            w={28}
            step={1}
            disabled
            bg={"whitesmoke"}
            onChange={(value) => {
              onAddQtyBrute(Number(value));
              setRealQtt(Number(value));
              if (
                stock?.quantityBruteCVA - realcommand?.quantityParProduct <
                0
              ) {
                alert("Le stock ne satisfait pas votre commande");
              }
            }}
            defaultValue={realcommand?.quantityParProduct}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          </div>
          {realcommand?.correctiontype == 4 ? (
            <div>
              <Text textTransform="uppercase" className="text text-danger">
                CE PRODUIT A ETE RETIRÉ
              </Text>
            </div>
          ) : (
            <div>
              <Text textTransform="uppercase">Restituable</Text>
              <NumberInput
                inputMode={"numeric"}
                w={28}
                step={1}
                bg={"whitesmoke"}
                min={0}
                onChange={(value) => {
                  onAddQtyBrute(Number(value));
                  setRealQtt(Number(value));
                }}
                defaultValue={stock?.quantityBruteCVA}
                max={stock?.quantityBrute}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </div>
          )}
        </>
      ) : (
        <>
          <NumberInput
            inputMode={"numeric"}
            w={28}
            step={1}
            bg={"whitesmoke"}
            onChange={(value) => {
              onAddQtyBrute(Number(value));
              setRealQtt(Number(value));
              if (
                stock?.quantityBruteCVA - realcommand?.quantityParProduct <
                0
              ) {
                alert("Le stock ne satisfait pas votre commande");
              }
            }}
            min={0}
            defaultValue={product?.quantityParProduct}
            max={stock?.quantityBrute}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </>
      )}
    </div>
  );
};
export default EditToMagItemControl;
