import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import {
  ACCOUNT_URL,
  HOME,
  SIGNIN,
  ENTREE,
  SIGNUP,
  CART,
  PARAMETRES,
  CREDITVACCINATEUR,
  DIRECT,
  PRODUCTBYFOURNISSEUR,
  PRODUCTBYCATEGORY,
  SORTIE,
} from "../constants/routes";
import { ROLE_ADMIN, ROLE_USER } from "../constants/roles";
import { logout } from "../store/actions/user";

const Header = () => {
  return (
    <React.Fragment>
      <div className="bg-dark m-0  p-2  text-center">
        <h3 className="m-0 p-2 text-white">CABINET VETERINAIRE AMBALAVAO</h3>
      </div>
      <ul className="list-inline d-flex m-0  p-2 justify-content-center">
        <li className="text-white  m-0  p-2">
          <Link className="btn  btn-sm bg-success text-white" to={"/journal"}>
            Journal d'entrees et sorties
          </Link>
        </li>
        <li className="text-white  m-0  p-2">
          <Link className="btn  btn-sm bg-success text-white" to={ENTREE}>
            Entree
          </Link>
        </li>
        <li className="text-white  m-0  p-2">
          <Link className="btn  btn-sm bg-success text-white" to={SORTIE}>
            Sortie
          </Link>
        </li>
        
        <li className="text-white m-0  p-2">
          <Link className="btn btn-sm bg-success text-white" to={"/products"}>
            Articles
          </Link>
        </li>
        
        <li className="text-white m-0  p-2">
          <Link className="btn bg-success btn-sm text-white" to={"/credit"}>
            Credit
          </Link>
        </li>
        <li className="text-white m-0  p-2">
          <Link className="btn bg-success btn-sm text-white" to={CREDITVACCINATEUR}>
            Credit Vaccinateur
          </Link>
        </li>
        <li className="text-white m-0  p-2">
          <Link className="btn bg-success btn-sm text-white" to={DIRECT}>
            Commande direct
          </Link>
        </li>
        <li className="text-white m-0  p-2">
          <Link className="btn bg-success btn-sm text-white" to={PRODUCTBYFOURNISSEUR}>
            Produit par fournisseur
          </Link>
        </li>
        <li className="text-white m-0  p-2">
          <Link className="btn bg-success btn-sm text-white" to={PRODUCTBYCATEGORY}>
            Produit par category
          </Link>
        </li>
        
        <li className="text-white m-0  p-2">
          <Link className="btn  btn-sm bg-success text-white" to={"/"}>
            Bon de sortie
          </Link>
        </li>
        <li className="text-white m-0  p-2">
          <Link className="btn  btn-sm bg-success text-white" to={"/approv"}>
            Article à approvisionner
          </Link>
        </li>
        <li className="text-white m-0  p-2">
          <Link className="btn  btn-sm bg-success text-white" to={"/perimes"}>
            Article perimé
          </Link>
        </li>
        <li className="text-white m-0  p-2">
          <Link className="btn  btn-sm bg-success text-white" to={PARAMETRES}>
            Parametres
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};
export default withRouter(Header);
