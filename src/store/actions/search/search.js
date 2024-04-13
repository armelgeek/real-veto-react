import { RESET_SEARCH_BY_DATE, SET_SEARCH_BY_DATE } from "../../constants";
export const setSearchByDate = (deb, fin) => ({
  type: SET_SEARCH_BY_DATE,
  payload: {
    deb: deb,
    fin: fin,
  },
});

export const resetSearchByDate = (deb, fin) => ({
  type: RESET_SEARCH_BY_DATE,
});
