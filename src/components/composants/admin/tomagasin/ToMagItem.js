import React from "react";
import { useDispatch } from "react-redux";
import { displayMoney } from "../../../../utils/functions";
import ToMagItemControl from './ToMagItemControl';
const ToMagItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () =>{
     //dispatch(removeFromBasket(product.id))
    };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
        <div style={{ width: "45%" }}>
          <p>
            {product.name}
          </p>
          <span><strong> {displayMoney(product.prixVente)}</strong></span>
        </div>
        <div className="text-inline">
          <small>{ product.type} </small>

          <ToMagItemControl product={product} />
        </div>
      {/**  <div>
          <small>CC </small>
          <BasketItemPartial product={product} />
        </div> */}
      </div>
    </div>
  );
};

export default ToMagItem;
