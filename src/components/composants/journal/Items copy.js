import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Stock from "./Stock";
import moment from "moment";
import getByRangeDateAndProduct from "../../../filters/getByRangeDateAndProduct";
import { displayDate } from "../../../utils/functions";

export const Items = ({ product, date, data }) => {

  let val = 0;
  var weekday = date.toLocaleString("default", { weekday: "short" });
  
  return (
    <>
      {weekdayNumber == 6 ? (
        <>
          <td className="text-center" title={product.name}>
            {val == undefined ? "-" : val.quantityParProduct}
          </td>
        </>
      ) : (
        <>
          <td
            className="text-center"
            title={displayDate(date) + " : " + product.name}
          >
            {val == undefined ? "-" : val.quantityParProduct}
          </td>
        </>
      )}
    </>
  );
};

export default Items;
