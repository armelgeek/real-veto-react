import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { action, getData } from "../../../../utils/lib/call";
import EditFromDepotItem from "./EditItem";
import { useDispatch } from 'react-redux';
const EditToFromMag = ({
  data,
  setData,
  date,
  index,
  commandes,
}) => {
  const dispatch = useDispatch();
  //const [state,setState] = useState(commandes?.contenu);
   console.log('item',index,commandes);
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
        <div className="commande-vente">
              {commandes?.map((product, i) => (
                <>
                <p>{i}</p>
                </>
                ))}
        </div>
    </>
  );
};

export default EditToFromMag;
