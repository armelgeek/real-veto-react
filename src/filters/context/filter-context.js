import React from "react";
import lodash from "lodash";
import { useState, useEffect } from "react";
import useMergeState from "../../hooks/mergeState";
import { SelectFilter } from "./select-filter";
import { CheckboxFilter } from "./checkbox-filter";

const FilterContext = React.createContext();

export const Data = ({ children }) => {
  return (
    <FilterContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Context  must be used within a FilterContext");
        }
        return children(context);
      }}
    </FilterContext.Consumer>
  );
};
const getResultat = (array) => {
  return array.reduce((r, data) => {
    var temp = r.find((o) => o === data);
    if (!temp) {
      r.push(data);
    }
    return r;
  }, []);
};
{
  /**const sort = (event) => {
  switch (event.target.value) {
    case 'Low': {
      setResult([...result].sort((low, high) => low.price - high.price));
      break;
    }

    case 'High': {
      setResult([...result].sort((low, high) => high.price - low.price));
      break;
    }

    case 'Name': {
      setResult(
        [...result].sort(function (low, high) {
          if (low.name < high.name) {
            return -1;
          } else if (low.name > high.name) {
            return 1;
          } else {
            return 0;
          }
        })
      );
      break;
    }

    default: {
      setResult([...result].sort((low, high) => low.price - high.price));
      break;
    }
  }
};*/
}
/**
 * 
 * const filter = {
    // This will check if the invoice 'active' property is true
    active: true,
    // This will check that the status is NOT equal to pending
    status: (status) => status !== 'pending',
    // This will check if the email matches ANY of these values
    email: ['john@doe.com', 'cho@mumma.com']
};
 */

const updateFilter = (data, filter, reset) => {
  if (!reset) {
    return data.filter((val) => {
      let valid = true;

      for (const [key, value] of Object.entries(filter)) {
        if (Array.isArray(value)) {
          if (val[key]?.id) {
            if (!value.toString().includes(val[key]?.id)) {
              valid = false;
            }
          } else {
            if (!value.toString().includes(val[key])) {
              valid = false;
            }
          }
        }
      }

      return valid;
    });
  } else {
    return [...data];
  }
};

export const FilterContent = ({
  data,
  resultat,
  exclude = [],
  labelSelect = [],
  labelChoice = [],
  moreAttribute,
  children,
}) => {
  const [filters, setFilters] = useMergeState({});
  const [records, setRecords] = useState([]);
  const [reset, setReset] = useState(false);
  const arrayKey = [];
  const boolKey = [];
  const excludeInArray = (exc) => {
    return exc.filter(function (x) {
      return exclude.indexOf(x) < 0;
    });
  };

  data.map((e) => {
    Object.keys(e).forEach((key) => {
      if (typeof e[key] === "object") {
        arrayKey.push(key);
      }
      if (typeof e[key] === "boolean") {
        boolKey.push(key);
      }
    });
  });

  let arrayResult = excludeInArray(getResultat(arrayKey));
  let boolResult = excludeInArray(getResultat(boolKey));
  React.useEffect(() => {
    setRecords(updateFilter(resultat, filters, reset));
  }, [filters, reset]);
  const value = { data, records, filters, setFilters };
  return (
    <FilterContext.Provider value={value}>
      <>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="border p-2">
            <div className="d-block">
              {boolResult.map((r, index) => (
                <>
                  <CheckboxFilter
                    attribute={r}
                    reset={reset}
                    setReset={setReset}
                    label={labelChoice[index] || " choix " + (index + 1)}
                    action={setFilters}
                  />
                </>
              ))}
            </div>

            <div className="d-flex justify-content-between gap-2">
              {arrayResult.map((r, index) => (
                <>
                  <SelectFilter
                    array={data}
                    attribute={r}
                    label={labelSelect[index] || " option " + (index + 1)}
                    reset={reset}
                    setReset={setReset}
                    option={"name"}
                    action={setFilters}
                  />
                </>
              ))}
              {moreAttribute &&
                moreAttribute.map((more) => (
                  <>
                    {more?.type == "select" && (
                      <SelectFilter
                        array={data}
                        label={more?.label || " option"}
                        attribute={more?.value}
                        reset={reset}
                        setReset={setReset}
                        action={setFilters}
                      />
                    )}
                  </>
                ))}
            </div>
            <button className="btn btn-primary btn-sm mt-1" onClick={() => setReset(true)}>
              Retirer les filtrages
            </button>
          </div>

          <div>
            Hello
          </div>
        </div>

        <div>{children}</div>
      </>
    </FilterContext.Provider>
  );
};
