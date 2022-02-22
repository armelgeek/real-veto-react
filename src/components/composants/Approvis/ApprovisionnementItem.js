import React from "react";
import { Col, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch } from "react-redux";
import { displayMoney } from "../../../utils/functions";
import ApprovisionnementItemControl from "./ApprovisionnementItemControl";
const ApprovisionnementItem = ({ product, isItemOnApprov, addToApprov }) => {
  const dispatch = useDispatch();
  const handleAddToApprov = () => {
    if (addToApprov) addToApprov(product);
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
                  product.prixFournisseur * product.quantityParProduct -
                    product.remise
                )}
              </td>
            </tr>
            {/**<tr>
              <td>Remise en Ariary :{product.remise}</td>
              <td>
                {" "}
                <input
                  type="number"
                  onChange={(e) => (product.remise = e.target.value)}
                  className="form-control"
                />
              </td>
            </tr>**/}
          </table>
        </div>
        <div className="d-flex mt-3">
          <ApprovisionnementItemControl product={product} />
        </div>
        <div>
          {itemOnApprov && (
            <button
              onClick={handleAddToApprov}
              className="btn btn-danger btn-xs text-right"
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovisionnementItem;
