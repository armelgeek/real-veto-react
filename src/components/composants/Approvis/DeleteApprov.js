import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { action } from "../../../utils/lib/call";
function DeleteApprov({ model, entity }) {
  const dispatch = useDispatch();
  const deleteEntity = () => {
    dispatch(action(model).deleteTransaction(entity, "/delete-facture"));
   // window.location.reload();
  };
  return (
    <>
      <button
        className="btn btn-danger btn-sm"
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm(`Vous voulez vraiment supprimer ce facture ?`)) {
            deleteEntity();
          }
        }}
      >
        Supprimer
      </button>
    </>
  );
}

export default DeleteApprov;
