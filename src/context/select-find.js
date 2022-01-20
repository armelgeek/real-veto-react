import React, { useEffect, useState } from "react";
export const SelectFind = ({
  array,
  attribute,
  label,
  reset,
  setReset,
  option,
  action,
}) => {
  let selects = [];
  const [arrayData, setArrayData] = useState([]);
  useEffect(() => {
    array.map((r) => {
      if (r.hasOwnProperty(attribute)) {
        selects.push(r[attribute]);
      }
    });
    console.log(selects);
    let res = [];
    if (selects.length > 0) {
      console.log(typeof selects[0]);
      if (typeof selects[0] === "object") {
        res = selects.reduce((r, array) => {
          var temp = r.find((o) => o.id === array.id);
          if (!temp) {
            r.push(array);
          }
          return r;
        }, []);
        setArrayData(
          res.sort(function (a, b) {
            return a.id > b.id;
          })
        );
      } else if (typeof selects[0] === "string") {
        setArrayData(
          selects.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
          }, [])
        );
      }
    }
  }, [attribute]);
  return (
    <>
    </>
  );
};
