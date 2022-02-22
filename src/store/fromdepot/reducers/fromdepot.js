import {
  ADD_QTY_FROM_DEPOT_ITEM,
  ADD_FROM_DEPOT,
  CLEAR_FROM_DEPOT,
  MINUS_QTY_FROM_DEPOT_ITEM,
  REMOVE_FROM_TO_DEPOT,
  SET_FROM_DEPOT_ITEMS,
  MINUS_QTY_PORTION_FROM_DEPOT_ITEM,
  ADD_QTY_PORTION_FROM_DEPOT_ITEM,
  ADD_QTY_NUMBER_FROM_DEPOT_ITEM,
  ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_DEPOT_ITEM,
  MINUS_QTY_PORTION__DOSE_ITA_NEW_FROM_DEPOT_ITEM,
  MINUS_QTY_PORTION__DOSE_SOVAX_FROM_DEPOT_ITEM,
  ADD_QTY_PORTION_DOSE_SOVAX_FROM_DEPOT_ITEM,
  ADD_QTY_PORTION_PHYTO_COND_FROM_DEPOT_ITEM,
  MINUS_QTY_PORTION_PHYTO_COND_FROM_DEPOT_ITEM,
} from "../constants";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
  switch (action.type) {
    case SET_FROM_DEPOT_ITEMS:
      return action.payload;
    case ADD_FROM_DEPOT:
      return state.some((product) => product.id === action.payload.id)
        ? state
        : [action.payload, ...state];
    case REMOVE_FROM_TO_DEPOT:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_FROM_DEPOT:
      return [];
    case ADD_QTY_FROM_DEPOT_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProductDepot = Number(action.payload.qtt);
        }
        return product;
      });

    case ADD_QTY_PORTION_FROM_DEPOT_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
            product.qttByCCDepot = Number(action.payload.value);
        }

        return product;
      });
      id;
    case ADD_QTY_NUMBER_FROM_DEPOT_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.quantityParProductDepot = Number(action.payload.value);
        }
        return product;
      });
    case ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_DEPOT_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.qttyspecificmirrordepot = Number(action.payload.value);
          product.qttByCCDepot = action.payload.value * 1 / 2;
        }
        return product;
      });

    case ADD_QTY_PORTION_DOSE_SOVAX_FROM_DEPOT_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.qttyspecificmirrordepot = Number(action.payload.value);
          product.qttByCCDepot = (action.payload.value * 1) * 2;
        }
        return product;
      });
    case ADD_QTY_PORTION_PHYTO_COND_FROM_DEPOT_ITEM:
      return state.map((product) => {
        if (product.id == action.payload.id) {
          product.qttByCCDepot = Number(action.payload.value);
        }
        return product;
      });
    case MINUS_QTY_PORTION_PHYTO_COND_FROM_DEPOT_ITEM:
      return state.map((product) => {
        if (product.id === action.payload.id) {
          product.qttByCCDepot -= action.payload.qttccpventedepot;
        }
        return product;
      });
    default:
      return state;
  }
};
