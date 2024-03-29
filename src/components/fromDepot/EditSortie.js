import React, { useState } from "react";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../@adminlte/adminlte/Content/Page";
import Content from "../../@adminlte/adminlte/Content/index";
import { Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import searchByNameAndFournisseur from "../../filters/searchByNameAndFournisseur";
import searchByName from "../../filters/searchByName";
import searchByFournisseur from "../../filters/searchByFournisseur";
import { GetAll,Data } from "../../utils/context/data-context";
import EditFromDepot from './EditFromDepot';
import EditFromDepotItem from './EditFromDepotItem';
import EditProductItemDepot from "./edit-item";

const EditSortie = () => {
  
  const { id } = useParams();
  const [regenerate, setRegenerate] = useState(false);
  const dispatch = useDispatch();
  const commandes = useSelector(getData("commandes").value);
  const metacommandes = useSelector(getData("commandes").meta);
  const products = useSelector(getData("products").value);
  const metaproducts = useSelector(getData("products").meta);
  const [productData, setProductData] = useState([]);
  React.useEffect(() => {
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

  React.useEffect(() => {setProductData(searchByName(products, value));
  }, [value]);

  React.useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  
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
  const setValueOf = (val)=> {
    setState(val)
  }
  return (
    <Content>
      <ContentHeader title="Editer un bon de commande">
        <ActiveLink title="Editer un bon de commande"></ActiveLink>
      </ContentHeader>
      <Page>
        <Container>
          <Row>
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
                          <EditProductItemDepot
                          state={state}
                          setState={setState}
                          product={p}
                        />
                        ))}
                        {productData.length == 0 && "Aucune enregistrement trouvé"}
                      </>{" "}
                    </div>
                  </Card.Body>
                </Card>
              </ListGroup>
            </Col>
            <Col xs={6}>
                <EditFromDepot
                disabled={metaproducts.isFetching}
                  state={state}
                  meta={metacommandes}
                  setState={setState}
                  products={products}
                  commandes={commandes[0]}
                />
            </Col>
          </Row>
        </Container>
      </Page>
    </Content>
  );
};

export default EditSortie;
