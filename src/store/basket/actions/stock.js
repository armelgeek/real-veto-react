import axios from "axios";
import {
  UPDATE_STOCK_REQUEST_FAIL,
  UPDATE_STOCK_REQUEST_SUCCESS,
} from "../../../constants/actions";

export const updateStockSuccess =
  (id, newStockBrute, newStockCC) => async (dispatch) => {

  try {
    const res = await axios.post("http://192.168.1.1:8100/api/update-product", {
      productId: id,
      newStockBrute: newStockBrute,
      newStockCC: newStockCC,
    });
    dispatch({
      type: UPDATE_STOCK_REQUEST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_STOCK_REQUEST_FAIL,
      payload: err,
    });
  }
};
