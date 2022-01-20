import React, { useEffect, useState } from "react";
import ProductItem from "./item";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import ToMag from "./ToMag";
import { action, getData } from "../../../../utils/lib/call";
const Products = () => {
  const parameterizeObjectQuery = (key, value) => {
    return '{"' + key + '":"' + value + '"}';
  };
  const products = useSelector(getData("products").value);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(action("products").fetch());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      action("products").fetch(
        { replace: true },
        {
          filter: parameterizeObjectQuery("q", value),
        }
      )
    );
  }, [dispatch, value]);
  return (
    <Container>
      <Row>
        <Col xs={7}>
          <ToMag />
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
            <div
              style={{
                overflowY: "auto",
                height: "350px",
                maxHeight: "350px",
                overflowX: "hidden",
              }}
            >
              {products.map((p) => {
                return <ProductItem product={p} />;
              })}

              {products.length === 0 && "Aucun produit trouvé"}
            </div>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
