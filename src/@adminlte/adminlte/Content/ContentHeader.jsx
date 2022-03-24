import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import reactFastCompare from "react-fast-compare";
import {
  TDB_VENTE_CBV,
  TDB_FACTURES,
  TDB_DEPOT_VERS_MAGASIN,
} from "../../../constants/routes";

function ContentHeader({ children, title }) {
  const history = useHistory();
  return (
    <>
      <div>
        <div class="content-header p-2 shadow-sm bg-white">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <h4 class="mt-2 text-uppercase">{title}</h4>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <Link to={"/"}>Accueil</Link>
                  </li>
                  {children}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-1">
          <button
            type="button"
            onClick={() => history.goBack()}
            className="btn btn-link"
          >
            {"<<"} Revenir en arriere
          </button>
        </div>
      </div>
    </>
  );
}

export default React.memo(ContentHeader, reactFastCompare);
