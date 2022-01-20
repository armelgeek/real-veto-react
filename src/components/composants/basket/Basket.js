import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import useModal from '../../hooks/useModal';
import BasketItem from "./BasketItem";
import { Card } from "react-bootstrap";
import { action, getData } from "../../../utils/lib/call";
import { clearBasket } from "../../../store/basket/actions/basket";
import NumberFormat from "react-number-format";
import { MgToMl } from "../../../hooks/convertisseur";
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total;
};

const Basket = () => {
  const [type, setType] = useState("direct");
  const [vaccinateurId, setVaccinateurId] = useState(null);
  const [emprunter, setEmprunter] = useState(null);
  //  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { basket } = useSelector((state) => ({
    basket: state.basket,
  }));
  const dispatch = useDispatch();
  const emprunters = useSelector(getData("emprunters").value);
  const vaccinateurs = useSelector(getData("vaccinateurs").value);
  const meta = useSelector(getData("commandes").meta);
  useEffect(() => {
    dispatch(action("emprunters").fetch());
    dispatch(action("commandes").fetch());
    dispatch(action("vaccinateurs").fetch());
  }, [dispatch]);

  const onCheckOut = () => {

    dispatch(
      action("commandes").create({
        id: Number(meta.nextId),
        contenu: basket,
        type: type,
        sorte: "sortie",
        qtteBrute: 1,
        qtteCC: 1,
        vaccinateurId: vaccinateurId,
        status: type === "direct" ? true : false,
        emprunterId: emprunter,
        dateCom: new Date(),
      })
    );
    basket.forEach((element) => {
   //   element.quantityBrute =
    //    MgToMl(element.doseRestantEnMg) / element.doseDefault;
      element.quantityParProduct = 1;
      dispatch(action("products").update(element));
    });
    dispatch(clearBasket());
    //console.log(basket);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
          <div>
            BON DE SORTIE {type.toUpperCase()} (
            {` ${basket.length} ${basket.length > 1 ? "articles" : "article"}`})
          </div>
          <div>
            <select
              className="form-control"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="direct" selected>
                Comptant
              </option>
              <option value="vaccinateur">Vaccinateur</option>
              <option value="credit">Credit</option>
            </select>
          </div>
        </Card.Header>
        <Card.Body>
          {type === "vaccinateur" && (
            <>
              <label>Vaccinateur:</label>
              <select
                className="form-control mb-3"
                onChange={(e) => {
                  setVaccinateurId(e.target.value);
                }}
              >
                <option value=""></option>
                {vaccinateurs.map((v) => (
                  <option value={v.id}>{v.name}</option>
                ))}
              </select>
            </>
          )}
          {type === "credit" && (
            <>
              <label>Crediteur:</label>
              <select
                className="form-control"
                onChange={(e) => {
                  setEmprunter(e.target.value);
                }}
              >
                <option value=""></option>
                {emprunters.map((v) => (
                  <option value={v.id}>{v.name}</option>
                ))}
              </select>
            </>
          )}
          {basket.length <= 0 && (
            <div class="alert alert-success ">Aucune commande!!!</div>
          )}
          {basket?.map((product, i) => (
            <BasketItem
              key={`${product?.id}_${i}`}
              product={product}
              basket={basket}
              dispatch={dispatch}
            />
          ))}
          {basket.length > 0 && (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-green btn-sm mr-2"
                disabled={basket.length === 0}
                onClick={onCheckOut}
                type="button"
              >
                Valider l'operation
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={onClearBasket}
                type="button"
              >
                <span>Annuler</span>
              </button>
            </div>
          )}
        </Card.Body>
        {basket.length > 0 && (
          <Card.Footer className="d-flex justify-content-between">
            <div>
              <p className="basket-total-amount">
                <strong>Total brute:</strong>
                <NumberFormat
                  value={calculateTotal(
                    basket.map(
                      (product) =>
                        product.prixVente * product.quantityParProduct
                    )
                  )}
                  displayType={"text"}
                  thousandSeparator={false}
                  suffix={"Ar"}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </p>
              <p>
                <strong>Total en cc:</strong>{" "}
                <NumberFormat
                  value={calculateTotal(
                    basket.map((product) => product.prixParCC * product.qttByCC)
                  )}
                  displayType={"text"}
                  thousandSeparator={false}
                  suffix={"Ar"}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                />
              </p>
            </div>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default Basket;
