import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Row, Col, Nav } from "react-bootstrap";
import Categories from "./parametres/category/Categories";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../utils/lib/call";
import Fournisseurs from "./parametres/fournisseurs/Fournisseurs";
import Vaccinateurs from "./parametres/vaccinateur/Vaccinateurs";
import Emprunters from "./parametres/emprunter/Emprunters";
import ParametrageSuppl from "./composants/ParametrageSuppl";
import ApprovItem from "../components/ApprovItem";import Content from "../@adminlte/adminlte/Content";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
function Parametres(props) {
  const dispatch = useDispatch();
  const categories = useSelector(getData("categories").value);
  const fournisseurs = useSelector(getData("fournisseurs").value);
  const vaccinateurs = useSelector(getData("vaccinateurs").value);
  const emprunters = useSelector(getData("emprunters").value);
  const categoriesMeta = useSelector(getData("categories").meta);
  const fournisseursMeta = useSelector(getData("fournisseurs").meta);
  const vaccinateursMeta = useSelector(getData("vaccinateurs").meta);
  const empruntersMeta = useSelector(getData("emprunters").meta);

  useEffect(() => {
    dispatch(action("fournisseurs").fetch());
    dispatch(action("categories").fetch());
    dispatch(action("vaccinateurs").fetch());
    dispatch(action("emprunters").fetch());
  }, []);
  return (
      <Content>
      <ContentHeader title="Parametres générales">
        <ActiveLink title="Parametres générales"></ActiveLink>
      </ContentHeader>
      <Page>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Categories de produits</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Fournisseurs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="three">Vaccinateurs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="four">Crediteurs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="autres">Autres</Nav.Link>
              </Nav.Item>
              
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Categories categories={categories}  meta={categoriesMeta} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Fournisseurs fournisseurs={fournisseurs} meta={fournisseursMeta} />
              </Tab.Pane>
              <Tab.Pane eventKey="three">
                <Vaccinateurs vaccinateurs={vaccinateurs} meta={vaccinateursMeta}  />
              </Tab.Pane>
              <Tab.Pane eventKey="four">
                <Emprunters emprunters={emprunters} meta={empruntersMeta}  />
              </Tab.Pane>
              <Tab.Pane eventKey="autres">
                <ParametrageSuppl />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </Page>
    </Content>
  );
}

Parametres.propTypes = {};

export default Parametres;
