import {
  ADD_QTY_FROM_MAGASIN_ITEM,
  ADD_FROM_MAGASIN,
  CLEAR_FROM_MAGASIN,
  MINUS_QTY_FROM_MAGASIN_ITEM,
  REMOVE_FROM_TO_MAGASIN,
  SET_FROM_MAGASIN_ITEMS,
  ADD_QTY_PORTION_FROM_MAGASIN_ITEM,
  MINUS_QTY_PORTION_FROM_MAGASIN_ITEM,
  ADD_QTY_NUMBER_FROM_MAGASIN_ITEM,
} from "../constants";

export const setFromMagasinItems = (items = []) => ({
  type: SET_FROM_MAGASIN_ITEMS,
  payload: items,
});

export const addFromMagasin = (product) => ({
  type: ADD_FROM_MAGASIN,
  payload: product,
});

export const removeFromMagasin = (id) => ({
  type: REMOVE_FROM_TO_MAGASIN,
  payload: id,
});

export const clearFromMagasin = () => ({
  type: CLEAR_FROM_MAGASIN,
});

export const addQtyFromMagasinItem = (id, qtt) => ({
  type: ADD_QTY_FROM_MAGASIN_ITEM,
  payload: { id: id, qtt: qtt },
});

export const setQtyFromMagasinItem = (id, value) => ({
  type: ADD_QTY_NUMBER_FROM_MAGASIN_ITEM,
  payload: {
    id: id,
    value: value,
  },
});
export const minusQtyFromMagasinItem = (id) => ({
  type: MINUS_QTY_FROM_MAGASIN_ITEM,
  payload: { id: id },
});

export const addQtyFromMagasinPortionItem = (id, value) => ({
  type: ADD_QTY_PORTION_FROM_MAGASIN_ITEM,
  payload: { id: id, value: value },
});

export const minusQtyFromMagasinPortionItem = (id) => ({
  type: MINUS_QTY_PORTION_FROM_MAGASIN_ITEM,
  payload: { id: id },
});
