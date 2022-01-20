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
import { DateRangePicker } from "react-dates";
import { displayDate } from "./utils/functions";
import NameOfDay from "./components/composants/journal/NameOfDay";
import DateInterval from "./components/composants/journal/DateInterval";
import Journal from "./components/composants/Journal";
import { vetoProducts } from "./data/product";
import useMergeState from "./hooks/mergeState";
import { xor } from "lodash";
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

  const startDateId = `app_start_date_id_1`;
  const endDateId = `app_end_date_id_1`;
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
  let data = {
    rows: [],
  };
  const [marray, mergeArray] = useMergeState(data);
  const { rows } = marray;
  var a = [
    {
      id: 1,
      contenu: [
        { id: 14, qqt: 20 },
        { id: 12, qtt: 10 },
      ],
    },
    { id: 2, contenu: [{ id: 12, qqt: 2 }] },
  ];
  var tmp = [];
  a.map(v => console.log(v.id))
  return (
    <>

      <Content>
        {/**<button onClick={()=> mergeArray({ rows: xor(rows, []) })}>Merge</button>**/}
      </Content>
      {/**<Journal/>**/}
      {/**  <Content>
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
              startDate={startofDate}
              endDate={endDate}
              className="form-control"
              onDatesChange={({ startDate, endDate }) => {
                setStartofDate(startDate);
                setEndDate(endDate);
              }}
              focusedInput={focusedInput}
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
              displayFormat="YYYY-MM-DD"
              small
            />
            <div className="export">
              <table id="rapport" border={1}>
                <thead>
                  <tr className="text-center text-uppercase">
                    <td>J</td>
                    <td>Date</td>
                    <td>Produit</td>
                  </tr>
                </thead>
                <tbody>
                  {rangeDate.map((r) => (
                    <>
                      <tr>
                        <NameOfDay date={r} />
                        <DateInterval date={r} />
                        <td>Date</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Page>
      </Content> */}
    </>
  );
}

export default App;
