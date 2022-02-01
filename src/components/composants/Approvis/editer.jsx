import React,{useState,useEffect} from "react";
import { GetOne, Data,GetAll } from "../../../utils/context/data-context";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import { useParams } from "react-router-dom";
import EditApprovisionnement from './EditApprovisionnement';
import { Container, Row, Col, ListGroup,Card } from "react-bootstrap";
import { fetchProductsByFournisseur } from "../../../store/actions/products";
import ProductItemEditApprov from "./ProductItemEditApprov";

export const EditerApprov = () => {
  const { id } = useParams();
  const [regenerate,setRegenerate]=useState(false);
  const dispatch = useDispatch();
  const approv = useSelector(getData("approvis").value);
  const meta = useSelector(getData("approvis").meta);

  React.useEffect(() => {
    dispatch(action("approvis").get(id));
  }, [id]);
  const parameterizeObjectQuery = (key, value) => {
    return '{"' + key + '":"' + value + '"}';
  };
  const products = useSelector(getData("products").value);
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

  const [identif, setIdentif] = useState(2);
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
    dispatch(fetchProductsByFournisseur(identif));
  }, [identif]);
  React.useEffect(() => {
   if(meta.isFetching){
    setState(approv[0]?.contenu);
   }
  }, [meta]);
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
                    {products.map((p) => (
                      <ProductItemEditApprov state={state} setState={setState} product={p}  />
                    ))}
                    {products.length == 0 && "Aucun produit trouvé"}
                  </>{" "}
                </div>
              </Card.Body>
            </Card>
          </ListGroup>
        </Col>
        <Col xs={7}>
          <EditApprovisionnement  state={state} meta={meta} setState={setState} approv={approv[0]} />
        </Col>
      </Row>
   
      </Container>
      </Page>
    </Content>
    
  );
};
