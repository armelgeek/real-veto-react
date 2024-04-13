import React,{useState} from "react";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
const RangeFilterContext = React.createContext();
const getByRangeDate = (data, dateKey, startDate, endDate) => {
  return data.filter((d) => {
    var date = new Date(d[dateKey]);
    return moment(date).isBetween(startDate, endDate, "days", "[]");
  });
};

function RangeDateFilter({ records, key, local, children }) {
  const [begin, setBegin] = useState(
    moment(new Date()).startOf("week").add("d", 1)
  );
  const [end, setEnd] = useState(moment(new Date()).endOf("week"));
  const [dateRange, onChangeDateRange] = useState([begin, end]);
  const [data, setData] = useState(getByRangeDate(records, key, begin, end));
  const value = { data };

  return (
    <RangeFilterContext.Provider value={value}>
      <>
      {JSON.stringify(getByRangeDate(records, key, begin, end))}
        <div>
          <DateRangePicker
            locale={local}
            onChange={onChangeDateRange}
            value={dateRange}
          />
        </div>
        <div></div>
      </>
      {children}
    </RangeFilterContext.Provider>
  );
}

function Data({ children }) {
  return (
    <RangeFilterContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("Data  must be used within a RangeFilterContext");
        }
        return children(context);
      }}
    </RangeFilterContext.Consumer>
  );
}
export { RangeDateFilter, Data };
