
import moment  from 'moment';
/**
 *
 * Filter array by date range
 *
 */
const getByRangeDate = (data, dateKey, startDate, endDate) => {
  return data.filter((d) => {
    var date = new Date(d[dateKey]);
    return moment(date).isBetween(startDate, endDate, "days", "[]");
  });
};

export default getByRangeDate;
