import { useDispatch, useSelector } from 'react-redux';
import { addToBasket as dispatchAddToBasket, removeFromBasket } from '../store/basket/actions/basket';

const useBasket = (basket,dispatch) => {
  const isItemOnBasket = (id) => !!basket?.find(item => item?.id === id);
  const addToBasket = (product) => {
    if (isItemOnBasket(product.id)) {
      dispatch(removeFromBasket(product.id));
    } else {
      dispatch(dispatchAddToBasket(product));
    }
  };
  return { basket, isItemOnBasket, addToBasket };
};

export default useBasket;
