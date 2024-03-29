import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavItem from "./Sidebar/NavItem";
import NavTree from "./Sidebar/NavTree";
import {
  CREATEPRODUCT,
  ENTREE,
  PERIME,
  PRODUCTS,
  RUPTURE,
  SORTIE,
  CREDIT,
  CREDITVACCINATEUR,
  PRODUCTBYCATEGORY,
  PRODUCTBYFOURNISSEUR,
  DIRECT,
  BONDESORTIE,
  PARAMETRES,
  NOUVELLEFACTURE,
  LISTAPPROV,
  DEPOTOMAGASIN,
  ADMIN,
  HISTORIQUESORTIECVA,
  ETATSTOCKMAGASIN,
  HISTORIQUEVENTEVENDEURVUEPARADMIN,
} from "../constants/routes";
class AdminLTE extends Component {
  componentDidMount() {}
  render() {
    let { children, navigation, title, titleShort } = this.props;
    const { searchbarFilter } = this.props;
    const { homeTo } = this.props;
    {
      if (!children) children = [<div>No content</div>];
      if (!children.length) {
        children = [children];
      }
    }
    if (!title.length) {
      title = [title];
    }
    return (
      <div className="wrapper">
        <div className="bg-dark m-0  p-2  text-center">
          <h4 className="m-0 p-2 text-white">CABINET VETERINAIRE AMBALAVAO</h4>
        </div>
        <aside className="main-sidebar sidebar-dark-primary">
          <Link to={homeTo} className="brand-link border-0">
            <span className="ml-4 brand-text font-weight-light text-center text-uppercase">
              {title}
            </span>
          </Link>
          <div className="sidebar">
            {/*<div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  //src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                />
              </div>
              <div className="info">
                <a href="#" className="d-block">
                  Text
                </a>
              </div>
    </div>*/}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <NavTree title={"Journal d'E&S"} route={"/"} />
                <NavItem title="Factures">
                  <NavTree title={"Nouvelle facture"} route={NOUVELLEFACTURE} />
                  <NavTree title={"Historique de facture"} route={LISTAPPROV} />
                </NavItem>
                <NavItem title="Articles">
                  <NavTree title={"Liste articles"} route={PRODUCTS} />

                  <NavTree title={"Ajout un article"} route={CREATEPRODUCT} />

                  <NavTree
                    title={"Article par categorie"}
                    route={PRODUCTBYCATEGORY}
                  />

                  <NavTree
                    title={"Article par fournisseur"}
                    route={PRODUCTBYFOURNISSEUR}
                  />
                </NavItem>
                <NavItem title="Dépot">
                  <NavTree title={"Historique de sortie"} route={SORTIE} />
                  <NavTree title={"Credit"} route={CREDIT} />
                  <NavTree title={"Vaccinateur"} route={CREDITVACCINATEUR} />
                  <NavTree title={"Bon de sortie"} route={BONDESORTIE} />
                </NavItem>
                <NavItem title="Magasin">
                  <NavTree title={"Depot vers Magasin"} route={ADMIN} />
                  <NavTree
                    title={"Historique de sortie Dépôt vers Magasin"}
                    route={HISTORIQUESORTIECVA}
                  />
                  <NavTree
                    title={"Etat de stock magasin"}
                    route={ETATSTOCKMAGASIN}
                  />
                  <NavTree
                    title={"Historique de vente du magasin"}
                    route={HISTORIQUEVENTEVENDEURVUEPARADMIN}
                  />
                </NavItem>

                <NavItem title="Etat des articles">
                  <NavTree title={"Article perimés"} route={PERIME} />
                  <NavTree
                    title={"Articles en rupture de stock"}
                    route={RUPTURE}
                  />
                </NavItem>
                <NavItem title="Parametres">
                  <NavTree title={"Parametres générales"} route={PARAMETRES} />
                </NavItem>
              </ul>
            </nav>
          </div>
        </aside>
        {children}
      </div>
    );
  }
}

AdminLTE.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  titleShort: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  //theme: PropTypes.oneOf(Themes),
  browserTitle: PropTypes.string,
  sidebar: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  homeTo: PropTypes.string,
  searchbarFilter: PropTypes.bool,
};

AdminLTE.defaultProps = {
  children: null,
  title: ["Admin", "LTE"],
  browserTitle: null,
  theme: "blue",
  //  controlSidebar: null,
  footer: null,
  sidebar: undefined,
  homeTo: "/",
  searchbarFilter: false,
};

export default AdminLTE;
