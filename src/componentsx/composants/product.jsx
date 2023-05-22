import React, { useEffect, useState } from "react";
import ProductItem from "./item";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { Container, Row, Card, Col, ListGroup } from "react-bootstrap";
import Basket from "./basket/Basket";
import searchByName from "../../filters/searchByName";
const Products = () => {
  const parameterizeObjectQuery = (key, value) => {
    return '{"' + key + '":"' + value + '"}';
  };

  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    if (!meta.isFetching) {
      setProductData(products);
    }
  }, [meta]);
  useEffect(() => {
    setProductData(searchByName(products, value));
  }, [value]);
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Basket />
        </Col>
        <Col xs={5}>
          <Card className="mt-2">
            <Card.Header className="bg-dark p-2 text-white d-flex text-uppercase justify-content-between align-items-center">
              <div style={{ width: "80%" }}>Produits</div>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                <input
                  type="text"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  placeholder="Nom du produit"
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
                  {productData.map((p) => (
                    <ProductItem product={p} />
                  ))}
                  {productData.length == 0 && "Aucune enregistrement trouvé"}
                </div>
              </ListGroup>{" "}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
