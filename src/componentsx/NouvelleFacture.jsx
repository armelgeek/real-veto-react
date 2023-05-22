import React, { useEffect, useState,useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import Content from "../@adminlte/adminlte/Content";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
import ProductItemApprov from "../components/composants/Approvis/ProductItemApprov";
import { action, getData } from "../utils/lib/call";
import Approvisionnement from "./composants/Approvis/Approvisionnement";
import { Data, GetAll } from "../context";
import { fetchProductsByFournisseur } from "../store/actions/products";
import searchByName from "../filters/searchByName";
import searchByFournisseur from "../filters/searchByFournisseur";
import searchByNameAndFournisseur from "../filters/searchByNameAndFournisseur";
import { debounce } from "lodash";
import FactureProduct from './FactureProduct';
const request = debounce((value) => {
  console.log(`request: ${value}`);
}, 1000);
const useShadowState = (init) => {
  const [state, setState] = useState(init);
  const shadow = useRef(state);
  const setShadowAndState = useCallback((nextVal) => {
    if (typeof nextVal === "function") {
      setState((s) => {
        shadow.current = nextVal(s);
        return shadow.current;
      });
    } else {
      shadow.current = nextVal;
      setState(nextVal);
    }
  }, []);
  return [state, setShadowAndState, shadow];
};
const NouvelleFacture = () => {
 
  {
    /**useEffect(() => {
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
  }, [value]);*/
  }
  {
    /** useEffect(() => {
    //recuperer la premiere ligne dans le tableau fournisseur
    dispatch(fetchProductsByFournisseur(id));
  }, [id]); */
  }
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
                    <FactureProduct/>
                  </Card.Body>
                </Card>
              </ListGroup>
            </Col>
            <Col xs={7}>
              <Approvisionnement setRegenerate={[]} />
            </Col>
          </Row>
        </Container>
      </Page>
    </Content>
  );
};

export default React.memo(NouvelleFacture);
