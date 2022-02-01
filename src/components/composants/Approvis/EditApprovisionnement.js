import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NumberToLetter } from "convertir-nombre-lettre";
//import useModal from '../../hooks/useModal';
import { Card } from "react-bootstrap";
import { action, getData } from "../../../utils/lib/call";
import NumberFormat from "react-number-format";
import {
  clearApprov,
  setApprovItems,
} from "../../../store/approvis/actions/approvis";
import ApprovisionnementEditItem from "./ApprovisionnementEditItem";
import { omit } from "../../../utils/functions";
import { LISTAPPROV } from "../../../constants/routes";
import { handleSoldProduct } from "../../../store/functions/function";
import useApprov from "../../../hooks/useApprov";
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total;
};
const remiseEnAriary = (arr, remise) => {
  return (calculateTotal(arr) * remise) / 100;
};

const calculeTotalAvecRemise = (arr, remise) => {
  return calculateTotal(arr) - remiseEnAriary(arr, remise);
};

const EditApprovisionnement = ({ state, meta, setState, approv }) => {
  const [remise, setRemise] = useState(0);
  const [dateEcheance, setDateEcheance] = useState(approv?.dateEcheance);
  const [dateApprovis, setDateApprovis] = useState(approv?.dateApprov);
  const [remarque, setRemarque] = useState(approv?.remarque);
  const [typePaye, setTypePaye] = useState(approv?.typePaye);
  const dispatch = useDispatch();
  const history = useHistory();
  const onCheckOut = () => {
    console.log("hello");
  };
  const onClearApprov = () => {
    console.log("hiii");
  };
  return (
    <>
      {" "}
      {/**  <button onClick={() => setState(approv?.contenu)}>Annuler</button>
      {state?.map((s, index) => (
        <>
          <p>{s.name}</p>
          <p>{s.prixVente * s.quantityParProduct}</p>

          <p>{s.quantityParProduct}</p>
          <button
            onClick={() => updateObjectValue(index, "quantityParProduct", 1)}
          >
           Editer
          </button>
          <button onClick={() => removeProduct(s.id)}>Delete</button>
        </>
      ))}
 */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white">
          <div>
            Approvisionenement (
            {` ${state?.length} ${state?.length > 1 ? "articles" : "article"}`})
          </div>
        </Card.Header>
        <Card.Body>
          <div class="form-group">
            <label>Date de l'approvisionnement :</label>
            <div>
              <input
                type="date"
                onChange={(e) => setDateApprovis(e.target.value)}
                value={dateApprovis}
                className="form-control"
              />
            </div>
          </div>
          {!meta.isFetching && state?.length <= 0 && (
            <>
              {" "}
              <div class="alert alert-success ">Aucune produit !!!</div>
            </>
          )}
          {!meta.isFetching && state?.length <= 0 && (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => setState(approv?.contenu)}
                type="button"
              >
                <span>Annuler</span>
              </button>
            </div>
          )}
          {meta.isFetching && <p>Chargement en cours ...</p>}
          {state?.map((product, i) => (
            <ApprovisionnementEditItem
              key={`${product?.id}_${i}`}
              product={product}
              state={state}
              index={i}
              setState={setState}
              dispatch={dispatch}
            />
          ))}
          {state?.length > 0 && (
            <>
              <div className="d-flex justify-content-end align-items-center my-3 ">
                <table>
                  <tr>
                    <td>REMISE :</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Remise"
                        min={0}
                        value={remise}
                        max={100}
                        onChange={(e) => {
                          setRemise(e.target.value);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>PAIEMENT LE :</td>
                    <td>
                      <input
                        type="date"
                        onChange={(e) => setDateEcheance(e.target.value)}
                        value={dateEcheance}
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>TYPE DE PAIEMENT:</td>
                    <td>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setTypePaye(e.target.value);
                        }}
                      >
                        <option value="espece" selected>
                          ESPECE
                        </option>
                        <option value="boa">CHEQUE - BOA</option>
                        <option value="bni">CHEQUE - BNI</option>
                        <option value="MVola">VIREMENT - MVola</option>
                        <option value="OrangeMoney">
                          VIREMENT - ORANGE MONEY
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>REMARQUE :</td>
                    <td>
                      <textarea
                        className="form-control"
                        onChange={(e) => {
                          setRemarque(e.target.value);
                        }}
                        placeholder="Ecriver ici quelque chose d'autre à savoir sur l'approvisionnement"
                      ></textarea>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="d-flex flex-column  my-3 ">
                {" "}
                <p className="approvisionnement-total-amount">
                  Total HT:
                  <strong>
                    <NumberFormat
                      value={calculateTotal(
                        state?.map(
                          (product) =>
                            product.prixFournisseur * product.quantityParProduct
                        )
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"Ar"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </strong>
                </p>
                <p className="approvisionnement-total-amount">
                  Remise:
                  <strong>
                    <NumberFormat
                      value={remiseEnAriary(
                        state?.map(
                          (product) =>
                            product.prixFournisseur * product.quantityParProduct
                        ),
                        remise
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"Ar"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </strong>
                </p>
                <p className="approvisionnement-total-amount">
                  Total avec remise :
                  <strong>
                    <NumberFormat
                      value={calculeTotalAvecRemise(
                        state?.map(
                          (product) =>
                            product.prixFournisseur * product.quantityParProduct
                        ),
                        remise
                      )}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"Ar"}
                      renderText={(value, props) => (
                        <div {...props}>{value}</div>
                      )}
                    />
                  </strong>
                </p>
                <p>Arrêté à la somme de </p>
                <p className="text-uppercase">
                  <strong>
                    {NumberToLetter(
                      calculeTotalAvecRemise(
                        state?.map(
                          (product) =>
                            product.prixFournisseur * product.quantityParProduct
                        ),
                        remise
                      )
                    )}{" "}
                    ARIARY
                  </strong>
                </p>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-green btn-sm mr-2"
                  disabled={state?.length === 0}
                  onClick={onCheckOut}
                  type="button"
                >
                  Valider l'operation
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setState(approv?.contenu)}
                  type="button"
                >
                  <span>Annuler</span>
                </button>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default EditApprovisionnement;
