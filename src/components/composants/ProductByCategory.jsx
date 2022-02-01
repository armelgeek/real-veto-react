import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByCategory,
  fetchProductsByFournisseur,
} from "../../store/actions/products";
import { action, getData } from "../../utils/lib/call";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import { Link } from "react-router-dom";
import { displayMoney } from "../../utils/functions";
function ProductByCategory() {
  const products = useSelector(getData("products").value);

  const categories = useSelector(getData("categories").value);
  const dispatch = useDispatch();
  const [id, setId] = useState(1);
  useEffect(() => {
    //recuperer la premiere ligne dans le tableau fournisseur
    dispatch(fetchProductsByCategory(id));
    dispatch(action("categories").fetch());
  }, [id]);
  return (
    <Content>
      <ContentHeader title="Liste des articles par categories">
        <ActiveLink title="Liste des articles par categories"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="">Categorie:</label>
              <select
                className="form-control"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                {categories.map((f) => (
                  <option value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <table className="table table-bordered table-striped">
          <thead className="bg-thead">
            <tr>
              <th>Nom</th>
              <th>Prix Unitaire</th>
              <th>Categorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr>
              <td>{p?.name}</td>
              <td>{displayMoney(p?.prixFournisseur)}</td>
              <td>{p?.category?.name}</td>
              <td>
              <Link
                  className="btn btn-sm btn-primary"
                  to={`/product/detail/${p.id}`}
                >
                  Detail
                </Link></td>
            </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </Content>
  );
}

export default ProductByCategory;
