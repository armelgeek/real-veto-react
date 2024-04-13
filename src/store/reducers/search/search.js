import { SET_SEARCH_BY_DATE,RESET_SEARCH_BY_DATE } from "../../constants";
import moment from "moment";

export const searchReducer = (
  state = {
    deb: moment().isoWeekday(1).startOf("week"),
    fin: moment().endOf("week"),
  },
  action
) => {
  switch (action.type) {
    case SET_SEARCH_BY_DATE:
      return  action.payload;
    case RESET_SEARCH_BY_DATE:
      return {
        deb: moment().isoWeekday(1).startOf("week"),
        fin: moment().endOf("week"),
      };
    default:
      return state;
  }
};
