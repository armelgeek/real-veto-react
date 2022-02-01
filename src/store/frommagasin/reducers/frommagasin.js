import {
  ADD_QTY_FROM_MAGASIN_ITEM,
  ADD_FROM_MAGASIN,
  CLEAR_FROM_MAGASIN,
  MINUS_QTY_FROM_MAGASIN_ITEM,
  REMOVE_FROM_TO_MAGASIN,
  SET_FROM_MAGASIN_ITEMS,
  MINUS_QTY_PORTION_FROM_MAGASIN_ITEM,
  ADD_QTY_PORTION_FROM_MAGASIN_ITEM,
  ADD_QTY_NUMBER_FROM_MAGASIN_ITEM,
  ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_MAGASIN_ITEM,
  MINUS_QTY_PORTION__DOSE_ITA_NEW_FROM_MAGASIN_ITEM,
  MINUS_QTY_PORTION__DOSE_SOVAX_FROM_MAGASIN_ITEM,
  ADD_QTY_PORTION_DOSE_SOVAX_FROM_MAGASIN_ITEM,
  ADD_QTY_PORTION_PHYTO_COND_FROM_MAGASIN_ITEM,
  MINUS_QTY_PORTION_PHYTO_COND_FROM_MAGASIN_ITEM,
} from "../constants";
import {
  handleMinusProduct,
  handleSoldQuantityCC,
} from "../../functions/function";
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case SET_FROM_MAGASIN_ITEMS:
      return action.payload;
    case ADD_FROM_MAGASIN:
      return state.some((product) => product.id === action.payload.id)
        ? state
        : [action.payload, ...state];
    case REMOVE_FROM_TO_MAGASIN:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_FROM_MAGASIN:
      return [];
    case ADD_QTY_FROM_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProduct = Number(action.payload.qtt);
        }
        return product;
      });

    case ADD_QTY_PORTION_FROM_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
            product.qttByCC = Number(action.payload.value);
        }

        return product;
      });
      id;
    case ADD_QTY_NUMBER_FROM_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProduct = Number(action.payload.value);
        }
        return product;
      });
    case ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.qttyspecificmirror = Number(action.payload.value);
          product.qttByCC = action.payload.value * 1 / 2;
        }
        return product;
      });

    case ADD_QTY_PORTION_DOSE_SOVAX_FROM_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.qttyspecificmirror = Number(action.payload.value);
          product.qttByCC = (action.payload.value * 1) * 2;
        }
        return product;
      });
    case ADD_QTY_PORTION_PHYTO_COND_FROM_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.qttByCC = Number(action.payload.value);
        }
        return product;
      });
    case MINUS_QTY_PORTION_PHYTO_COND_FROM_MAGASIN_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.qttByCC -= action.payload.qttccpvente;
        }
        return product;
      });
    default:
      return state;
  }
};
