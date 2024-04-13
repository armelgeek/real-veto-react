import React, { useState,useEffect } from "react";
import { useDomEvent } from "framer-motion";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateStockSuccess } from "../store/basket/actions/stock";
import { action,getData } from "../utils/lib/call";
const ApprovItem = ({ product }) => {
  const [selected, setSelected] = useState(false);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();

  const [value, setValue] = useState(1);
  useEffect(()=>{
    dispatch(action("commandes").fetch());
  },[])
  const AddToStock = () => {
    dispatch(updateStockSuccess(product.id, value, 0));
    dispatch(
      action("commandes").create({
        id: meta.nextId,
        contenu: [product],
        type: "approv",
        sorte: "entree",
        vaccinateurId: null,
        qtteBrute: value,
        qtteCC: 0,
        status: true,
        emprunterId: null,
        dateCom: new Date(),
      })
    );
    setSelected(true);
  };
  return (
    <tr
      className={`product-card ${!product.id ? "product-loading" : ""}`}
      style={{
        border: product && selected ? "1px solid #a6a5a5" : "",
        boxShadow:
          product && selected ? "0 10px 15px rgba(0, 0, 0, .07)" : "none",
      }}
    >
      <td>{product.name}</td>
      <td>{product.quantityBrute + value}</td>
      <td className="d-flex justify-content-center align-items-center">
        <div className="input-group inline-group">
          <div className="input-group-prepend">
            <button
              className="btn btn-sm btn-dark btn-minus"
              onClick={() => {
                if (value > 0) setValue(value - 1);
              }}
            >
              -
            </button>
          </div>
          <input
            className="form-control quantity text-center  p-0"
            min="0"
            name="quantity"
            value={value}
            type="number"
          />
          <div className="input-group-append">
            <button
              className="btn btn-sm btn-dark btn-plus mr-2"
              onClick={() => setValue(value + 1)}
            >
              +
            </button>
          </div>
          <div className="input-group-append ml-2"></div>
        </div>
      </td>
      <td>
        {product.id && (
          <button className="btn btn-success  btn-sm" onClick={AddToStock}>
            Modifier le stock
          </button>
        )}
      </td>
    </tr>
  );
};

export default ApprovItem;
