import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavItem from "./Sidebar/NavItem";
import NavTree from "./Sidebar/NavTree";
import Footer from "./adminlte/Content/Footer";
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
  TDB_DEPOT_VERS_MAGASIN,
  TDB_VENTE_CBV,
  TDB_FACTURES,
  CORRECTION,
  HISTORIQUECORRECTION,
  FOURNISSEURS,
  CATEGORIES,
  VACCINATEURS,
  EMPRUNTEURS,
} from "../constants/routes";
class AdminLTE extends React.PureComponent {
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
      <>
        <div class="wrapper position-relative">
          <div className="bg-dark m-0  p-2  text-center">
            <h4 className="m-0 p-2 text-white">
              CABINET VETERINAIRE AMBALAVAO
            </h4>
          </div>
          <aside className="main-sidebar sidebar-dark-primary">
            <Link to={homeTo} className="brand-link border-0">
              <span className="ml-4 brand-text font-weight-light text-center text-uppercase">
                {title}
              </span>
            </Link>
            <div class="sidebar">
              <nav class="mt-2">
                <ul
                  class="nav nav-pills nav-sidebar flex-column"
                  data-widget="treeview"
                  role="menu"
                  data-accordion="false"
                >
                  <NavTree title={"Tableau de bord"} route={"/"} />
                  <NavItem title="Factures && Produits">
                    <NavTree title={"Factures"} route={LISTAPPROV} />
                    <NavTree title={"Produits"} route={PRODUCTS} />
                  </NavItem>
                  <NavItem title="Dépot">
                    <NavTree title={"Bon de sortie"} route={BONDESORTIE} />
                    <NavTree title={"Historique de sortie"} route={SORTIE} />
                    <NavTree title={"Credit"} route={CREDIT} />
                    <NavTree title={"Vaccinateur"} route={CREDITVACCINATEUR} />
                  </NavItem>
                  <NavItem title="Magasin">
                    <NavTree title={"Depot vers Magasin"} route={ADMIN} />
                    <NavTree
                      title={"Historique de 'Dépôt vers Magasin'"}
                      route={HISTORIQUESORTIECVA}
                    />
                  </NavItem>
                  <NavItem title="Correction">
                    <NavTree
                      title={"Ajouter une correction"}
                      route={CORRECTION}
                    />
                    <NavTree
                      title={"Historique de correction"}
                      route={HISTORIQUECORRECTION}
                    />
                  </NavItem>

                  <NavItem title="Vente">
                  <NavTree
                      title={"Effectuer une vente"}
                      route={"/vendre/in/admin"}
                    />
                    <NavTree
                      title={"Etat de stock magasin"}
                      route={ETATSTOCKMAGASIN}
                    />
                    <NavTree
                      title={"Historique de vente du magasin"}
                      route={'/historique-admin/vente/vendeur/vente-cva'}
                    />
                    <NavTree
                      title={"Crédit"}
                      route={"/historique-admin/vente/vendeur/credit-cva"}
                    />
                  </NavItem>
                  <NavItem title="Parametres">
                    <NavTree title={"Categories"} route={CATEGORIES} />
                    <NavTree title={"Fournisseurs"} route={FOURNISSEURS} />
                    <NavTree title={"Demandeurs de credit"} route={EMPRUNTEURS} />
                    <NavTree title={"Vaccinateurs"} route={VACCINATEURS} />
                    
                  </NavItem>
                </ul>
              </nav>
            </div>
          </aside>
          <div>{children}</div>
        </div>
        {/**
        <Footer /> */}
      </>
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
