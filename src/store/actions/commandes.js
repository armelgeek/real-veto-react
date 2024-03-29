import { fetch } from "../../utils/lib";

export const getCredit = (deb, fin) =>
  fetch("commandes", { path: `/credit?deb=${deb}&fin=${fin}`, replace: true });
  
export const getCreditVaccinateur = () =>
  fetch("commandes", { path: `/credit-vaccinateur`, replace: true });

export const getCommandeDirect = () =>
  fetch("commandes", { path: `/direct`, replace: true });
export const setPayerCommande = (id) =>
  fetch("commandes", { path: `/set-payer-commande?cId=${id}`, replace: true });

export const getBenefice = (deb, fin) =>
  fetch("commandes", {
    path: `/benefices?deb=${deb}&fin=${fin}`,
    replace: true,
  });
export const getResteAPayer = (deb, fin) =>
  fetch("commandes", {
    path: `/reste-a-payer?deb=${deb}&fin=${fin}`,
    replace: true,
  });
  export const getTdbCommande = (type,deb, fin) =>
  fetch("commandes", { path: `/get-tdb-commande?type=${type}&deb=${deb}&fin=${fin}`, replace: true });
  
 export const getTdbCommandeByProduct = (type,deb, fin,id) =>
  fetch("commandes", { path: `/get-tdb-by-product?type=${type}&deb=${deb}&fin=${fin}&id=${id}`, replace: true });

  export const getCommandeByCategories = (date) =>
  fetch("commandestat", { path: `/get/today?date=${date}`, replace: true });
  
  export const getTdbCommandeByProducts = (type,deb, fin,id) =>
  fetch("commandes", { path: `/get-cmd-by-products?type=${type}&deb=${deb}&fin=${fin}&id=${id}`, replace: true });
  
export const getEntree = (deb, fin) =>
  fetch("commandes", { path: `/entree?deb=${deb}&fin=${fin}`, replace: true });

export const getSortie = (deb, fin) =>
  fetch("commandes", { path: `/sortie?deb=${deb}&fin=${fin}`, replace: true });

export const getCommandeCVA = (deb, fin,type) =>
  fetch("commandes", {
    path: `/vente-cva?deb=${deb}&fin=${fin}&type=${type}`,
    replace: true,
  });
  export const getOperationCommandeCVA = (deb, fin,type) =>
  fetch("commandes", {
    path: `/operation-vente-cva?deb=${deb}&fin=${fin}`,
    replace: true,
  });
  export const getCommandeVenteCorrection = (deb, fin) =>
  fetch("commandes", {
    path: `/vente-correction?deb=${deb}&fin=${fin}`,
    replace: true,
  });
export const getCVA = (deb, fin) =>
  fetch("commandes", { path: `/cva?deb=${deb}&fin=${fin}`, replace: true });

export const getCommande = (deb, fin) =>
  fetch("commandes", { path: `/journal?deb=${deb}&fin=${fin}`, replace: true });

export const getRecetteToDay = () => {
  fetch("commandes", { path: `/recette/to/day`, replace: true });
};
export const getCreditByPersons = () =>
fetch("creditstat", { path: `/credit-tdb`, replace: true });
  