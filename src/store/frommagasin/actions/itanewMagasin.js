import {
  MINUS_QTY_PORTION__DOSE_ITA_NEW_FROM_MAGASIN_ITEM,
  ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_MAGASIN_ITEM,
  ADD_QTY_PORTION_DOSE_SOVAX_FROM_MAGASIN_ITEM,
  MINUS_QTY_PORTION__DOSE_SOVAX_FROM_MAGASIN_ITEM,
  ADD_QTY_PORTION_PHYTO_COND_FROM_MAGASIN_ITEM,
  MINUS_QTY_PORTION_PHYTO_COND_FROM_MAGASIN_ITEM,
} from "../constants";

export const addQtyFromMagasinDoseItem = (id, value) => ({
  type: ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_MAGASIN_ITEM,
  payload: { id: id, value: value },
});

export const addQtyFromMagasinSovaxItem = (id, value) => ({
  type: ADD_QTY_PORTION_DOSE_SOVAX_FROM_MAGASIN_ITEM,
  payload: { id: id, value: value },
});

export const addQtyFromMagasinPhytoCondItem = (id, value) => ({
  type: ADD_QTY_PORTION_PHYTO_COND_FROM_MAGASIN_ITEM,
  payload: {
    id: id,
    value: value,
  },
});
