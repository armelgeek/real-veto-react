import React, { useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
function ContentHeader({ children, title }) {
  const history = useHistory();
   const memoizedValue = useMemo(() => (
    <div>
    <div className="content-header p-2 shadow-sm bg-white">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h4 className="mt-2 text-uppercase">{title}</h4>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
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
   ), [children,title])
  return memoizedValue;
}

export default ContentHeader;
