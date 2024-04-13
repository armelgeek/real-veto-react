import React from "react";
import { useDispatch } from "react-redux";
import {
  setRemisePerProduct,
  setRemisePercent,
} from "../../../store/approvis/actions/approvis";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from "@chakra-ui/react";
const ApprovisionnementRemise = ({ product }) => {
  const dispatch = useDispatch();

  const onAddQtyBrute = (value) => {
    dispatch(setRemisePerProduct(product.id, value));
  };
  const onAddPercent = (value) => {
    dispatch(setRemisePercent(product.id, value));
  };
  return (
    <tr>
      <td>Remise : (en Ariary)</td>
      <td className="d-flex">
        {" "}
        <NumberInput
          bg={"whitesmoke"}
          onChange={(value) => {
            onAddQtyBrute(Number(value));
          }}
          min={0}
          defaultValue={product.remise}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </td>
    </tr>
  );
};
export default ApprovisionnementRemise;
