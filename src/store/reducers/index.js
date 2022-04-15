import { combineReducers } from "redux";
import { applyUndo } from "react-redux-undo";

import productReducer from "./products";
import userReducer from "./user";
import commandeReducer from "./commandes";
import fournisseursReducer from "./fournisseur";
import emprunteurReducer from "./emprunteurs";
import vaccinateurReducer from "./vaccinateurs";
import categoriesReducer from "./category";
import basketReducer from "../basket/reducers/basket";
import approvisonnementReducer from "../approvis/reducers/approvis";
import toMagasinReducer from "../tomagasin/reducers/tomagasin";
import fromMagasinReducer from "../frommagasin/reducers/frommagasin";
import approvisReducer from "./approvis";
import stockReducer from "./stock";
import parametreReducer from "./parametres";
import checkoutReducer from "../basket/reducers/checkout";
import sortiedepotReducer from "./sortiedepot";
import fromdepotsReducer from "../fromdepot/reducers/fromdepot";
import { countReducer } from "./undoTest";
import { searchReducer } from "./search/search";

export default combineReducers({
    searchbydate:searchReducer,
    count: countReducer,
    auth: userReducer,
    products: productReducer,
    realproducts: productReducer,
    categories: categoriesReducer,
    fournisseurs: fournisseursReducer,
    emprunters: emprunteurReducer,
    vaccinateurs: vaccinateurReducer,
    commandes: commandeReducer,
    commandesclone: commandeReducer,
    basket: basketReducer,
    approvisionnements: approvisonnementReducer,
    approvis: approvisReducer,
    fromdepots: fromdepotsReducer,
    stock: stockReducer,
    checkout: checkoutReducer,
    parametres: parametreReducer,
    tomagasins: toMagasinReducer,
    frommagasins: fromMagasinReducer,
    sortiedepots: sortiedepotReducer,
  });
