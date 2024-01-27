import { create, update, fetch } from "../../utils/lib";

export const fetchProductsPerime = () =>
  fetch("products", { path: `/perimer`, replace: true });
export const fetchProductsRuptureStock = (page=1,limit=10) =>
  fetch("products", { path: `/rupture/stock?page=${page}&limit=${limit}`, replace: true });

export const fetchProductsByFournisseur = (id) =>
  fetch("products", { path: `/product/fournisseur?id=${id}`, replace: true });

  export const fetchProductsById = (id) =>
  fetch("products", { path: `/products/${id}`, replace: true });
  
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
export const getAllProducts = (date,page =1,limit = 10)=>{
    return fetch("products", {
        path: `/last-product-commande?startDate=${date}&page=${page}&limit=${limit}`, replace: true
    });
}