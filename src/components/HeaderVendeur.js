import React from "react";
import { Link, useLocation } from "react-router-dom";
import Horloge from "./composants/vendeur/fromMagasin/Horloge";

export default function HeaderVendeur() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <div className="bg-dark text-white py-3 d-flex justify-content-center align-items-center">
        <h1 className="">CABINET VETERINAIRE AMBALAVAO</h1>
      </div>
      <div className="py-2">
        <div className="d-flex justify-content-between align-items-center">
          <div></div>
          <div>
            <Horloge />
          </div>

          <div className="bg-thead"></div>
        </div>
        <div className="d-flex justify-content-center mt-2 align-items-center">
          <Link
            className={`btn bg-${
              location.pathname == "/vendeur" || location.pathname == "/Vendeur"
                ? "thead"
                : "dark"
            } text-white mb-2 mr-2 btn-sm`}
            to={`/Vendeur`}
          >
            Vente
          </Link>

          <Link
            className={`btn bg-${
              location.pathname == "/historique/vente/vendeur/vente-cva"
                ? "thead"
                : "dark"
            } text-white mb-2 mr-2 btn-sm`}
            to={`/historique/vente/vendeur/vente-cva`}
          >
            Historique de vente
          </Link>
          <Link
            className={`btn bg-${
              location.pathname == "/stock-cva"
                ? "thead"
                : "dark"
            } text-white mb-2 mr-2 btn-sm`}
            to={`/stock-cva`}
          >
            Stocks
          </Link>
          <Link
            className={`btn bg-${
              location.pathname == "/historique/vente/vendeur/credit-cva"
                ? "thead"
                : "dark"
            } text-white mb-2 mr-2 btn-sm`}
            to={`/historique/vente/vendeur/credit-cva`}
          >
            Credits
          </Link>
        </div>
      </div>
    </>
  );
}
