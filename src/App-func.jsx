import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import ContentHeader from "./@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "./@adminlte/adminlte/Content/ActiveLink";
import Content from "./@adminlte/adminlte/Content";
import Page from "./@adminlte/adminlte/Content/Page";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { displayDate } from "./utils/functions";
import NameOfDay from "./components/composants/journal/NameOfDay";
import DateInterval from "./components/composants/journal/DateInterval";
import Journal from "./components/composants/Journal";
import Items from "./components/composants/journal/Items";
function App() {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [rangeDate, setRangeDate] = useState([]);
  const [rangeMonth, setRangeMonth] = useState([]);
  const [debut, setDebut] = useState({});
  const [fin, setFin] = useState({});
  const [focusedInput, setFocusedInput] = useState(null);
  let [startofDate, setStartofDate] = useState(start);
  let [endDate, setEndDate] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  let getAllMonthBetweenDates = (startDate, endDate) => {
    const months = [];
    while (endDate.diff(startDate, "months") >= 0) {
      months.push(startDate.format("MMMM YYYY"));
      startDate.add(1, "month");
    }
    return months;
  };
  let getDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone(),
      dates = [];
    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };
  useEffect(() => {
    if (startofDate && endDate) {
      setRangeDate(getDaysBetweenDates(startofDate, endDate));
      setRangeMonth(getAllMonthBetweenDates(startofDate, endDate));
    }
  }, [startofDate, endDate]);
  return (
    <>
      <Content>
        <ContentHeader title="Journal de sortie">
          <ActiveLink title="Journal de sortie"></ActiveLink>
        </ContentHeader>
        <Page>
          {startofDate && endDate && (
            <span>
              {displayDate(startofDate)} -- {displayDate(endDate)}
            </span>
          )}{" "}
          <div className="range-date">
            Etat des stocks à jour au :
            <DateRangePicker
              locale="fr-FR"
              minDate={new Date("27-11-2021")}
              onChange={onChangeDateRange}
              value={dateRange}
            />
            <div className="export">
              {/*<table id="rapport" className="table table-striped" border={1}>
                <thead>
                  {" "}
                  <>
                  
                  </>
                </thead>
                <tbody>
                <td
                    className=" bg-primary text-white text-center text-uppercase"
                    colSpan={3}
                  >
                    Product
                  </td>
                  <td
                    className=" bg-primary text-white text-center text-uppercase"
                    colSpan={3}
                  >
                    Product
                  </td>
                  <td
                    className=" bg-primary text-white text-center text-uppercase"
                    colSpan={3}
                  >
                    Product
                  </td>
                  <tr className="text-center text-uppercase">
                    {rangeDate.map((r) => (
                      <>
                      <tr>
                        <div class="d-flex flex-column ">
                          <NameOfDay date={r} />
                          <DateInterval date={r} />
                          <Items date={r} />
                          <Items date={r} />
                          <Items date={r} />
                          <Items date={r} />
                        </div>
                        </tr>

                      </>
                    ))}
                  </tr>
                </tbody>
              </table>*/}

              <table class="table">
                <tr>
                    <td>Produit</td>
                    {rangeDate.map((r) => (
                    <>
                      <DateInterval date={r} />
                    </>
                    ))}
                    <td >INV</td>
                  </tr>
                  <tr>
                    <td  className="bg-gray" >Closantel</td>
                    {rangeDate.map((r) => (
                      <Items date={r} />
                    ))}
                    <td >20</td>
                  </tr>
                  <tr>
                    <td className="bg-gray">Closantel</td>
                    {rangeDate.map((r) => (
                      <Items date={r} />
                    ))}
                    <td >20</td>
                  </tr>
             
              </table>
            </div>
          </div>
        </Page>
      </Content>
    </>
  );
}

export default App;
