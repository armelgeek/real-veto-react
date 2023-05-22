import React from "react";
import { TDB_FACTURES,TDB_VENTE_CBV,TDB_DEPOT_VERS_MAGASIN } from '../../../constants/routes';
import { Link, useHistory, useLocation } from "react-router-dom";
export const MenuTdb = () => {
    const location = useLocation();
    const isActive = (route) => {
        return location.pathname == route;
      };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Link
        className={`btn btn-${
          isActive("/") ? "success" : "default"
        } text-uppercase mr-2`}
        to={"/"}
      >
        Journal Vente du magasin
      </Link>
      <Link
        className={`btn btn-${
          isActive(TDB_FACTURES) ? "success" : "default"
        } text-uppercase mr-2`}
        to={TDB_FACTURES}
      >
        Journal de facturation
      </Link>
      <Link
        className={`btn btn-${
          isActive(TDB_VENTE_CBV) ? "success" : "default"
        } text-uppercase mr-2`}
        to={TDB_VENTE_CBV}
      >
        Journal de Vente CBV
      </Link>
      <Link
        className={`btn btn-${
          isActive(TDB_DEPOT_VERS_MAGASIN) ? "success" : "default"
        } text-uppercase mr-2`}
        to={TDB_DEPOT_VERS_MAGASIN}
      >
        Journal de Depot vers magasin
      </Link>
    </div>
  );
};
