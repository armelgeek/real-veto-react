import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Stock from "./Stock";
import moment from "moment";
import getByRangeDateAndProduct from "../../../filters/getByRangeDateAndProduct";
import { displayDate } from "../../../utils/functions";

export const NoItems = () => {
  return (
    <td className="text-center p-1">
      <tr style={{ display: "block" }}>
        <div className="mb-2">
          <span className="text-center  p-1">-</span>
          <span className="text-center  p-1">-</span>
        </div>{" "}
        <div>
          <span className="text-center  p-1">-</span>
          <span className="text-center  p-1">-</span>
        </div>
      </tr>
    </td>
  );
};

export default NoItems;
