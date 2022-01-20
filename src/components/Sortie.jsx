import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEntree, getSortie } from "../store/actions/commandes";
import { action, getData } from "../utils/lib/call";

import Content from "../@adminlte/adminlte/Content";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
import NumberFormat from "react-number-format";
function Sortie() {
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.prixVente;
    });
    return total;
  };
  const quantiteBruteTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityParProduct;
    });
    return total;
  };
  const quantiteCCTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityCC;
    });
    return total;
  };

  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  const getSortieByDate = () => {
    setDeb(refDateDeb.current.value);
    setFin(refDateFin.current.value);
  };
  useEffect(() => {
    dispatch(getSortie(deb, fin));
  }, [deb, fin]);
  return (
    <Content>
      <ContentHeader title="Historique de sortie">
        <ActiveLink title="Historique de sortie"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="border p-3 bg-white">
          <div className="row mb-3">
            <div className="col-lg-7"></div>
            <div className="col-lg-5">
              <div className="d-flex justify-content-around">
                <input
                  type="date"
                  name="datedeb"
                  className="form-control mr-3"
                  format="DD-MM-YYYY"
                  ref={refDateDeb}
                  placeholder="Début"
                />
                <input
                  type="date"
                  name="datefin"
                  className="form-control mr-3"
                  ref={refDateFin}
                  placeholder="Fin"
                />

                <Button onClick={()=>getSortieByDate()}>Filtrer</Button>
              </div>
            </div>
          </div>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type de sortie</th>
                <th>Quantite Brute</th>
                <th>Quantite en CC</th>
                <th>Montant Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((p) => (
                <tr>
                  <td>{p?.createdAt}</td>
                  <td>{p?.type}</td>
                  <td>{quantiteBruteTotal(p?.contenu)}</td>
                  <td>{quantiteCCTotal(p?.contenu)}</td>
                  <td>
                    <NumberFormat
                      value={calculateTotal(p?.contenu)}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"Ar"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </td>
                  <td className="d-flex justify-content-around">
                    <Link
                      className="btn btn-sm  btn-success"
                      to={`detail/${p.id}`}
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
  );
}

export default Sortie;
