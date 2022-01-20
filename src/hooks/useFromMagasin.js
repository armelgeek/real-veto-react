import {
  addFromMagasin as dispatchAddFromMagasin,
  removeFromMagasin,
} from "../store/frommagasin/actions/frommagasin";
const useFromMagasin = (frommagasin, dispatch) => {
  const isItemFromMagasin = (id) =>
    !!frommagasin?.find((item) => item?.id === id);
  const addFromMagasin = (product) => {
    if (isItemFromMagasin(product.id)) {
      dispatch(removeFromMagasin(product.id));
    } else {
      dispatch(dispatchAddFromMagasin(product));
    }
  };
  return { frommagasin, isItemFromMagasin, addFromMagasin };
};

export default useFromMagasin;
