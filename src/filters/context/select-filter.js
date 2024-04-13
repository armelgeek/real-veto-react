import React, { useEffect, useState } from "react";
import { xor } from "lodash";
export const SelectFilter = ({
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
    let res = [];
    if (selects.length > 0) {
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
  useEffect(() => {
    let datam = [];
    if (option) {
      arrayData.map((v) => {
        datam.push(String(v.id));
      });
    }else{
      arrayData.map((v) => {
        datam.push(v);
      });
    }
    if (reset == true) {
      action({ [attribute]: datam });
      setReset(false);
    }
  }, [reset]);
  return (
    <>
      <select
      className="form-control"
        name={attribute}
        onChange={(e) => {
          action({ [attribute]: [e.target.value] });
          setReset(false);
        }}
      >
        <option value="" selected={reset}>
          Filter par : {label}
        </option>
        {arrayData.map((arr) => (
          <>
            {arr.hasOwnProperty("id") ? (
              <option value={arr.id}>{arr[option]}</option>
            ) : (
              <option value={arr}>{arr}</option>
            )}
          </>
        ))}
      </select>
    </>
  );
};
