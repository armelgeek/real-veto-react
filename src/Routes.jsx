import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminLTE from "./@adminlte/AdminLTE";
import App from "./App";
import Approv from "./components/Approv";
import AddProd from "./components/composants/AddProd";
import DetailApprov from "./components/composants/Approvis/detail";
import ListApprov from "./components/composants/Approvis/list";
import BSortie from "./components/composants/BSortie";
import Commande from "./components/composants/Commande";
import Credit from "./components/composants/Credit";
import CreditVaccinateur from "./components/composants/CreditVaccinateur";
import Detail from "./components/composants/Detail";
import DetailSortie from "./components/composants/DetailSortie";
import Direct from "./components/composants/Direct";
import Journal from "./components/composants/Journal";
import ParametrageSuppl from "./components/composants/ParametrageSuppl";
import { Perime } from "./components/composants/Perime";
import Create from "./components/composants/product/create";
import DetailProduct from "./components/composants/product/detail";
import Edit from "./components/composants/product/edit";
import { ProductAll } from "./components/composants/product/ProductAll";
import ProductByCategory from "./components/composants/ProductByCategory";
import ProductByFournisseur from "./components/composants/ProductByFournisseur";
import { Rupture } from "./components/composants/Rupture";
import Entree from "./components/Entree";
import Header from "./components/Header";
import NouvelleFacture from "./components/NouvelleFacture";
import Parametres from "./components/Parametres";
import Sortie from "./components/Sortie";
import EditSortie from "./components/fromDepot/EditSortie";
import {
  ADMIN,
  DEPOTOMAGASIN,
  DETAILVENDEUR,
  ETATSTOCKMAGASIN,
  HISTORIQUESORTIECVA,
  HISTORIQUEVENTEVENDEUR,
  HISTORIQUEVENTEVENDEURVUEPARADMIN,
  SIGNIN,
  SIGNUP,
  VENDEUR,
  EDITERFACTURE,
  BNC_DEPOT,
  EDIT_SORTIE,
  DETAIL_SORTIE,
  EDITDEPOTTOMAGASIN,
  EDITFROMMAGASIN,
  TDB_DEPOT_VERS_MAGASIN,
  DEPOT_MAGASIN_DETAIL,
  DETAIL_MAGASIN_VENTE,
  CORRECTION,
  HISTORIQUECORRECTION,
  DETAILCORRECTION,
  FOURNISSEURS,
  ADD_FOURNISSEUR,
  EDIT_FOURNISSEUR,
  CATEGORIES,
  ADD_CATEGORIES,
  EDIT_CATEGORIES,
  EMPRUNTEURS,
  ADD_EMPRUNTEUR,
  EDIT_EMPRUNTEUR,
  VACCINATEURS,
  ADD_VACCINATEUR,
  EDIT_VACCINATEUR,
  HISTORIQUEVENTEVENDEUR_ADMIN,
  EDITFROMMAGASIN_ADMIN,
  DETAILVENDEUR_ADMIN,
  VENDEUR_ADMIN,
} from "./constants/routes";

import PublicRoute from "./routes/PublicRoute";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import {
  APPROV,
  HOME,
  PERIME,
  RUPTURE,
  CREDIT,
  DETAIL,
  CREDITVACCINATEUR,
  JOURNAL,
  PARAMETRES,
  DIRECT,
  PRODUCTBYFOURNISSEUR,
  PRODUCTBYCATEGORY,
  PRODUCTS,
  CREATEPRODUCT,
  EDITPRODUCT,
  PARASUPPL,
  ENTREE,
  SORTIE,
  BONDESORTIE,
  PRODUCTDETAIL,
  BSORTIE,
  ADDPROD,
  NOUVELLEFACTURE,
  DETAILAPPROV,
  LISTAPPROV,
  TDB_FACTURES,
  TDB_VENTE_CBV,
} from "./constants/routes";
import { Auth, Data } from "./context/auth-context";

import VendeurRoute from "./routes/VendeurRoute";
import { logout } from "./store/actions/user";
import { useDispatch } from "react-redux";
import { AdminDashboard } from "./components/composants/admin";

