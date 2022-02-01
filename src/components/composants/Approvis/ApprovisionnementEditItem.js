import React from "react";
import { Col, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { displayMoney } from "../../../utils/functions";
import ApprovisionnementEditItemControl from "./ApprovisionnementEditItemControl";
const ApprovisionnementEditItem = ({
  product,
  index,
  isItemOnApprov,
  addToApprov,
  state,
  setState,
}) => {
  const dispatch = useDispatch();
  const handleAddToApprov = () => {
    if (addToApprov) addToApprov(product);
  };
  const removeProduct = (id) => {
    setState(state.filter((t) => t.id !== id));
  };
  const itemOnApprov = isItemOnApprov ? isItemOnApprov(product.id) : false;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-start border   mb-2 p-2">
        <div style={{ width: "65%" }}>
          <table border="1">
            <tr>
              <td>Nom de l'article : </td>
              <td>{product?.name}</td>
            </tr>
            <tr>
              <td>Prix unitaire:</td>
              <td>{displayMoney(product.prixFournisseur)}</td>
            </tr>
            <tr>
              <td>Montant HT:</td>
              <td>
                {displayMoney(
                  product.prixFournisseur * product.quantityParProduct
                )}
              </td>
            </tr>
          </table>
        </div>

        <div className="d-flex mt-3">
          <ApprovisionnementEditItemControl
            product={product}
            index={index}
            state={state}
            setState={setState}
          />
        </div>
        <div>
            <button
              onClick={() => removeProduct(product?.id)}
              className="btn btn-danger btn-xs text-right"
            >
              X
            </button>
        </div>
      </div>
    </div>
  );
};

export default ApprovisionnementEditItem;
