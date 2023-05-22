import {
  ADD_QTY_ITEM,
  ADD_TO_BASKET,
  CLEAR_BASKET,
  MINUS_QTY_ITEM,
  REMOVE_FROM_BASKET,
  SET_BASKET_ITEMS,
  ADD_QTY_PORTION_ITEM,
  MINUS_QTY_PORTION_ITEM,
} from "../constants";
const indexSameProduct = (state, product) => {
  const sameProduct = (p) => p.id === product.id;
  return state.find(sameProduct);
};
export default (state = [], action) => {
  switch (action.type) {
    case SET_BASKET_ITEMS:
      return action.payload;
    case ADD_TO_BASKET:
      return state.some((product) => product.id === action.payload.id)
        ? state
        : [action.payload, ...state];
    case REMOVE_FROM_BASKET:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_BASKET:
      return [];
    case ADD_QTY_ITEM:
      /*   return state.map((product) => {
        const filteredProduct = indexSameProduct(state, product);
      }*/
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.quantityParProduct += 1;
        }
        if (
          product.id == action.payload.id &&
          product.doseRestantEnMg >= product.doseDefault * 1000
        ) {
          product.doseRestantEnMg += product.doseDefault * 1000;
        } else {
          product.doseRestantEnMg = product.doseRestantEnMg;
        }
        return product;
      });

    case ADD_QTY_PORTION_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.qttByCC += 1;
        }
        if (
          product.id == action.payload.id &&
          product.doseRestantEnMg >= product.doseDefault * 1000
        ) {
          product.doseRestantEnMg += 1000;
        } else {
          product.doseRestantEnMg = product.doseRestantEnMg;
        }

        return product;
      });
    case MINUS_QTY_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.quantityParProduct -= 1;
        }
        if (
          product.id == action.payload.id &&
          product.doseRestantEnMg >= product.doseDefault * 1000
        ) {
          product.doseRestantEnMg -= product.doseDefault * 1000;
        } else {
          product.doseRestantEnMg = product.doseRestantEnMg;
        }
        return product;
      });
    case MINUS_QTY_PORTION_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.qttByCC -= 1;
        }
        if (
          product.id == action.payload.id &&
          product.doseRestantEnMg >= product.doseDefault
        ) {
          product.doseRestantEnMg -= 1000;
        } else {
          product.doseRestantEnMg = product.doseRestantEnMg;
        }
        return product;
      });
    default:
      return state;
  }
};
