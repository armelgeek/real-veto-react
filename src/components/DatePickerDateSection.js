import React, { useState, useEffect } from "react";
import moment from "moment";
import { times, range } from "lodash";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { formatDate, formatDateTime, formatDateTimeForAPI } from "../utils/date";
import { displayMoney } from "../utils/functions";
import { useDispatch } from 'react-redux';
import { getTdbCommandeByProduct,getTdbCommandeByProducts } from "../store/actions/commandes";
import { useBoolean } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { getData } from "../utils/lib/call";
import EditToFromMag from './composants/vendeur/fromMagasin/EditFromMag';
const aCount = (arr, num) => arr.filter(x => x === num).length;
const DatePickerDateSection = ({ value, dates, data, id, onChange }) => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(
    moment(value).startOf("month")
  );

  const [dateRange, setDateRange] = useState([moment().startOf('month'), moment().endOf('month')]);
  const [nextMonth, setNextMonth] = useState(
    moment(value).startOf("month").add(1, "month")
  );

  const handleYearChange = (year) => {
    setSelectedMonth(moment(selectedMonth).set({ year: Number(year) }));
  };

  const handleMonthChange = (addOrSubtract) => {
    setSelectedMonth(moment(selectedMonth)[addOrSubtract](1, "month"));
    setNextMonth(moment(nextMonth)[addOrSubtract](1, "month"));
    const startOfMonth = moment(selectedMonth)[addOrSubtract](1, "month").startOf('month');
    const endOfMonth = moment(selectedMonth)[addOrSubtract](1, "month").endOf('month');
    setDateRange([startOfMonth, endOfMonth]);
  };

  const handleDayChange = (newDate, index) => {
    const existingHour = value ? moment(value).hour() : "00";
    const existingMinute = value ? moment(value).minute() : "00";

    const newDateWithExistingTime = newDate.set({
      hour: existingHour,
      minute: existingMinute,
    });

    console.log(index, newDate);
    if (onChange) {
      onChange(formatDateTime(newDateWithExistingTime));
    }
  };
  const handlePrevNext = (type) => {
    switch (type) {
      case "prev-month":
        handleMonthChange("subtract");
        break;
      case "next-month":
        handleMonthChange("add");
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    dispatch(getTdbCommandeByProduct('vente-cva', dateRange[0], dateRange[1], id));
  }, [dateRange]);
  return (
    <>
      <div className="d-flex justify-content-end align-items-center flex-row">
        <DateRangePicker
          locale="fr-FR"
          onChange={setDateRange}
          value={dateRange}
        />
      </div>
      <div className="date_range_container">
        <Calendar
          index={0}
          dt={data}
          id={id}
          dateRange={dateRange}
          month={selectedMonth}
          value={dates}
          handlePrevNext={handlePrevNext}
          setDateRange={setDateRange}
          handleDayChange={handleDayChange}
        />
        {/** <Calendar
             index={1}
             dateRange={dateRange}
             month={nextMonth}
             value={dates}
             handlePrevNext={handlePrevNext}
             setDateRange={setDateRange}
             handleDayChange={handleDayChange}
           />**/}
      </div></>
  );
};

const generateWeekDayNames = (month) => moment.weekdaysMin(true);

const generateFillerDaysBeforeMonthStart = (month) => {
  const count = month.diff(moment(month).startOf("week"), "days");
  return range(count);
};

const generateMonthDays = (selectedMonth) =>
  times(selectedMonth.daysInMonth()).map((i) =>
    moment(selectedMonth).add(i, "days")
  );

