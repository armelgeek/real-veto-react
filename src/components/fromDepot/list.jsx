import React, { useState, useEffect, useRef } from "react";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";
import { useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { useDispatch } from "react-redux";
import { getCommandeCVA } from "../../store/actions/commandes";
import { displayDate, displayMoney } from "../../utils/functions";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { VENDEUR } from "../../constants/routes";

export const HistoriqueVenteVendeur = () => {
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommandeCVA(deb, fin));
  }, [deb, fin]);
  const getByDate = () => {
    if (refDateDeb.current.value == "") {
      setDeb(new Date());
    } else {
      setDeb(refDateDeb.current.value);
    }
    if (refDateFin.current.value == "") {
      setFin(new Date());
    } else {
      setFin(refDateFin.current.value);
    }
  };
  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    const total = arr.reduce((acc, val) => acc + val, 0);
    return total;
  };

  const totalDevente = (arr) => {
    return (
      calculateTotal(
        arr.map((product) => {
          return product.prixVente * product.quantityParProduct;
        })
      ) +
      calculateTotal(
        arr.map((product) => {
          return product.prixParCC * product.qttByCC;
        })
      )
    );
  };
  const recetteDuJour = (arr) => {
    let total = 0;
    arr.map((c) => {
      total += totalDevente(c?.contenu);
    });
    return total;
  };
  return (
    <>
      <div>
        <div className="bg-gray text-white p-3 d-flex justify-content-center align-items-center">
          <h1 className="">CABINET VETERINAIRE AMBALAVAO</h1>
        </div>
        <div className="p-3">
          <div class="d-flex justify-content-end">
            <Link class="btn btn-primary my-3" to={VENDEUR}>
              Revenir en arriere
            </Link>
          </div>
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
                  <th>Montant Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commandes
                  .sort((low, high) => high.id- low.id)
                  .map((p, i) => (
                    <tr key={i}>
                      <td>{displayDate(p?.dateCom)}</td>
                      <td>{displayMoney(totalDevente(p?.contenu))}</td>
                      <td>
                        <Link
                          className="btn btn-sm  btn-green"
                          to={`/detailvendeur/${p.id}`}
                        >
                          Afficher le detail
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <h3>Total:{displayMoney(recetteDuJour(commandes))}</h3>
        </div>{" "}
      </div>
    </>
  );
};
