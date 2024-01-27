import React, { useEffect, useState } from "react";
import ProductItem from "./item";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import ToMag from "./ToMag";
import { action, getData } from "../../../../utils/lib/call";
import searchByName from "../../../../filters/searchByName";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [regenerate, setRegenerate] = useState(false);
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  useEffect(() => {
    if (!meta.isFetching) {
      setProductData(products);
    }
  }, [meta]);
  useEffect(() => {
    setProductData(searchByName(products, value));
  }, [value]);
  console.log('it products',products);
  return (
    <div>
      <Row>
        
        <Col xs={6}>
          <Card>
            <Card.Header className="bg-dark p-2 text-white d-flex text-uppercase justify-content-between align-items-center">
              Produits
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
                  {productData.map((p) => {
                    return <ProductItem product={p} />;
                  })}

                  {products.length === 0 && "Aucune enregistrement trouvé"}
                </div>
              </ListGroup>{" "}
            </Card.Body>{" "}
          </Card>
        </Col>
        <Col xs={6}>
          <ToMag />
        </Col>
      </Row>
    </div>
  );
};

export default Products;