const generateFillerDaysAfterMonthEnd = (selectedMonth) => {
  const selectedMonthEnd = moment(selectedMonth).endOf("month");
  const weekEnd = moment(selectedMonthEnd).endOf("week");
  const count = weekEnd.diff(selectedMonthEnd, "days");
  return range(count);
};
const Day = ({ data, date, isToday, isBetween, isAfterToday, isSelected, onClick }) => {
  // ${isToday ? "is_today" : ""}    ${isAfterToday ? "is_after_to_day" : "" }
  console.log(data)

  return (
    <>
      <div
        className={`day ${isSelected ? "is_selected" : ""}`}
        style={{
          paddingLeft: '5px'
        }}
        onClick={() => data != null && onClick(data)}
      >
        <div style={{
          position: 'absolute',
          bottom: 5,
          right: 5,
          width: 20,
          height: 20,
          borderRadius: 20,
          backgroundColor: 'green',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h4 style={{
            color: 'white'
          }}>{formatDate(date, "D")}</h4>
        </div>

        {data != 0 ? (
          <div>
            <p>{data}</p>
          </div>
        ) : (
          <div styl={{
            padding: '15px'
          }}></div>
        )}
      </div>
    </>
  );
};
export default DatePickerDateSection;

export const Calendar = ({
  index,
  month,
  id,
  value,
  dateRange,
  dt,
  handlePrevNext,
  handleDayChange,
}) => {
  console.log('is value', dt);
  let allDates = dt.map(e => e.date);
  const [flag, setFlag] = useBoolean();
  const dispatch = useDispatch();
  const communds = useSelector(getData("commund").value);
  const [data, setData] = useState([]);
  console.log('communs',communds);
  /**useEffect(() => {
    let cmd = [];
    if(communds.length >0){
      communds.map((c,i)=> {
      cmd.push({
        id:c.id,
        contenu: c.contenu
      })
    })
    };
    setState(cmd);
  }, [communds])**/
  return (
    <div className="d-flex flex-row justify-content-space-between">
      <div style={{
        width:flag ? "60%": "100%"
      }}>
        <div className="date_range_title">
        <div className="date_range_flex">
          <button
            className="btn btn-green btn-sm"
            onClick={() => handlePrevNext("prev-month")}
          >Précedent</button>
          <h3>{formatDate(month, "MMM YYYY")}</h3>
          <button
            className="btn btn-green btn-sm"
            onClick={() => handlePrevNext("next-month")}
          >Suivant</button>
        </div>
        <div className="grid_date">
          {generateWeekDayNames(month).map((name) => (
            <div className="day_name" key={name}>
              {name}
            </div>
          ))}
          {generateFillerDaysBeforeMonthStart(month).map((i) => (
            <div className="day" key={`before-${i}`} />
          ))}
          {generateMonthDays(month).map((date) => {
            //let index = allDates.indexOf(formatDateTime(date))
            //console.log('index', index);
            let count = aCount(allDates, formatDateTime(date));
            return (
              <Day
                key={date}
                date={date}
                data={count}
                isBetween={moment().isBetween(dateRange[0], dateRange[1], 'day')}
                isAfterToday={moment().isAfter(moment(date).add(1, "day"))}
                isToday={moment().isSame(date, "day")}
                isSelected={false}
                //  isSelected={value.indexOf(formatDateTime(date)) != -1}
                onClick={() => {
                  if (count > 0) {
                    dispatch(getTdbCommandeByProducts('vente-cva', dateRange[0], dateRange[1], id));
                    setFlag.on();
                  }
                  //handleDayChange(date, index)
                }}
              />
            )
          })}
          {generateFillerDaysAfterMonthEnd(month).map((i) => (
            <div className="day" key={`after-${i}`} />
          ))}
        </div>
      </div>
      </div>
      <div style={{
        width:flag ? "40%": "0%",
        padding:10,
        display: flag ? 'block': 'none'
      }}>
      {communds.length >0 && communds.map((cmd,key) => <div key={key}>
      <EditToFromMag
          data={data}
          setData={setData}
          index={key}
          commandes={cmd}
            />
      </div>)}
        <button onClick={()=>  {
          
          setFlag.off();
          }}>Valider</button>
      </div>
    </div>
  );
};
