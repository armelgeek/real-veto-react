import { create, update, fetch } from "../../utils/lib";

export const fetchProductsPerime = () =>
  fetch("products", { path: `/perimer`, replace: true });
export const fetchProductsRuptureStock = () =>
  fetch("products", { path: `/rupture/stock`, replace: true });

export const fetchProductsByFournisseur = (id) =>
  fetch("products", { path: `/product/fournisseur?id=${id}`, replace: true });

export const fetchProductsByCategory = (id) =>
  fetch("products", { path: `/product/category?id=${id}`, replace: true });

export const createProduct = (data) =>
  create("products", data, { path: `/create-product` });

export const updateProduct = (data) =>
  update("products", data, { path: `/update-data-product` });

export const getSortieDepotByProductId = (id) =>
  fetch("sortiedepots", {
    path: `/sortie/depot/by/product?productId=${id}`, replace: true 
  });
