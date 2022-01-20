import React from "react";
import Drop from "./Drop";
import { Link } from 'react-router-dom';

export const CrudAction = ({ route, model,modelKey, data }) => {
  return (
    <div>
      <Link  className="btn btn-sm btn-primary mr-2"  to={`/${route}/detail/${data.row.original.id}`}>
        Detail
      </Link>
      <Link className="btn btn-sm btn-warning mr-2"  to={`/${route}/edit/${data.row.original.id}`}>
        Editer
      </Link>
      <Drop model={model} entity={data.row.original} attribute={modelKey} />
    </div>
  );
};
