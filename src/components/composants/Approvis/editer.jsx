import React, { useState, useEffect } from "react";
import { GetOne, Data, GetAll } from "../../../utils/context/data-context";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import { useParams } from "react-router-dom";
import EditApprovisionnement from "./EditApprovisionnement";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { fetchProductsByFournisseur } from "../../../store/actions/products";
import ProductItemEditApprov from "./ProductItemEditApprov";
import searchByNameAndFournisseur from "../../../filters/searchByNameAndFournisseur";
import searchByName from "../../../filters/searchByName";
import searchByFournisseur from "../../../filters/searchByFournisseur";

export const EditerApprov = () => {
  const { id } = useParams();
  const [regenerate, setRegenerate] = useState(false);
  const dispatch = useDispatch();
  const approv = useSelector(getData("approvis").value);
  const meta = useSelector(getData("approvis").meta);
  const products = useSelector(getData("products").value);
  const metaproducts = useSelector(getData("products").meta);
  const [productData, setProductData] = useState([]);
  React.useEffect(() => {
    dispatch(action("approvis").get(id));
  }, [id]);
  const [value, setValue] = useState("");

  const [state, setState] = useState([]);
  useEffect(() => {
    if (regenerate == true) {
      dispatch(action("products").fetch());
      setRegenerate(false);
    }
    return () => {
      setRegenerate(false);
    };
  }, [regenerate]);

  const [identif, setIdentif] = useState();

  useEffect(() => {
    if (identif != null) {
      setProductData(searchByNameAndFournisseur(products, value, identif));
    } else {
      setProductData(searchByName(products, value));
    }
  }, [value]);
  useEffect(() => {
    if (value != "") {
      setProductData(searchByNameAndFournisseur(products, value, identif));
    } else {
      setProductData(searchByFournisseur(products, identif));
    }
  }, [identif]);

  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  React.useEffect(() => {
    if (!meta.isFetching) {
      setState(approv[0]?.contenu);
    }
  }, [meta]);
  useEffect(() => {
    if (!metaproducts.isFetching) {
      setProductData(products);
    }
  }, [metaproducts]);
  console.log(id);
  return (
    <Content>
      <ContentHeader title="Edition de facture">
        <ActiveLink title="Edition de facture"></ActiveLink>
      </ContentHeader>
      <Page>
        <Container>
          <Row>
            <Col xs={5}>
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
                          <ProductItemEditApprov
                            state={state}
                            setState={setState}
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
            <Col xs={7}>
              <EditApprovisionnement
                disabled={metaproducts.isFetching==true}
                state={state}
                meta={meta}
                setState={setState}
                products={products}
                approv={approv[0]}
              />
            </Col>
          </Row>
        </Container>
      </Page>
    </Content>
  );
};
