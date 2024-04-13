import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { getBenefice } from "../../store/actions/commandes";
import { Link } from "react-router-dom";
import { Alert, Badge } from "react-bootstrap";
function BeneficeEtResteApay() {
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const metadata = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBenefice(deb, fin));
  }, [deb, fin]);
  const getBeneficeByDate = () => {
    setDeb(refDateDeb.current.value);
    setFin(refDateFin.current.value);
  };
  return (
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
          <button className="btn btn-primary" onClick={getBeneficeByDate}>
            Filtrer
          </button>
        </div>{" "}
      </div>
      <h5>{commandes.length == 0 && "Aucune information à afficher"} </h5>

      <table className="table table-bordered bg-green">
        <thead>
          <tr>
            <th style={{width:"50%"}}>Nom de l'article</th>
            <th>Type</th>
            <th>Quantite</th>
            <th>CC</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((c) => (
            <>
             <tr>
               <td colSpan="6">
                 
              <Alert className="text-left" variant={"secondary"}>
              Commande # {c.id}(Date:{c.dateCom})
              </Alert>
              </td>
             </tr>
              {c.contenu.map((cc) => (
                <tr>
                  <td>{cc.name}</td>
                  <td>{cc.type}</td>
                  <td>{cc.quantityParProduct}</td>

                  <td>{cc.quantityCC}</td>
                  <td>
                    <Link className="btn btn-primary m-2" to={`detail/${c.id}`}>
                      Detail du commande
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>

      <Alert className="text-right" variant={"info"}>
        Recette:
        <b>{metadata.benefice}</b> Ar
      </Alert>
    </div>
  );
}

export default BeneficeEtResteApay;
