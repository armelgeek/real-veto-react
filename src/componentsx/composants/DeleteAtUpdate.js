import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { action } from "../../utils/lib/call";
function DeleteAtUpdate({ model, entity }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteEntity = () => {
    dispatch(
      action(model).createTransaction(
        {
          commande: entity,
        },
        "/change-from-magasin"
      )
    );
    // history.goBack();
  };
  return (
    <>
      <button
        className="btn btn-danger btn-sm"
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm(`Je confirme la jusitification !`)) {
            deleteEntity();
          }
        }}
      >
        Justifier
      </button>
    </>
  );
}

export default DeleteAtUpdate;
