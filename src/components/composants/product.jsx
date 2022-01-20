import React, { useEffect, useState } from "react";
import ProductItem from "./item";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import Basket from "./basket/Basket";
const Products = () => {
  const parameterizeObjectQuery = (key, value) => {
    return '{"' + key + '":"' + value + '"}';
  };
  const products = useSelector(getData("products").value);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  useEffect(() => {
    dispatch(
      action("products").fetch(
        { replace: true },
        {
          filter: parameterizeObjectQuery("q", value)
        }
      )
    );
  }, [value]);
  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Basket />
        </Col>
        <Col xs={5}>
          <ListGroup>
            <input
              type="text"
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Nom du produit"
              className="form-control mb-2"
            />
            {products.map((p) => (
              <ProductItem product={p}/>
            ))}
            {products.length == 0 && "Aucun produit trouvé"}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
