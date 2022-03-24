import React, { useEffect, useState } from "react";
export const LastStockVente = ({ flat, gr, id }) => {
  let orderItem = flat.filter((f) => f.id == id);
  let lastElement =
    orderItem[orderItem.length - 1] != undefined
      ? orderItem[orderItem.length - 1]
      : {};
  let lastStock = {
    bruteCva: lastElement.hasOwnProperty("id")
      ? lastElement.quantityBrute
      : 0,
    ccCva: lastElement.hasOwnProperty("id") ? lastElement.quantityCC : 0,
  };
  return (
    <>
      <td className="text-center">
        {orderItem.length != 0 ? lastStock.bruteCva : 0}
      </td>

    </>
  );
};

export default LastStockVente;
