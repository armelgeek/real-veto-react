import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Stock from "./Stock";
import moment from "moment";
import getByRangeDateAndProduct from "../../../filters/getByRangeDateAndProduct";
import { displayDate } from "../../../utils/functions";

export const NoItemsApprov = () => {
  return (
    <td className="text-center p-1">
        {/**<div className="mb-2">
          <span className="text-center  p-1">-</span>
          <span className="text-center  p-1">-</span>
        </div>{" "}**/}
        <div>
          <span className="text-center  p-1">-</span>
        </div>
    </td>
  );
};

export default NoItemsApprov;
