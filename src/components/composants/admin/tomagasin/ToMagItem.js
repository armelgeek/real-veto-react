import React from "react";
import { useDispatch,useSelector } from "react-redux";
import useDepotToMagasin from "../../../../hooks/useDepotToMagasin";
import { displayMoney } from "../../../../utils/functions";
import ToMagItemControl from './ToMagItemControl';
const ToMagItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () =>{
     //dispatch(removeFromBasket(product.id))
    };
    const tomagasin = useSelector((state) => state.tomagasins);
    const { isItemOnDepotToMagasin, addToMagasin } = useDepotToMagasin(
      tomagasin,
      dispatch
    );
    const itemOnBasket = isItemOnDepotToMagasin
      ? isItemOnDepotToMagasin(product.id)
      : false;
  
    const handleAddToBasket = () => {
      if (addToMagasin) addToMagasin(product);
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
        <div>
        {itemOnBasket && (
          <button
            onClick={handleAddToBasket}
            className="btn btn-danger btn-xs text-right"
          >
            X
          </button>
        )}
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