import { DepotToMagasin } from "./components/composants/admin/depot-to-magasin";
import { HistoriqueSortieCva } from "./components/composants/admin/tomagasin/list";
import { HistoriqueVenteVendeur } from "./components/composants/vendeur/fromMagasin/list";
import { HistoriqueVenteVendeurAdmin  } from "./components/composants/vendeur/fromMagasinForAdmin/list";
import { EtatStockMagasin } from "./components/composants/admin/etat";
import { MagasinVente } from "./components/composants/admin/magasin-vente";
import DetailVendeur from "./components/composants/vendeur/fromMagasin/DetailVendeur";
import DetailVendeurAdmin from "./components/composants/vendeur/fromMagasinForAdmin/DetailVendeur";
import AdminRoute from "./routes/AdminRoute";
import { EditerApprov } from "./components/composants/Approvis/editer";
import BonDepot from "./components/fromDepot/index";
import { Facturation } from "./components/composants/journal/Facturation";
import { VenteCBV } from "./components/composants/journal/VenteCBV";
import { DepotVersMagasin } from "./components/composants/journal/DepotVersMagasin";
import DepotToMagasinDetail from "./components/composants/admin/tomagasin/DepotToMagasinDetail";
import DetailMagasinVente from "./components/composants/vendeur/fromMagasin/DetailMagasinVente";
import EditFromMagasin from "./components/composants/vendeur/fromMagasin/EditFromMagasin";

import DetailMagasinVenteAdmin from "./components/composants/vendeur/fromMagasinForAdmin/DetailMagasinVente";
import EditFromMagasinAdmin from "./components/composants/vendeur/fromMagasinForAdmin/EditFromMagasin";


