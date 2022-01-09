import React, { useState, useRef, useEffect } from "react";
import Content from "../../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import { action, getData } from "../../../../utils/lib/call";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCVA } from "../../../../store/actions/commandes";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { Link } from "react-router-dom";
import DeleteToMagasin from "./DeleteToMagasin";

export const HistoriqueSortieCva = () => {
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCVA(deb, fin));
  }, [deb, fin]);
  const getByDate = () => {
    setDeb(refDateDeb.current.value);
    setFin(refDateFin.current.value);
  };

  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.prixVente * el.quantityParProduct;
    });
    return total;
  };
  const quantiteBruteTotal = (arr) => {
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

  return (
    <Content>
      <ContentHeader title="Historique sortie vers Magasin">
        <ActiveLink title="Nouvelle Facture"></ActiveLink>
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
            <thead className="bg-thead">
              <tr>
                <th>Date</th>
                <th
                  style={{
                    width: "250px",
                  }}
                >
                  Produits
                </th>
                <th>Montant Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((p) => (
                <tr>
                  <td>{displayDate(p?.dateCom)}</td>
                  <td>
                    {p?.contenu?.map((c) => (
                      <span>
                        {c.name}
                        {","}
                      </span>
                    ))}
                  </td>
                  <td>{displayMoney(calculateTotal(p?.contenu))}</td>
                  <td>

                  <Link
                      className="btn btn-sm  btn-green mr-2"
                      to={`/detail/${p.id}`}
                    >
                      Détails
                    </Link>
                    <Link
                      className="btn btn-sm  btn-warning mr-2"
                      to={`/depot/to/magasin/edit/${p.id}`}
                    >
                      Editer
                    </Link>
                    <DeleteToMagasin model="tomagasins" entity={p} />
                  </td>
                </tr>
              ))}
              {commandes.length == 0 && (
                <tr className="text-center">
                  <td colSpan={8}>Aucune enregistrement trouvé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Page>{" "}
    </Content>
  );
};
