import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup,Card } from "react-bootstrap";
import Content from "../@adminlte/adminlte/Content";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
import ProductItemApprov from "../components/composants/Approvis/ProductItemApprov";
import { action, getData } from "../utils/lib/call";
import Approvisionnement from "./composants/Approvis/Approvisionnement";
import { Data, GetAll } from "../context";
import { fetchProductsByFournisseur } from "../store/actions/products";

const NouvelleFacture = () => {
  const parameterizeObjectQuery = (key, value) => {
    return '{"' + key + '":"' + value + '"}';
  };
  const products = useSelector(getData("products").value);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [regenerate, setRegenerate] = useState(false);
  useEffect(() => {
    if (regenerate == true) {
      dispatch(action("products").fetch());
      setRegenerate(false);
    }
    return () => {
      setRegenerate(false);
    };
  }, [regenerate]);

  const [id, setId] = useState(2);
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  useEffect(() => {
    if (value != "") {
      dispatch(
        action("products").fetch(
          { replace: true },
          {
            filter: parameterizeObjectQuery("q", value),
          }
        )
      );
    }
  }, [value]);
  useEffect(() => {
    //recuperer la premiere ligne dans le tableau fournisseur
    dispatch(fetchProductsByFournisseur(id));
  }, [id]);

  return (
    <Content>
      <ContentHeader title="Nouvelle facture">
        <ActiveLink title="Nouvelle Facture"></ActiveLink>
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
                              selected={id == 2}
                              onChange={(e) => {
                                setId(e.target.value);
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
                        {products.map((p) => (
                          <ProductItemApprov product={p} />
                        ))}
                        {products.length == 0 && "Aucun produit trouvé"}
                      </>{" "}
                    </div>
                  </Card.Body>
                </Card>
              </ListGroup>
            </Col>
            <Col xs={7}>
              <Approvisionnement setRegenerate={setRegenerate} />
            </Col>
          </Row>
        </Container>
      </Page>
    </Content>
  );
};

export default NouvelleFacture;
