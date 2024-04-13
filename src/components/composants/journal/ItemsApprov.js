import React, { useEffect, useState } from "react";
export const ItemsApprov = ({ flat, gr, id }) => {
  let orderItem = flat.filter((f) => f.id == id);
  let lastElement =
    orderItem[orderItem.length - 1] != undefined
      ? orderItem[orderItem.length - 1]
      : {};

  let value = 0;
  if (orderItem) {
    value = orderItem
      .map((item) => item.quantityParProduct * 1)
      .reduce((prev, curr) => prev + curr, 0);
  } else {
    value = 0;
  }
  return <td className="text-center p-1">{value != 0 ? value : "-"}</td>;
};

export default ItemsApprov;
