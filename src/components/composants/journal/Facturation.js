import React, { useState, useEffect } from "react";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import Content from "../../../@adminlte/adminlte/Content";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getApprov, getApprovData } from "../../../store/actions/approv";
import { getData } from "../../../utils/lib/call";
import flatify from "../../../filters/flatify";
import getByRangeDate from "../../../filters/getByRangeDate";
import { displayDate } from "../../../utils/functions";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import DateInterval from "./DateInterval";
import ItemsApprov from "./ItemsApprov";
import NoItemsApprov from "./NoItemsApprov";
import LastStockApprov from "./LastStockApprov";
import { MenuTdb } from "./MenuTdb";
export const groupBy = (array, key, subkey) => {
  return array.reduce((result, currentValue) => {
    if (!subkey) {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
    } else {
      (result[currentValue[key][subkey]] =
        result[currentValue[key][subkey]] || []).push(currentValue);
    }
    return result;
  }, {});
};
function last(array) {
  return array[array.length - 1];
}
export const Facturation = () => {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [rangeDate, setRangeDate] = useState([]);
  const [rangeMonth, setRangeMonth] = useState([]);
  let [startofDate, setStartofDate] = useState(start);
  let [endDate, setEndDate] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  const [byDateProduct, setByDateProduct] = useState([]);
  const [result, setResult] = useState([]);
  const approvis = useSelector(getData("approvis").value);
  const meta = useSelector(getData("approvis").meta);
  const dispatch = useDispatch();

  let getAllMonthBetweenDates = (startDate, endDate) => {
    const months = [];
    while (endDate.diff(startDate, "months") >= 0) {
      months.push(startDate.format("MMMM YYYY"));
      startDate.add(1, "month");
    }
    return months;
  };
  let getDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone();
    const dates = [];
    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("YYYY-MM-DD"));
      now.add(1, "days");
    }
    return dates;
  };

  useEffect(() => {
    if (dateRange !== null) {
      if (dateRange[0]) {
        setStartofDate(dateRange[0]);
      }
      if (dateRange[0]) {
        setEndDate(dateRange[1]);
      }
    } else {
      setStartofDate(start);
      setEndDate(end);
    }
  }, [dateRange]);

  useEffect(() => {
    if (startofDate && endDate) {
      setRangeDate(getDaysBetweenDates(moment(startofDate), moment(endDate)));
      setRangeMonth(
        getAllMonthBetweenDates(moment(startofDate), moment(endDate))
      );
      dispatch(getApprovData(startofDate, endDate));
    }
  }, [startofDate, endDate]);
  useEffect(() => {
    if (!meta.isFetching) {
      setByDateProduct(
        getByRangeDate(approvis, "dateApprov", startofDate, endDate)
      );
    }
  }, [meta]);
  let rs = flatify(byDateProduct, "contenu");
  let res = rs
    .reduce(
      (r, { id, name, type, category, fournisseur,quantityBrute,quantityCC, quantityParProduct }) => {
        var temp = r.find((o) => o.id === id);
        if (!temp) {
          r.push({
            id,
            name,
            type,
            category,
            fournisseur,
            quantityBrute,
            quantityCC,
            quantityParProduct,
          });
        } else {
          temp.quantityParProduct =
            parseInt(temp.quantityParProduct) + parseInt(quantityParProduct);
        }
        return r;
      },
      []
    )
    .sort(function (a, b) {
      return a.id > b.id;
    });
  const flato = (data, attribute) => {
    return [...new Set([].concat(...data.map((o) => o[attribute])))];
  };

  const groupedBasket = groupBy(byDateProduct, "dateApprov");
  return (
    <Content>
      <ContentHeader title="Journal de facturation">
        <ActiveLink title="Journal de facturation"></ActiveLink>
      </ContentHeader>
      <Page>
      <MenuTdb/>
        <div className="date-range">
          <div className="d-flex justify-content-between my-3">
            <div>
              {startofDate && endDate && (
                <>
                  <h2 className="text-uppercase my-1">Journal de facturation </h2>
                  <span>
                    Du: {displayDate(startofDate)} Au {displayDate(endDate)}
                  </span>
                </>
              )}{" "}
            </div>
            <div>
              <DateRangePicker
                locale="fr-FR"
                onChange={onChangeDateRange}
                value={dateRange}
              />
            </div>
          </div>
          <div className="bg-white py-3 px-2 mb-2">
            <div className="table-responsive">
              <table className="table">
                <tr className="sticky-this">
                  <td>Produit</td>
                  {rangeDate.map((r) => (
                    <>
                      <DateInterval date={r} />
                    </>
                  ))}
                  <td className="bg-thead text-uppercase text-center">Total</td>
                  <td className="bg-thead text-uppercase text-center">Stock</td>
                </tr>
                {res.map((b) => (
                  <>
                    <tr className="bg-white">
                      <td className="bg-thead">{b.name}</td>
                      {rangeDate.map((r) => (
                        <>
                          {groupedBasket[r] != undefined ? (
                            <ItemsApprov
                              flat={flato(groupedBasket[r], "contenu")}
                              gr={r}
                              id={b.id}
                            />
                          ) : (
                            <NoItemsApprov />
                          )}
                        </>
                      ))}
                      <td className="text-center">{b.quantityParProduct}</td>

                      <LastStockApprov
                        flat={flato(
                          groupedBasket[last(Object.keys(groupedBasket))],
                          "contenu"
                        )}
                        gr={last(Object.keys(groupedBasket))}
                        id={b.id}
                      />
                    </tr>
                  </>
                ))}
                {res.length == 0 && (
                  <tr>
                    <td className="text-center" colSpan={rangeDate.length + 3}>
                      Aucune enregistrement trouvé
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div>{" "}
        </div>
      </Page>
    </Content>
  );
};
