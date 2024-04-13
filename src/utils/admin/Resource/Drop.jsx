import React from "react";
import { useDispatch } from "react-redux";
import { action, getData } from "../../lib/call";
import { useHistory } from 'react-router-dom';
function Drop({ model, entity,attribute }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const deleteEntity = () => {
    dispatch(action(model).destroy(entity));
  };
  return (
    <>
      <button
      className="btn btn-danger btn-sm"
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm(`Vous voulez vraiment supprimer "${entity[attribute]}" ?`)) {
            deleteEntity();
          }
        }}
      >
        Supprimer
      </button>
    </>
  );
}

export default Drop;
