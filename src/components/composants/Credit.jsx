import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { getCredit, setPayerCommande } from "../../store/actions/commandes";
import { Link } from "react-router-dom";

import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
function Credit(props) {
  const commandes = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCredit());
  }, []);

  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.prixVente;
    });
    return total.toFixed(2);
  };
  return (
    <Content>
      <ContentHeader title="Crédit">
        <ActiveLink title="Crédit"></ActiveLink>
      </ContentHeader>
      <Page>
        <table className="table table-bordered -striped">
          <thead className="bg-thead">
            <tr>
              <th>Nom de la personne</th>
              <th >Contact</th>
              <th >Montant</th>
              <th >Date</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {commandes.map((p) => (
              <tr>
                <td>{p?.emprunter?.name}</td>
                <td>{p?.emprunter?.contact}</td>
                <td>{calculateTotal(p?.contenu)}</td>
                <td>{p?.createdAt}</td>
                <td className="d-flex justify-content-around">
                  <Link
                    className="btn btn-sm  btn-green"
                    to={`detail/${p.id}`}
                  >
                    Detail credit
                  </Link>
                </td>
              </tr>
            ))}
            {commandes.length==0 && <tr className="text-center"><td colSpan={8}>Aucune enregistrement trouvé</td></tr>}
          </tbody>
        </table>
      </Page>
    </Content>
  );
}

export default Credit;
