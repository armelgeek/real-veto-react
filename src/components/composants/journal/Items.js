import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Stock from "./Stock";
import moment from "moment";
import getByRangeDateAndProduct from "../../../filters/getByRangeDateAndProduct";
import { displayDate } from "../../../utils/functions";

export const Items = ({ flat, gr, quantityb, quantityc, quantitycond, id }) => {
  let orderItem = flat.filter((f) => f.id == id);
  let lastElement =
    orderItem[orderItem.length - 1] != undefined
      ? orderItem[orderItem.length - 1]
      : {};
  let lastStock = {
    bruteCva: lastElement.hasOwnProperty("id")
      ? lastElement.quantityBruteCVA
      : 0,
    ccCva: lastElement.hasOwnProperty("id") ? lastElement.quantityCCCVA : 0,
  };
  let value = 0;
  let valuecc = 0;
  let valuel = 0;
  if (orderItem) {
    value = orderItem
      .map((item) => item.quantityParProduct * 1)
      .reduce((prev, curr) => prev + curr, 0);
    valuecc = orderItem
      .map((item) => item.qttByCC)
      .reduce((prev, curr) => prev + curr, 0);
    valuel = orderItem
      .map((item) => item.qttbylitre)
      .reduce((prev, curr) => prev + curr, 0);
  } else {
    value = 0;
    valuecc = 0;
    valuel = 0;
  }
  let price = orderItem.map((item) => item.prixVente);
  return (
    <td
      className="text-center p-1"
    >
      {/**<tr>
          <td
            className={
              orderItem.length == 0
                ? `text-center p-1`
                : `text-center  bg-warning p-1`
            }
          >
             {orderItem.length != 0 ? lastStock.bruteCva : '-'}
          </td>
          <td
            className={
              orderItem.length == 0
                ? `text-center p-1`
                : `text-center bg-primary p-1 text-white`
            }
          >
            {orderItem.length != 0 ? lastStock.ccCva : '-'}
          </td>
        </tr>*/}
      <tr>
        <td
          className={
            orderItem.length == 0
              ? `text-center p-1`
              : `text-center bg-secondary p-1 text-white`
          }
        >
          {valuel != 0 ? valuel : "-"}
        </td>
        <td
          className={
            orderItem.length == 0
              ? `text-center p-1`
              : `text-center bg-primary p-1 text-white`
          }
        >
          {value != 0 ? value : "-"}
        </td>
        <td
          className={
            orderItem.length == 0
              ? `text-center  p-1`
              : `text-center  bg-warning p-1`
          }
        >
          {valuecc != 0 ? valuecc : "-"}
        </td>
      </tr>
    </td>
  );
};

export default Items;
