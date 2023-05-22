import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { getCommandeDirect } from "../../store/actions/commandes";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import { Link } from "react-router-dom";
function Direct(props) {
  const commandes = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommandeDirect());
  }, []);
  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total=0;
    arr.forEach(el => {
      total+=el.prixVente;
    });
    return total.toFixed(2);
  };
  return (
    <Content>
    <ContentHeader title="Sortie pour le magasin">
      <ActiveLink title="Sortie pour le magasin"></ActiveLink>
    </ContentHeader>
    <Page>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Date de commande</th>
            <th>Nb</th>
            <th>Montant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {commandes.map((p) => (
            <tr>
              <td>{p?.createdAt}</td>
              <td>{p?.contenu?.length}</td>
              <td>{calculateTotal(p?.contenu)}</td>
              <td className="d-flex justify-content-around">
                  <Link
                    className="btn btn-sm  btn-green"
                    to={`detail/${p.id}`}
                  >
                    Detail 
                  </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </Page>
    </Content>
  );
}

export default Direct;
