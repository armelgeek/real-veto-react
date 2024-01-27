import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavItem from "./Sidebar/NavItem";
import NavTree from "./Sidebar/NavTree";
import Footer from "./adminlte/Content/Footer";
import Version from "../components/version";
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
  CHANGE_PRIX,
  OP_COMMANDES,
  PRICE_CHANGE
} from "../constants/routes";
import { SCOPES } from "../constants/permissions";
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
      <div className="wrapper position-relative">
      <div className="bg-dark p-2 text-center">
              <h4 className="m-0 p-2 text-white">
                CABINET VETERINAIRE AMBALAVAO
              </h4>
               
            </div>
      <div style={{
        position: 'absolute',
        top:10,
        right: 5 
      }}>
          <Version/>
      </div>
        <aside
          className="main-sidebar sidebar-dark-primary"
          style={{
            maxHeight: "100%",
            overflow: "auto",
          }}
        >
          <Link to={homeTo} className="brand-link border-0">
            <span className="ml-4 brand-text font-weight-light text-center text-uppercase">
              {title}
            </span>
          </Link>
          <div className="sidebar position-relative">
            {/**<div style={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          left: 0,
                          backgroundColor:'#4DDAB8'
                        }}>
                          <button>
                          Plus de menus
                          </button>
                        </div>**/}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <NavTree title={"Tableau de bord"} route={"/"} scopes={[SCOPES.canShowDashboard]} />
                <NavItem title="Factures && Produits" scopes={[SCOPES.canShowFactureProducts]}>
                  <NavTree title={"Factures"} route={LISTAPPROV} scopes={[SCOPES.canShowFactures]} />
                  <NavTree title={"Produits"} route={PRODUCTS} scopes={[SCOPES.canShowProducts]} />
                  <NavTree
                  title={"Produit à approvisionner"}
                  route={"/rupture/stock"}
                  scopes={[SCOPES.canShowCredit]}
                /></NavItem>
                <NavItem title="Dépot" scopes={[SCOPES.canShowDepot]}>
                  <NavTree title={"Bon de sortie"} route={BONDESORTIE} scopes={[SCOPES.canShowBonDeSortie]} />
                  <NavTree title={"Historique de sortie"} route={SORTIE} scopes={[SCOPES.canShowHistoriqueDeSortie]} />
                  <NavTree title={"Credit"} route={CREDIT} scopes={[SCOPES.canShowCredit]} />
                  <NavTree title={"Vaccinateur"} route={CREDITVACCINATEUR} scopes={[SCOPES.canShowVaccinateur]} />
                </NavItem>
                <NavItem title="Magasin" scopes={[SCOPES.canShowMagasin]}>
                  <NavTree title={"Depot vers Magasin"} route={ADMIN} scopes={[SCOPES.canShowDepotVersMagasin]} />
                  <NavTree
                    title={"Historique de 'Dépôt vers Magasin'"}
                    route={HISTORIQUESORTIECVA}
                    scopes={[SCOPES.canHistoriqueDeDM]}
                  />
                 
                </NavItem>
                <NavItem title="Correction" scopes={[SCOPES.canShowCorrection]}>
                  <NavTree
                    title={"Ajouter une correction"}
                    route={CORRECTION}
                    scopes={[SCOPES.canAddCorrection]}
                  />
                  <NavTree
                    title={"Historique de correction"}
                    route={HISTORIQUECORRECTION}
                    scopes={[SCOPES.canShowHistoriqueDeCorrection]}
                  />
                </NavItem>

                <NavItem title="Vente" scopes={[SCOPES.canShowVente]}>
               
                  <NavTree
                    title={"Effectuer une vente"}
                    route={"/vendre/in/admin"}
                    scopes={[SCOPES.canShowEffectuerUneVente]}
                  />
                  <NavTree
                    title={"Etat de stock magasin"}
                    route={ETATSTOCKMAGASIN}
                    scopes={[SCOPES.canShowEtatDeStockMagasin]}
                  />
                  <NavTree
                    title={"Historique de vente du magasin"}
                    route={"/historique-admin/vente/vendeur/vente-cva"}
                    scopes={[SCOPES.canShowHistoriqueDeVenteDuMagasin]}
                  />
                  <NavTree
                    title={"Crédit"}
                    route={"/historique-admin/vente/vendeur/credit-cva"}
                    scopes={[SCOPES.canShowVenteCredit]}
                  />
                </NavItem>
                <NavItem title="Parametres" scopes={[SCOPES.canShowParameter]}>
                  <NavTree title={"Categories"} route={CATEGORIES} scopes={[SCOPES.canShowCategory]} />
                  <NavTree 
                    title={"Fournisseurs"} 
                    route={FOURNISSEURS}
                    scopes={[SCOPES.canShowFournisseur]} />
                  <NavTree
                    title={"Demandeurs de credit"}
                    route={EMPRUNTEURS}
                    scopes={[SCOPES.canShowDemandeurCredit]}
                  />
                  <NavTree title={"Vaccinateurs"} route={VACCINATEURS} scopes={[SCOPES.canShowVaccinateur]} />
                </NavItem>
              </ul>
            </nav>
          </div>
        </aside>
        <>{children}</>
        <footer className="shadow-sm bg-white main-footer d-flex flex-row justify-content-between align-items-center" >
            <div>
              <h4>Copyright © 2022 <a href="https://www.facebook.com/armel.mouhid">Armel Wanes</a>.</h4>
            </div>
            <div>
           
            </div>
        </footer>
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
