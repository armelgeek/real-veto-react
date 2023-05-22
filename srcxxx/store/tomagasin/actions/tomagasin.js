import {
  ADD_QTY_MAGASIN_ITEM,
  ADD_QTY_NUMBER_MAGASIN_ITEM,
  ADD_TO_MAGASIN,
  CLEAR_MAGASIN,
  MINUS_QTY_MAGASIN_ITEM,
  REMOVE_FROM_MAGASIN,
  SET_TO_MAGASIN_ITEMS,

} from "../constants";

export const setToMagasinItems = (items = []) => ({
  type: SET_TO_MAGASIN_ITEMS,
  payload: items,
});

export const addToMagasin = (product) => ({
  type: ADD_TO_MAGASIN,
  payload: product,
});

export const removeFromMagasin = (id) => ({
  type: REMOVE_FROM_MAGASIN,
  payload: id,
});

export const clearMagasin = () => ({
  type: CLEAR_MAGASIN,
});

export const addQtyMagasinItem = (id) => ({
  type: ADD_QTY_MAGASIN_ITEM,
  payload: { id: id },
});

export const minusQtyMagasinItem = (id) => ({
  type: MINUS_QTY_MAGASIN_ITEM,
  payload: { id: id },
});
export const setQtyMagasinItem =(id,value)=>({
  type : ADD_QTY_NUMBER_MAGASIN_ITEM,
  payload:{
    id:id,
    value:value
  }
}) 