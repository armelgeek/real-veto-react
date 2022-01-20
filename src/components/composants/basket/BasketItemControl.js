import React from 'react';
import { useDispatch } from 'react-redux';
import { addQtyItem, minusQtyItem } from '../../../store/basket/actions/basket';

const BasketItemControl = ({ product }) => {
  const dispatch = useDispatch();
  const onAddQty = () => {
      dispatch(addQtyItem(product.id));
  };

  const onMinusQty = () => {
 
  //  if ((product.quantityBrute >= product.quantityParProduct) && product.quantityParProduct !== 0) {
      dispatch(minusQtyItem(product.id));
   // }
  };

  return (
    <div className="basket-item-control">
      <button
        className="btn btn-dark btn-sm"
        disabled={product.quantityBrute === product.quantityParProduct}
        onClick={onAddQty}
        type="button"
      >
        +
      </button>
      {product.quantityParProduct}
      <button
         className="btn btn-dark btn-sm"
        disabled={product.quantityParProduct === 0}
        onClick={onMinusQty}
        type="button"
      >
        -
      </button>
    </div>
  );
};
export default BasketItemControl;
