import React, { useEffect, useState } from "react";
import { displayDate } from '../../../../utils/functions';
const date = new Date();
export default function Horloge() {
  const [dateTime, setDateTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  });
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setDateTime({
        hours: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minutes:
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        seconds:
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="bg-dark py-1 px-4 text-center">
      <h1 style={{ fontSize: "20px" }} >
        {dateTime.hours} : {dateTime.minutes} : {dateTime.seconds}
      </h1>
      <h4 className="bg-thead p-1">{displayDate(date)}</h4>
    </div>
  );
}
