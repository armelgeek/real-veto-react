import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFournisseur } from "../../store/actions/products";
import { action, getData } from "../../utils/lib/call";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import { Link } from "react-router-dom";
import { displayMoney } from "../../utils/functions";
function ProductByFournisseur() {
  const products = useSelector(getData("products").value);

  const fournisseurs = useSelector(getData("fournisseurs").value);
  const dispatch = useDispatch();
  const [id, setId] = useState(1);
  useEffect(() => {
    //recuperer la premiere ligne dans le tableau fournisseur
    dispatch(fetchProductsByFournisseur(id));
    dispatch(action("fournisseurs").fetch());
  }, [id]);
  return (
    <Content>
      <ContentHeader title="Liste des articles par fournisseurs">
        <ActiveLink title="Liste des articles par fournisseurs"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="">Fournisseur:</label>
              <select
                className="form-control"
                onChange={(e) => {
                  setId(e.target.value);
                }}
              >
                {fournisseurs.map((f) => (
                  <option value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Fournisseur</th>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr>
                <td>{p?.name}</td>
                <td>{displayMoney(p?.prixFournisseur)}</td>
                <td>{p?.fournisseur?.name}</td>
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

export default ProductByFournisseur;
