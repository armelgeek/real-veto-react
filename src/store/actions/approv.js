import { fetch } from "../../utils/lib";
export const getApprov = (deb,fin) => fetch('approvisionnements', { path: `/get-approv-by-date?deb=${deb}&fin=${fin}`,replace:true })