import EditToMagasin from "./components/composants/admin/tomagasin/EditToMagasin";
import Vendeur from "./components/composants/vendeur/index";
import CorrectionFromMagasin from "./components/composants/vendeur/correction/CorrectionFromMagasin";
import { HistoriqueDeCorrection } from "./components/composants/vendeur/correction/list";
import DetailCorrection from "./components/composants/vendeur/correction/DetailCorrection";
import Fournisseurs from "./components/parametres/fournisseurs/Fournisseurs";
import CreateFournisseur from "./components/parametres/fournisseurs/AddFournisseur";
import EditFournisseur from "./components/parametres/fournisseurs/EditFournisseur";
import Categories from "./components/parametres/category/Categories";
import CreateCategory from "./components/parametres/category/AddCategory";
import EditCategorie from "./components/parametres/category/EditCategory";
import Emprunters from "./components/parametres/emprunter/Emprunters";
import CreateEmprunteur from "./components/parametres/emprunter/AddEmprunter";
import EditEmprunter from "./components/parametres/emprunter/EditEmprunter";
import Vaccinateurs from "./components/parametres/vaccinateur/Vaccinateurs";
import CreateVaccinateur from "./components/parametres/vaccinateur/AddVaccinateur";
import EditVaccinateur from "./components/parametres/vaccinateur/EditVaccinateur";
import VendeurAdmin from "./components/composants/vendeur/fromMagasinForAdmin";
function Routes() {
  const dispatch = useDispatch();
  return (
    <BrowserRouter basename="/index.html">
      {/* <Header />*/}
      {/*<Auth>
        <Data>
          {({ isLoggedIn }) => (
            <div className="top-3">
            <div className="d-flex justify-content-end">
              {isLoggedIn ? (
                <div className="m-3">
                  <button  class="btn btn-primary"  onClick={() => {
                    dispatch(logout());
                  }}>Déconnexion</button>
                </div>
              ) : (
                <>
                  <p>Se connecter</p> 
                </>
              )}
            </div></div>
          )}
        </Data>
      </Auth>*/}
      <Switch>
        <AdminRoute path={HOME} exact component={App} />
        <AdminRoute path={TDB_FACTURES} component={Facturation} />
        <AdminRoute path={TDB_VENTE_CBV} component={VenteCBV} />
        <AdminRoute
          path={TDB_DEPOT_VERS_MAGASIN}
          component={DepotVersMagasin}
        />
        <VendeurRoute path={VENDEUR} component={Vendeur} />
        <VendeurRoute path={DETAILVENDEUR} component={DetailVendeur} />
        <VendeurRoute path={EDITFROMMAGASIN} component={EditFromMagasin} />
        <VendeurRoute
          path={HISTORIQUEVENTEVENDEUR}
          component={HistoriqueVenteVendeur}
        />
        <AdminRoute path={VENDEUR_ADMIN} component={VendeurAdmin} />
        <AdminRoute path={DETAILVENDEUR_ADMIN} component={DetailVendeurAdmin} />
        <AdminRoute path={EDITFROMMAGASIN_ADMIN} component={EditFromMagasinAdmin} />
        <AdminRoute
          path={HISTORIQUEVENTEVENDEUR_ADMIN}
          component={HistoriqueVenteVendeurAdmin}
        />
        <AdminRoute path={APPROV} component={Approv} />
        <AdminRoute path={PERIME} component={Perime} />
        <AdminRoute path={PARASUPPL} component={ParametrageSuppl} />
        <AdminRoute path={PRODUCTS} component={ProductAll} />
        <AdminRoute path={BNC_DEPOT} component={BonDepot} />
        <AdminRoute path={EDITPRODUCT} component={Edit} />
        <AdminRoute path={CREATEPRODUCT} component={Create} />
        <AdminRoute path={JOURNAL} component={Journal} />
        <AdminRoute path={RUPTURE} component={Rupture} />
        <AdminRoute path={CREDIT} component={Credit} />
        <AdminRoute path={PARAMETRES} component={Parametres} />
        <AdminRoute path={CREDITVACCINATEUR} component={CreditVaccinateur} />
        <AdminRoute path={DIRECT} component={Direct} />
        <AdminRoute path={BONDESORTIE} component={BonDepot} />
        <AdminRoute
          path={PRODUCTBYFOURNISSEUR}
          component={ProductByFournisseur}
        />
        <AdminRoute path={PRODUCTBYCATEGORY} component={ProductByCategory} />
        <AdminRoute path={SORTIE} component={Sortie} />
        <AdminRoute path={EDIT_SORTIE} component={EditSortie} />

        <AdminRoute path={ENTREE} component={Entree} />
        <AdminRoute path={DETAIL} component={Detail} />
        <AdminRoute path={DETAIL_SORTIE} exact component={DetailSortie} />
        <AdminRoute path={PRODUCTDETAIL} component={DetailProduct} />
        <AdminRoute path={BSORTIE} component={BSortie} />
        <AdminRoute path={ADDPROD} component={AddProd} />
        <AdminRoute path={NOUVELLEFACTURE} component={NouvelleFacture} />
        <AdminRoute path={EDITERFACTURE} exact component={EditerApprov} />

        <AdminRoute path={LISTAPPROV} component={ListApprov} />
        <AdminRoute path={DETAILAPPROV} exact component={DetailApprov} />

        <AdminRoute path={SIGNIN} component={SignIn} />
        <AdminRoute path={SIGNUP} component={SignUp} />
        <AdminRoute path={ADMIN} component={AdminDashboard} />
        <AdminRoute path={EDITDEPOTTOMAGASIN} component={EditToMagasin} />

        <AdminRoute
          path={HISTORIQUESORTIECVA}
          component={HistoriqueSortieCva}
        />
        <AdminRoute
          path={DEPOT_MAGASIN_DETAIL}
          component={DepotToMagasinDetail}
        />
        <AdminRoute path={ETATSTOCKMAGASIN} component={EtatStockMagasin} />
        
        <AdminRoute
          path={HISTORIQUEVENTEVENDEURVUEPARADMIN}
          component={MagasinVente}
        />
        <AdminRoute
          path={DETAIL_MAGASIN_VENTE}
          component={DetailMagasinVente}
        />
        <AdminRoute path={CORRECTION} component={CorrectionFromMagasin} />
        <AdminRoute
          path={HISTORIQUECORRECTION}
          component={HistoriqueDeCorrection}
        />
        <AdminRoute path={DETAILCORRECTION} component={DetailCorrection} />
        <AdminRoute path={FOURNISSEURS} component={Fournisseurs} />
        <AdminRoute path={ADD_FOURNISSEUR} component={CreateFournisseur} />
        <AdminRoute path={EDIT_FOURNISSEUR} component={EditFournisseur} />
        <AdminRoute path={CATEGORIES} component={Categories} />
        <AdminRoute path={ADD_CATEGORIES} component={CreateCategory} />
        <AdminRoute path={EDIT_CATEGORIES} component={EditCategorie} />
        <AdminRoute path={EMPRUNTEURS} component={Emprunters} />
        <AdminRoute path={ADD_EMPRUNTEUR} component={CreateEmprunteur} />
        <AdminRoute path={EDIT_EMPRUNTEUR} component={EditEmprunter} />
        <AdminRoute path={VACCINATEURS} component={Vaccinateurs} />
        <AdminRoute path={ADD_VACCINATEUR} component={CreateVaccinateur} />
        <AdminRoute path={EDIT_VACCINATEUR} component={EditVaccinateur} />
      </Switch>
      {/*<Footer/>*/}
    </BrowserRouter>
  );
}

export default Routes;
