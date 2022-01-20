import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { action, getData } from '../../utils/lib/call';
import { getCreditVaccinateur } from '../../store/actions/commandes';
import { Link } from 'react-router-dom';

import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
function CreditVaccinateur(props) {
    const commandes = useSelector(getData("commandes").value);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCreditVaccinateur());
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
      <ContentHeader title="Crédit pour les vaccinateurs">
        <ActiveLink title="Crédit pour les vaccinateurs"></ActiveLink>
      </ContentHeader>
      <Page>
        <table className="table table-bordered table-striped">
          <thead>
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
                <td>{p?.vaccinateur?.name}</td>
                <td>{p?.vaccinateur?.contact}</td>
                <td>{calculateTotal(p?.contenu)}</td>
                <td>{p?.createdAt}</td>
                <td className="d-flex justify-content-around">
                  <Link
                    className="btn btn-sm  btn-green"
                    to={`/detail/${p.id}`}
                  >
                    Detail credit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </Content>
    )
}

export default CreditVaccinateur

