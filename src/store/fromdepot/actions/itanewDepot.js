import {
  MINUS_QTY_PORTION__DOSE_ITA_NEW_FROM_DEPOT_ITEM,
  ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_DEPOT_ITEM,
  ADD_QTY_PORTION_DOSE_SOVAX_FROM_DEPOT_ITEM,
  MINUS_QTY_PORTION__DOSE_SOVAX_FROM_DEPOT_ITEM,
  ADD_QTY_PORTION_PHYTO_COND_FROM_DEPOT_ITEM,
  MINUS_QTY_PORTION_PHYTO_COND_FROM_DEPOT_ITEM,
} from "../constants";

export const addQtyFromDepotDoseItem = (id, value) => ({
  type: ADD_QTY_PORTION_DOSE_UTA_NEW_FROM_DEPOT_ITEM,
  payload: { id: id, value: value },
});

export const addQtyFromDepotSovaxItem = (id, value) => ({
  type: ADD_QTY_PORTION_DOSE_SOVAX_FROM_DEPOT_ITEM,
  payload: { id: id, value: value },
});

export const addQtyFromDepotPhytoCondItem = (id, value) => ({
  type: ADD_QTY_PORTION_PHYTO_COND_FROM_DEPOT_ITEM,
  payload: {
    id: id,
    value: value,
  },
});
