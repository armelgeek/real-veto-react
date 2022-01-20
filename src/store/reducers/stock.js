import { UPDATE_STOCK_REQUEST_FAIL, UPDATE_STOCK_REQUEST_SUCCESS } from "../../constants/actions";

export default (state = [], action) => {
  const { type, payload } = action;
  switch (action.type) {
    case UPDATE_STOCK_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
      break;
    case UPDATE_STOCK_REQUEST_FAIL:
      return payload;
      break;
    default:
      return state;
  }
};
