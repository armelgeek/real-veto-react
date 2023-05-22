import { fetch } from "../../utils/lib";
export const getApprov = (deb,fin) => fetch('approvis', { path: `/get-approv-by-date?deb=${deb}&fin=${fin}`,replace:true })
export const getApprovData = (deb,fin) => fetch('approvis', { path: `/get-approv-by-date?deb=${deb}&fin=${fin}`,replace:true })
export const fetchProductsById = (id) =>
  fetch("approvis", { path: `/approvis/${id}`, replace: true });
