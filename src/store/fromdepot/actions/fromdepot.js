import {
  ADD_QTY_FROM_DEPOT_ITEM,
  ADD_FROM_DEPOT,
  CLEAR_FROM_DEPOT,
  MINUS_QTY_FROM_DEPOT_ITEM,
  REMOVE_FROM_TO_DEPOT,
  SET_FROM_DEPOT_ITEMS,
  ADD_QTY_PORTION_FROM_DEPOT_ITEM,
  MINUS_QTY_PORTION_FROM_DEPOT_ITEM,
  ADD_QTY_NUMBER_FROM_DEPOT_ITEM,
} from "../constants";

export const setFromDepotItems = (items = []) => ({
  type: SET_FROM_DEPOT_ITEMS,
  payload: items,
});

export const addFromDepot = (product) => ({
  type: ADD_FROM_DEPOT,
  payload: product,
});

export const removeFromDepot = (id) => ({
  type: REMOVE_FROM_TO_DEPOT,
  payload: id,
});

export const clearFromDepot = () => ({
  type: CLEAR_FROM_DEPOT,
});

export const addQtyFromDepotItem = (id, qtt) => ({
  type: ADD_QTY_FROM_DEPOT_ITEM,
  payload: { id: id, qtt: qtt },
});

export const setQtyFromDepotItem = (id, value) => ({
  type: ADD_QTY_NUMBER_FROM_DEPOT_ITEM,
  payload: {
    id: id,
    value: value,
  },
});
export const minusQtyFromDepotItem = (id) => ({
  type: MINUS_QTY_FROM_DEPOT_ITEM,
  payload: { id: id },
});

export const addQtyFromDepotPortionItem = (id, value) => ({
  type: ADD_QTY_PORTION_FROM_DEPOT_ITEM,
  payload: { id: id, value: value },
});

export const minusQtyFromDepotPortionItem = (id) => ({
  type: MINUS_QTY_PORTION_FROM_DEPOT_ITEM,
  payload: { id: id },
});
