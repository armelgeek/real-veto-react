import React from 'react';
import { useDispatch } from 'react-redux';
import { addQtyPortionItem, minusQtyPortionItem } from '../../../store/basket/actions/basket';
const BasketItemPartial = ({ product }) => {
  const dispatch = useDispatch();
  const onAddQty = () => {
      dispatch(addQtyPortionItem(product.id));
  };

  const onMinusQty = () => {
      dispatch(minusQtyPortionItem(product.id));
  };

  return (
    <div className="basket-item-control">
      <button
        className="btn btn-dark btn-sm"
        onClick={onAddQty}
        type="button"
      >
        +
      </button>
      {product.qttByCC}
      <button
        className="btn btn-dark btn-sm"
        disabled={product.qttByCC === 0}
        onClick={onMinusQty}
        type="button"
      >
        -
      </button>
    </div>
  );
};
export default BasketItemPartial;
