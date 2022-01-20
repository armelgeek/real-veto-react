import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Stock from "./Stock";
import moment from "moment";
import getByRangeDateAndProduct from '../../../filters/getByRangeDateAndProduct';
export const Items = ({ product, date, data }) => {
  const [dt, setDt] = useState(date);
  let weekdayNumber = new Date(date).getDay();
  // var weekday = dateObj.toLocaleString("default", { weekday: "short" })
  let val = getByRangeDateAndProduct(data, "dateCom", date, product);
  console.log(val);
  return (
    <>
      {weekdayNumber == 6 ? (
        <>
          <td className="text-center" title={val.name}>{val==undefined ? 0 : val.quantityParProduct}</td>
        </>
      ) : (
        <>
          <td className="text-center" title={val.name} >{val==undefined ? 0 : val.quantityParProduct}</td>
        </>
      )}
    </>
  );
};

export default Items;
