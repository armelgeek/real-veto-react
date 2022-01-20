import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { NumberToLetter } from "convertir-nombre-lettre";
//import useModal from '../../hooks/useModal';
import { Card } from "react-bootstrap";
import { action, getData } from "../../../utils/lib/call";
import NumberFormat from "react-number-format";
import { clearApprov } from "../../../store/approvis/actions/approvis";
import ApprovisionnementItem from "./ApprovisionnementItem";
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

const Approvisionnement = ({ setRegenerate }) => {
  const [remise, setRemise] = useState(0);
  const [dateEcheance, setDateEcheance] = useState(new Date());
  const [dateApprovis, setDateApprovis] = useState(null);
  const [remarque, setRemarque] = useState("");
  const [typePaye, setTypePaye] = useState("espece");
  const meta = useSelector(getData("approvis").meta);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(action("approvis").fetch());
  }, []);
  const { approvisionnements } = useSelector((state) => ({
    approvisionnements: state.approvisionnements,
  }));
  const { isItemOnApprov, addToApprov } = useApprov(
    approvisionnements,
    dispatch
  );
  const onCheckOut = () => {
    dispatch(
      action("approvis").create({
        id: Number(meta.nextId),
        contenu: approvisionnements,
        totalht: calculateTotal(
          approvisionnements.map(
            (product) => product.prixFournisseur * product.quantityParProduct
          )
        ),
        remise: remise,
        total: calculeTotalAvecRemise(
          approvisionnements.map(
            (product) => product.prixFournisseur * product.quantityParProduct
          ),
          remise
        ),
        dateApprov: dateApprovis == null ? new Date() : dateApprovis,
        dateEcheance: dateEcheance,
        remarque: remarque,
        typePaye: typePaye,
      })
    );
    approvisionnements.forEach((element) => {
      element.quantityBrute += element.quantityParProduct;

      element.quantityParProduct = 0;
      dispatch(action("products").update(element));
    });
    dispatch(clearApprov());
    setRegenerate(true);
    history.push(LISTAPPROV);
    console.log(approvisionnements);
  };

  const onClearApprov = () => {
    if (approvisionnements.length !== 0) {
      dispatch(clearApprov());
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white">
          <div>
            Factures (
            {` ${approvisionnements.length} ${
              approvisionnements.length > 1 ? "produits" : "produit"
            }`}
            )
          </div>
        </Card.Header>
        <Card.Body>
          <div class="form-group">
            <label>Date du facture :</label>
            <div>
              <input
                type="date"
                onChange={(e) => setDateApprovis(e.target.value)}
                value={dateApprovis}
                className="form-control"
              />
            </div>
          </div>
          {approvisionnements.length <= 0 && (
            <div class="alert alert-success ">Aucune produit !!!</div>
          )}

          {approvisionnements?.map((product, i) => (
            <ApprovisionnementItem
              key={`${product?.id}_${i}`}
              product={product}
              isItemOnApprov={isItemOnApprov}
              addToApprov={addToApprov}
              approvisionnement={approvisionnements}
              dispatch={dispatch}
            />
          ))}
          {approvisionnements.length > 0 && (
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
                        approvisionnements.map(
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
                        approvisionnements.map(
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
                        approvisionnements.map(
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
                        approvisionnements.map(
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
                  disabled={approvisionnements.length === 0}
                  onClick={onCheckOut}
                  type="button"
                >
                  Valider l'operation
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={onClearApprov}
                  type="button"
                >
                  <span>Annuler</span>
                </button>
              </div>
            </>
          )}
        </Card.Body>
        {approvisionnements.length > 0 && (
          <Card.Footer className="d-flex flex-column"></Card.Footer>
        )}
      </Card>
    </>
  );
};

export default Approvisionnement;
