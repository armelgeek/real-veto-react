import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { action } from '../../../../utils/lib/call';
function DeleteToMagasin({ model, entity }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteEntity = () => {
    dispatch(action(model).deleteTransaction(entity, "/delete-to-magasin"));
    history.goBack();
  };
  return (
    <>
      <button
        className="btn btn-danger btn-sm"
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm(`Vous voulez vraiment supprimer le produit ?`)) {
            deleteEntity();
          }
        }}
      >
        Supprimer
      </button>
    </>
  );
}

export default DeleteToMagasin;
