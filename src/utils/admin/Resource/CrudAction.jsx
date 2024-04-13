import React from "react";
import Drop from "./Drop";
import { Link } from "react-router-dom";
import Gate from '../../../components/Gate';
import { SCOPES } from "../../../constants/permissions";

export const CrudAction = ({
  route,
  edit = [],
  detail = [],
  remove = [],
  model,
  modelKey,
  data
}) => {
  return (
    <div>
      <Gate scopes={detail}>
        <Link
          className="btn btn-sm btn-primary mr-2"
          to={`/${route}/detail/${data.row.original.id}`}
        >
          Detail
        </Link>
      </Gate>
      <Gate scopes={edit}>
        <Link
          className="btn btn-sm btn-warning mr-2"
          to={`/${route}/edit/${data.row.original.id}`}
        >
          Editer
        </Link>
      </Gate>
      <Gate scopes={remove}>
        <Drop model={model} entity={data.row.original} attribute={modelKey} />
      </Gate>
    </div>
  );
};
