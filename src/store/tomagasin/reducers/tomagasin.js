import {
  ADD_QTY_MAGASIN_ITEM,
  ADD_QTY_NUMBER_MAGASIN_ITEM,
  ADD_TO_MAGASIN,
  CLEAR_MAGASIN,
  MINUS_QTY_MAGASIN_ITEM,
  REMOVE_FROM_MAGASIN,
  SET_TO_MAGASIN_ITEMS,
} from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case SET_TO_MAGASIN_ITEMS:
      return action.payload;
    case ADD_TO_MAGASIN:
      return state.some((product) => product.id === action.payload.id)
        ? state
        : [action.payload, ...state];
    case REMOVE_FROM_MAGASIN:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_MAGASIN:
      return [];
    case ADD_QTY_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProduct += 1;
        }
        return product;
      });

    // eslint-disable-next-line no-duplicate-case
    case ADD_QTY_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProduct = Number(action.payload.qtt);
        }
        return product;
      });
    case MINUS_QTY_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProduct -= 1;
        }
        return product;
      });
      
      case ADD_QTY_NUMBER_MAGASIN_ITEM:
        return state.map((product) => {
          if (product.id === action.payload.id) {
            product.quantityParProduct = action.payload.value;
          }
          return product;
        });
    default:
      return state;
  }
};
