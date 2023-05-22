import React, { useEffect, useState, useRef } from "react";
import ProductItem from "./item";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import FromMagasin from "./FromMagasin";
import { action, getData } from "../../../../utils/lib/call";
import { Link } from "react-router-dom";
import { HISTORIQUEVENTEVENDEUR } from "../../../../constants/routes";
import { fetchProductsByFournisseur } from "../../../../store/actions/products";
import { GetAll, Data } from "../../../../context";
import { Select } from "@chakra-ui/select";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { getCommandeCVA } from "../../../../store/actions/commandes";
import Horloge from "./Horloge";
import searchByNameAndFournisseur from "../../../../filters/searchByNameAndFournisseur";
import searchByFournisseur from "../../../../filters/searchByFournisseur";
import searchByName from "../../../../filters/searchByName";
import { moment } from "moment";
import { clearFromMagasin } from "../../../../store/frommagasin/actions/frommagasin";
import { isBlocked } from "./block-it";
import { isSpecialProductHandle } from "../../../../store/functions/function";
import HeaderVendeur from "../../../HeaderVendeur";
const Products = () => {
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [idFournisseur, setIdFournisseur] = useState(2);
  const [regenerate, setRegenerate] = useState(false);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  useEffect(() => {
    if (regenerate == true) {
      dispatch(action("products").fetch());
      setRegenerate(false);
    }
    return () => {
      setRegenerate(false);
    };
  }, [regenerate]);

  useEffect(() => {
    if (!meta.isFetching) {
      setProductData(products.filter((p) => !isBlocked(p)));
    }
  }, [meta]);
  useEffect(() => {
    setProductData(
      searchByName(
        products.filter((p) => !isBlocked(p)),
        value
      )
    );
  }, [value]);

  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    const total = arr.reduce((acc, val) => acc + val, 0);
    return total;
  };

  const totalDevente = (arr) => {
    return (
      calculateTotal(
        arr.map((product) => {
          return isSpecialProductHandle(product)
            ? product.prixlitre * product.quantityParProduct
            : product.prixVente * product.quantityParProduct;
        })
      ) +
      calculateTotal(
        arr.map((product) => {
          return product.prixParCC * product.qttByCC;
        })
      )
    );
  };

  return (
    <>
      <Container>
        <HeaderVendeur />
      </Container>
      <Container>
        <div className="d-flex align-items-center flex-row mr-2">
          <div
            class="badge badge-success"
            style={{
              borderRadius: "100%",
            }}
          >
            30
          </div>
          <div className="mx-2">:Quantité</div>
          <div
            class="badge badge-warning"
            style={{
              borderRadius: "100%",
            }}
          >
            3
          </div>
          <div className="mx-2">:Conditionnement (ML)</div>
          <div
            class="badge badge-info"
            style={{
              borderRadius: "100%",
            }}
          >
            200
          </div>
          <div className="mx-2">:Reste en ML</div>
        </div>
        <Row>
          <Col xs={6}>
            <Card className="mt-2">
              <Card.Header className="bg-dark p-2 text-white d-flex text-uppercase justify-content-between align-items-center">
                <div style={{ width: "60%" }}>Produits</div>
                <div>
                  <button
                    className="btn btn-green btn-sm"
                    onClick={() => {
                      setRegenerate(true);
                      //    dispatch(clearFromMagasin());
                    }}
                  >
                    Mettre à jour
                  </button>
                </div>
              </Card.Header>
              <Card.Body>
                <div class="d-flex justify-content-between align-items-center">
                  <input
                    type="text"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    placeholder="Nom du produit"
                    className="form-control mb-2"
                  />
                </div>
                <ListGroup>
                  <div
                    style={{
                      overflowY: "auto",
                      width: "100%",
                      height: "350px",
                      maxHeight: "350px",
                      overflowX: "hidden",
                    }}
                  >
                    <div class="d-flex justify-content-start flex-wrap">
                      {productData
                        .sort(
                          (low, high) =>
                            high.quantityBruteCVA - low.quantityBruteCVA
                        )
                        .map((p) => (
                          <ProductItem product={p} />
                        ))}
                      {productData.length == 0 &&
                        "Aucune enregistrement trouvé"}
                    </div>{" "}
                  </div>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}>
            <div className=" py-2">
              <FromMagasin setRegenerate={setRegenerate} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Products;
