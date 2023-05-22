import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Form from "../../utils/form";
import { action, getData } from "../../utils/lib/call";

function ParametrageSuppl() {
  const parametres = useSelector(getData("parametres").value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("parametres").get(1));
  }, []);
  return (
    <div>
      <h3 className="mb-2 text-bold title">Parametres supplementaires</h3>
      <div className="card mt-2">
        <div className="card-body">
          <Form
            id="parametrage-form"
            enableReinitialize
            initialValues={{
              nb_mois: parametres[0]?.nbMois,
              nb_produit: parametres[0]?.nbProduits,
            }}
            validations={{}}
            onSubmit={(values, form) => {
              dispatch(
                action("parametres").update({
                  id: 1,
                  nb_mois: values.nb_mois,
                  nb_produits: values.nb_produit,
                })
              );
            }}
            render={()=>(
              <Form.Element>
              <Form.Field.Input
                name="nb_mois"
                label="Nombre de mois"
                placeholder="Nombre de mois"
                type="number"
              />
              <Form.Field.Input
                name="nb_produit"
                label="Nombre de produit"
                placeholder="Nombre de produit"
                type="number"
              />
              <button type="submit" className="btn btn-success mt-2 btn-sm">
                Sauvegarder la modification
              </button>
            </Form.Element>
            )}
          />
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default ParametrageSuppl;
