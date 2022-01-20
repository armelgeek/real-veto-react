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
import { SIGNIN, SIGNUP } from "./constants/routes";

import PublicRoute from './routes/PublicRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
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
} from "./constants/routes";
function Routes() {
  return (
    <BrowserRouter>
     {/* <Header />*/}
     
          <Switch>
            <PublicRoute  path={HOME} exact component={App} />
            <Route path={APPROV} exact component={Approv} />
            <Route path={PERIME} exact component={Perime} />
            <Route path={PARASUPPL} exact component={ParametrageSuppl} />
            <Route path={PRODUCTS} exact component={ProductAll} />
            <Route path={EDITPRODUCT} exact component={Edit} />
            <Route path={CREATEPRODUCT} exact component={Create} />
            <Route path={JOURNAL} exact component={Journal} />
            <Route path={RUPTURE} exact component={Rupture} />
            <Route path={CREDIT} exact component={Credit} />
            <Route path={PARAMETRES} exact component={Parametres} />
            <Route path={CREDITVACCINATEUR} component={CreditVaccinateur} />
            <Route path={DIRECT} component={Direct} />
            <Route path={BONDESORTIE} component={Commande} />
            <Route
              path={PRODUCTBYFOURNISSEUR}
              component={ProductByFournisseur}
            />
            <Route path={PRODUCTBYCATEGORY} component={ProductByCategory} />
            <Route path={SORTIE} exact component={Sortie} />
            <Route path={ENTREE} exact component={Entree} />
            <Route path={DETAIL} exact component={Detail} />
            <Route path={PRODUCTDETAIL} component={DetailProduct}/>
            <Route path={BSORTIE} component={BSortie} />
            <Route path={ADDPROD} component={AddProd} />
            <Route path={NOUVELLEFACTURE} component={NouvelleFacture} />
            <Route path={LISTAPPROV} component={ListApprov} />
            <Route path={DETAILAPPROV} component={DetailApprov} />

            <PublicRoute path={SIGNIN} exact component={SignIn} />
            <PublicRoute path={SIGNUP} exact component={SignUp} />

          </Switch>
      {/*<Footer/>*/}
    </BrowserRouter>
  );
}

export default Routes;
