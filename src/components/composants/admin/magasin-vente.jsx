import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { action,getData } from "../../../utils/lib/call";
import { getCommandeCVA } from '../../../store/actions/commandes';
import { displayDate, displayMoney } from "../../../utils/functions";
import Content from '../../../@adminlte/adminlte/Content/index';
import ContentHeader from '../../../@adminlte/adminlte/Content/ContentHeader';
import ActiveLink from '../../../@adminlte/adminlte/Content/ActiveLink';
import Page from '../../../@adminlte/adminlte/Content/Page';

export const MagasinVente = () => {
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").fetch());
  }, []);
  useEffect(() => {
    dispatch(getCommandeCVA(deb, fin));
  }, [deb, fin]);
  const getByDate = () => {
    setDeb(refDateDeb.current.value);
    setFin(refDateFin.current.value);
  };

  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.prixVente*1;
    });
    return total;
  };
  const quantiteBruteTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityParProduct*1;
    });
    return total;
  };
  const quantiteCCTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityCC *1;
    });
    return total;
  };

  return (
    <>
    <Content>
      <ContentHeader title="Historique de vente du magasin">
        <ActiveLink title="Historique de vente du magasin"></ActiveLink>
      </ContentHeader>
      <Page>
          <div className="row">
            <div className="col-lg-8"></div>
            <div className="col-lg-4">
              <div className="d-flex align-items-center mb-3">
                <input
                  type="date"
                  name="datedeb"
                  ref={refDateDeb}
                  placeholder="date debut"
                  className="form-control mr-2"
                />
                <input
                  type="date"
                  name="datefin"
                  ref={refDateFin}
                  placeholder="date fin"
                  className="form-control mr-2"
                />
                <button className="btn btn-primary" onClick={getByDate}>
                  Filtrer
                </button>
              </div>{" "}
            </div>{" "}
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Quantite</th>
                  <th>Quantite en ML</th>
                  <th>Montant Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((p) => (
                  <tr>
                    <td>{displayDate(p?.dateCom)}</td>
                    <td>{quantiteBruteTotal(p?.contenu)}</td>
                    <td>{quantiteCCTotal(p?.contenu)}</td>
                    <td>{displayMoney(calculateTotal(p?.contenu))}</td>
                    <td >
                      <Link
                        className="btn btn-sm  btn-green"
                        to={`/detail/${p.id}`}
                      >
                        Afficher le detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </Page>
    </Content>
      
    </>
  );
};
