import {
  addToMagasin as dispatchAddToMagasin,
  removeFromMagasin,
} from "../store/tomagasin/actions/tomagasin";
const useDepotToMagasin = (tomagasin, dispatch) => {
  const isItemOnDepotToMagasin = (id) =>
    !!tomagasin?.find((item) => item?.id === id);
  const addToMagasin = (product) => {
    if (isItemOnDepotToMagasin(product.id)) {
      dispatch(removeFromMagasin(product.id));
    } else {
      dispatch(dispatchAddToMagasin(product));
    }
  };
  return { tomagasin, isItemOnDepotToMagasin, addToMagasin };
};

export default useDepotToMagasin;
