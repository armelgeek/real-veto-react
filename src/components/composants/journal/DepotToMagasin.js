import React, { useState, useRef, useEffect } from "react";
import { getCVA } from "../../../store/actions/commandes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getData } from "../../../utils/lib/call";
import { displayMoney } from "../../../utils/functions";
import { Link } from 'react-router-dom';

export const DepotToMagasin = () => {
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
  return (
    <>
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
      
      <div>
     
       {/** <table className="table">
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
                <td>{p?.createdAt}</td>
                <td>{quantiteBruteTotal(p?.contenu)}</td>
                <td>{quantiteCCTotal(p?.contenu)}</td>
                <td>{displayMoney(calculateTotal(p?.contenu))}</td>
                <td className="d-flex justify-content-around">
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
        </table> */}
      </div>
    </>
  );
};
