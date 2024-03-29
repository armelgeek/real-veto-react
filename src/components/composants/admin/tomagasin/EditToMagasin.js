import React, { useState } from "react";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import Content from "../../../../@adminlte/adminlte/Content/index";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { action, getData } from "../../../../utils/lib/call";
import searchByNameAndFournisseur from "../../../../filters/searchByNameAndFournisseur";
import searchByName from "../../../../filters/searchByName";
import searchByFournisseur from "../../../../filters/searchByFournisseur";
import { GetAll, Data } from "../../../../utils/context/data-context";
import EditTo from "./EditTo";
import EditProductItemToMag from "./edit-item";
import { HISTORIQUEVENTEVENDEUR } from "../../../../constants/routes";

const EditToMagasin = () => {
  const { id } = useParams();
  const history = useHistory();
  const [regenerate, setRegenerate] = useState(false);
  const dispatch = useDispatch();
  const commandes = useSelector(getData("commandes").value);
  const commandesclone = useSelector(getData("commandesclone").value);
  const metacommandes = useSelector(getData("commandes").meta);
  const products = useSelector(getData("products").value);
  const metaproducts = useSelector(getData("products").meta);
  const [productData, setProductData] = useState([]);
  React.useEffect(() => {
    dispatch(action("commandesclone").get(id));
    dispatch(action("commandes").get(id));
  }, [id]);
  const [value, setValue] = useState("");

  const [state, setState] = useState([]);
  React.useEffect(() => {
    if (regenerate == true) {
      dispatch(action("products").fetch());
      setRegenerate(false);
    }
    return () => {
      setRegenerate(false);
    };
  }, [regenerate]);

  const [identif, setIdentif] = useState();

  React.useEffect(() => {
    if (identif != null) {
      setProductData(searchByNameAndFournisseur(products, value, identif));
    } else {
      setProductData(searchByName(products, value));
    }
  }, [value]);
  React.useEffect(() => {
    if (value != "") {
      setProductData(searchByNameAndFournisseur(products, value, identif));
    } else {
      setProductData(searchByFournisseur(products, identif));
    }
  }, [identif]);

  React.useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  React.useEffect(() => {
    //recuperer la premiere ligne dans le tableau fournisseur
    // dispatch(fetchProductsByFournisseur(identif));
  }, [identif]);
  React.useEffect(() => {
    if (!metacommandes.isFetching) {
      setState(commandes[0]?.contenu);
    }
  }, [metacommandes]);
  React.useEffect(() => {
    if (!metaproducts.isFetching) {
      setProductData(products);
    }
  }, [metaproducts]);
  const setValueOf = (val) => {
    setState(val);
  };
  return (
    <Content>
      <ContentHeader title="Edition d'un sortie vers magasin">
        <ActiveLink title="Edition d'un sortie vers magasin"></ActiveLink>
      </ContentHeader>
      <Page>
        <Row className="py-2">
          <Col xs={6}>
            <ListGroup>
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center bg-dark text-white">
                  Produits
                </Card.Header>
                <Card.Body>
                  <input
                    type="text"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    placeholder="Rechercher un produit"
                    className="form-control mb-2"
                  />
                  <GetAll model="fournisseurs">
                    <Data>
                      {({ data, meta }) => (
                        <div className="my-2">
                          <select
                            className="form-control"
                            selected={identif == 2}
                            onChange={(e) => {
                              setIdentif(e.target.value);
                            }}
                          >
                            <option value="">
                              Selectionner un fournisseur
                            </option>
                            {data.map((d) => (
                              <option value={d.id}>{d.name}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </Data>
                  </GetAll>
                  <div
                    style={{
                      overflowY: "auto",
                      height: "350px",
                      maxHeight: "350px",
                      overflowX: "hidden",
                    }}
                  >
                    <>
                      {productData.map((p) => (
                        <EditProductItemToMag
                          state={state}
                          setState={setState}
                          cloneCommandes={commandesclone[0]}
                          product={p}
                        />
                      ))}
                      {productData.length == 0 &&
                        "Aucune enregistrement trouvé"}
                    </>{" "}
                  </div>
                </Card.Body>
              </Card>
            </ListGroup>
          </Col>
          <Col xs={6}>
            <EditTo
              disabled={metaproducts.isFetching}
              state={state}
              meta={metacommandes}
              cloneCommandes={commandesclone[0]}
              setState={setState}
              realstock={products}
              commandes={commandes[0]}
            />
          </Col>
        </Row>
      </Page>
    </Content>
  );
};

export default EditToMagasin;
