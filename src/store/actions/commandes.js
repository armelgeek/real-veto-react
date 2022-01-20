import { fetch } from "../../utils/lib";

export const getCredit = () =>
  fetch("commandes", { path: `/credit`, replace: true });
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

export const getEntree = (deb, fin) =>
  fetch("commandes", { path: `/entree?deb=${deb}&fin=${fin}`, replace: true });

export const getSortie = (deb, fin) =>
  fetch("commandes", { path: `/sortie?deb=${deb}&fin=${fin}`, replace: true });

export const getCommandeCVA = (deb, fin) =>
  fetch("commandes", {
    path: `/vente-cva?deb=${deb}&fin=${fin}`,
    replace: true,
  });
export const getCVA = (deb, fin) =>
  fetch("commandes", { path: `/cva?deb=${deb}&fin=${fin}`, replace: true });

export const getCommande = (deb, fin) =>
  fetch("commandes", { path: `/journal?deb=${deb}&fin=${fin}`, replace: true });

export const getRecetteToDay = () => {
  fetch("commandes", { path: `/ recette/to/day`, replace: true });
};
