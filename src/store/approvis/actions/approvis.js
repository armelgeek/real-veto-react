import {
  ADD_QTY_APPROV_ITEM,
  ADD_TO_APPROV,
  CRETATE_FACTURE,
  CLEAR_APPROV,
  MINUS_QTY_APPROV_ITEM,
  REMOVE_FROM_APPROV,
  SET_APPROV_ITEMS,
  ADD_NUMBER_QTY_ITEM,
  ADD_QTY_NUMBER_APPROV_ITEM
} from "../constants";




export const setApprovItems = (items = []) => ({
  type: SET_APPROV_ITEMS,
  payload: items ,
});

export const addToApprov = (product) => ({
  type: ADD_TO_APPROV,
  payload: product,
});

export const removeFromApprov = (id) => ({
  type: REMOVE_FROM_APPROV,
  payload: id,
});

export const clearApprov = () => ({
  type: CLEAR_APPROV,
});

export const addQtyApprovItem = (id) => ({
  type: ADD_QTY_APPROV_ITEM,
  payload: { id: id},
});
export const addNumberQtyItem = (id,qtt) => ({
  type: ADD_NUMBER_QTY_ITEM,
  payload: { id: id,qtt:qtt},
});


export const minusQtyApprovItem = (id) => ({
  type: MINUS_QTY_APPROV_ITEM,
  payload: { id: id },
});
export const setQtyApprovItem =(id,value)=>({
  type : ADD_QTY_NUMBER_APPROV_ITEM,
  payload:{
    id:id,
    value:value
  }
}) 