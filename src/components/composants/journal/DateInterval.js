import React from "react";
import { displayShortMonth } from "../../../utils/functions";

const DateInterval = ({ date }) => {
  let weekday = new Date(date).toLocaleString("fr-FR", { weekday: "short" });
  let weekdayNumber = new Date(date).getDate();
  return (
    <>
      <td style={{height:"100%"}}
        className={
          weekday == "sam."
            ? ` bg-warning text-white text-center mr-2`
            : "bg-secondary text-center mr-2"
        }
      >{weekdayNumber}
       
      </td>
    </>
  );
};
export default DateInterval;
