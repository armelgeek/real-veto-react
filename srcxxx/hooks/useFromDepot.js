import {
  addFromDepot as dispatchAddFromDepot,
  removeFromDepot,
} from "../store/fromdepot/actions/fromdepot";

const useFromDepot = (fromdepot, dispatch) => {
  const isItemFromDepot = (id) => !!fromdepot?.find((item) => item?.id === id);
  const addFromDepot = (product) => {
    if (isItemFromDepot(product.id)) {
      dispatch(removeFromDepot(product.id));
    } else {
      dispatch(dispatchAddFromDepot(product));
    }
  };
  return { fromdepot, isItemFromDepot, addFromDepot };
};

export default useFromDepot;
