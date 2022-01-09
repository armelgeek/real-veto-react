import React, { useEffect, useState } from "react";
export const LastStock = ({ flat, gr, id }) => {
  let orderItem = flat.filter((f) => f.id == id);
  let lastElement =
    orderItem[orderItem.length - 1] != undefined
      ? orderItem[orderItem.length - 1]
      : {};
  let lastStock = {
    bruteCva: lastElement.hasOwnProperty("id")
      ? lastElement.quantityBruteCVA 
      : 0,
    ccCva: lastElement.hasOwnProperty("id")
      ? lastElement.quantityCCCVA
      : 0,
  };
  return (
    <td className="text-center p-1">
        <tr>
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
        </tr>{" "}
        
    </td>
  );
};

export default LastStock;
