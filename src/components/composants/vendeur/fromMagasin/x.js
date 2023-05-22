import React, { useEffect, useState } from "react";
import EditFromDepotItem from "./EditItem";
import { useDispatch } from 'react-redux';
const EditToFromMag = ({
  data,
  setData,
  date,
  index,
  id,
  commandes,
}) => {
  const [state, setState] = useState(commandes);
  console.log('item', id, commandes);
  /**const onCheckOut = () => {
    if(state.length >0){
      dispatch(
        action("commandes").updateTransaction(
          {
            id: commandes?.id,
            contenu: state
          },
          "update-price-from-magasin"
        )
      )};
    //  history.push(HISTORIQUEVENTEVENDEUR)
  };**/

  return (
    <>
    {JSON.stringify(state)}
      <div className="commande-vente">
        {commandes?.map((product, i) => (
          <>
            <EditFromDepotItem
              key={`${product?.id}_${i}`}
              product={product}
              update={update}
              index={i}
              id={id}
              state={state}
              setState={setState}
            />
          </>
        ))}
        <div className="d-flex text-right align-items-end justify-content-end">
          <button
            className="btn btn-green btn-sm mr-2"
            onClick={() => console.log('hdd')}
            type="button"
          >
            Valider
          </button>
        </div>
      </div>
    </>
  );
};

export default EditToFromMag;
