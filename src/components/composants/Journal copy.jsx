import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { action, getData } from "../../utils/lib/call";
import Content from "../../@adminlte/adminlte/Content/index";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../@adminlte/adminlte/Content/Page";
import { displayDate, displayMoney } from "../../utils/functions";
import { getCommande } from "../../store/actions/commandes";

const Journalw = () => {
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommande(deb, fin));
  }, [deb, fin]);
  const getByDate = () => {
    if(refDateDeb.current.value==""){
      setDeb(new Date());
    }else{
      setDeb(refDateDeb.current.value);
    }
    if(refDateFin.current.value==""){
      setFin(new Date());
    }else{
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
      <Content>
        <ContentHeader title="Journal de sortie">
          <ActiveLink title="Journal de sortie"></ActiveLink>
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
                  <th>Date </th>
                  <th>Type de sortie</th>
                  <th>Montant Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((p) => (
                  <tr>
                    <td>{displayDate(p?.createdAt)}</td>
                    <td>
                      <>
                        {p?.type == "cva" && (
                          <div className="badge badge-info">
                            Approvisionnement du magasin
                          </div>
                        )}
                        {p?.type == "vente-magasin-direct" && (
                          <div className="badge badge-success">
                            Vente direct depuis le magasin
                          </div>
                        )}
                        {p?.type == "vente-magasin-credit" && (
                          <div className="badge badge-info">
                            credit client depuis magasin
                          </div>
                        )}
                        {p?.type == "credit" && (
                          <div className="badge badge-danger">
                            Credit personne
                          </div>
                        )}
                        {p?.type == "vaccinateur" && (
                          <div className="badge badge-warning">
                            Credit Vaccinateur
                          </div>
                        )}
                        {p?.type == "direct" && (
                          <div className="badge badge-dark">
                            Vente direct depuis le depôt
                          </div>
                        )}
                      </>
                    </td>
                    <td>{displayMoney(totalDevente(p?.contenu))}</td>
                    <td>
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
          <h3>Total:{displayMoney(recetteDuJour(commandes))}</h3>
        </Page>
      </Content>
    </>
  );
};
export default Journalw;
