import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import {useHistory} from "react-router-dom";
import ToMagItem from "./ToMagItem";
//import { NumberFormat } from 'react-number-format';
import { action, getData } from "../../../../utils/lib/call";
import { MgToMl } from "../../../../hooks/convertisseur";
import { clearMagasin } from "../../../../store/tomagasin/actions/tomagasin";
import { displayMoney } from "../../../../utils/functions";

import { HISTORIQUESORTIECVA } from '../../../../constants/routes';
import {
  canBuyBrute,
  handleSoldProduct,
} from "../../../../store/functions/function";
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  const total = arr.reduce((acc, val) => acc + val, 0);
  return total;
};
const ToMag = () => {
  const { tomagasins } = useSelector((state) => ({
    tomagasins: state.tomagasins,
  }));

  const date = new Date();
  const [dateCom,setDateCom]=useState(date);
  const history = useHistory();
  const meta = useSelector(getData("commandes").meta);
  const metaSortieDepot = useSelector(getData("sortiedepots").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("commandes").fetch());
    dispatch(action("sortiedepots").fetch());
  }, []);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();

  const validerCommande = () => {
    dispatch(
      action("commandes").create({
        id: Number(meta.nextId),
        contenu: tomagasins,
        type: "cva",
        sorte: "sortie",
        refSortie: `CVA_${meta.nextId}_${day}_${monthIndex}_${year}_${hours}_${minutes}_${second}`,
        status: true,
        dateCom: dateCom!=null ? dateCom : date,
      })
    );

    tomagasins.forEach((element) => {
      if (canBuyBrute(element)) {
        handleSoldProduct(element, element.quantityParProduct);
        element.quantityBruteCVA += Number(element.quantityParProduct);
        element.quantityParProduct = 0;
      }else{
        element.quantityParProduct = 0;
      }
      {
        /**   element.quantityBrute -=  Number(element.quantityParProduct);
      element.quantityBruteCVA += Number(element.quantityParProduct);
      //  element.refSortie=`CVA_${meta.nextId}_${day}_${monthIndex}_${year}_${hours}_${minutes}_${second}`;
      
      dispatch(
        action("sortiedepots").create({
          id: Number(metaSortieDepot.nextId),
          productId: element.id,
          status: false, //true: le quantite commandé à expirer il faut passer au suivants
          refSortie: `CVA_${meta.nextId}_${day}_${monthIndex}_${year}_${hours}_${minutes}_${second}`,
          quantiteSortie: element.quantityParProduct,
        })
      );
      if (element.quantityBruteCVA !== 0) {
        element.quantityParProduct = 1;
      }*/
      }
      dispatch(action("products").update(element));
    });

    dispatch(clearMagasin());
    //console.log(basket);
    history.push(HISTORIQUESORTIECVA);
  };

  const annulerCommande = () => {
    if (tomagasins.length !== 0) {
      dispatch(clearMagasin());
    }
  };

  return (
    <>
      <Card>
        <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
          <div>
            Depot to Magasin (
            {` ${tomagasins.length} ${
              tomagasins.length > 1 ? "articles" : "article"
            }`}
            )
          </div>
        </Card.Header>
        <Card.Body>
        
          
          <div class="form-group">
            <label>Date de sortie :</label>
            <div>
              <input
                type="date"
                onChange={(e) => setDateCom(e.target.value)}
                value={dateCom}
                className="form-control"
              />
            </div>
          </div>
          {tomagasins.length <= 0 && (
            <div class="alert alert-success ">Aucune produit !!!</div>
          )}
          {tomagasins?.map((product, i) => (
            
            <ToMagItem
              key={`${product?.id}_${i}`}
              product={product}
              tomagasin={tomagasins}
              dispatch={dispatch}
            />
          ))}
          {tomagasins.length > 0 && (
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-green btn-sm mr-2"
                disabled={tomagasins.length === 0}
                onClick={validerCommande}
                type="button"
              >
                Valider l'operation
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={annulerCommande}
                type="button"
              >
                <span>Annuler</span>
              </button>
            </div>
          )}
        </Card.Body>
        {tomagasins.length > 0 && (
          <Card.Footer className="d-flex justify-content-between">
            <div>
              <p className="basket-total-amount">
                <strong>Total brute:</strong>
                {displayMoney(
                  calculateTotal(
                    tomagasins.map(
                      (product) =>
                        product.prixVente * product.quantityParProduct
                    )
                  )
                )}
              </p>
            </div>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default ToMag;
