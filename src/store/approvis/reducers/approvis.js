import {
  ADD_NUMBER_QTY_ITEM,
  ADD_QTY_APPROV_ITEM,
  ADD_QTY_NUMBER_APPROV_ITEM,
  ADD_TO_APPROV,
  CLEAR_APPROV,
  MINUS_QTY_APPROV_ITEM,
  REMOVE_FROM_APPROV,
  SET_APPROV_ITEMS,
  ADD_REMISE_PER_PRODUCT,ADD_REMISE_PER_PRODUCT_PERCENT
} from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case SET_APPROV_ITEMS:
      return action.payload;
    case ADD_TO_APPROV:
      return state.some((product) => product.id === action.payload.id)
        ? state
        : [action.payload, ...state];
    case REMOVE_FROM_APPROV:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_APPROV:
      return [];
    case ADD_QTY_APPROV_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.quantityParProduct += 1;
        }
        return product;
      });

    case ADD_NUMBER_QTY_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.quantityParProduct = Number(action.payload.qtt);
        }
        return product;
      });
    case MINUS_QTY_APPROV_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.quantityParProduct -= 1;
        }
        return product;
      });
    case ADD_QTY_NUMBER_APPROV_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProduct = action.payload.value;
        }
        return product;
      });
    case ADD_REMISE_PER_PRODUCT:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.remise = action.payload.value;
        }
        return product;
      });
    case ADD_REMISE_PER_PRODUCT_PERCENT:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.remisePerProduct = action.payload.value;
        }
        return product;
      });
    default:
      return state;
  }
};
