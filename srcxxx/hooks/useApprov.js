import { useDispatch, useSelector } from 'react-redux';
import { addToApprov as dispatchAddToApprov, removeFromApprov } from '../store/approvis/actions/approvis';

const useApprov = (approvisionnement,dispatch) => {
  const isItemOnApprov = (id) => !!approvisionnement?.find(item => item?.id === id);
  const addToApprov = (product) => {
    if (isItemOnApprov(product.id)) {
      dispatch(removeFromApprov(product.id));
    } else {
      dispatch(dispatchAddToApprov(product));
    }
  };
  return { approvisionnement, isItemOnApprov, addToApprov };
};

export default useApprov;
