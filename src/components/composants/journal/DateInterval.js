import React from "react";

const DateInterval = ({ date }) => {
  let weekday = new Date(date).toLocaleString("fr-FR", { weekday: "short" });

  return (
    <>
      <td
        className={weekday == "sam." ? `bg-warning text-white text-center` : "bg-secondary text-center"}
      >
        {date}
      </td>
    </>
  );
};
export default DateInterval;
