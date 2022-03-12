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
const Products = () => {
  const parameterizeObjectQuery = (key, value) => {
    return '{"' + key + '":"' + value + '"}';
  };
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [idFournisseur, setIdFournisseur] = useState(2);
  const [regenerate, setRegenerate] = useState(false);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);

  const [productData, setProductData] = useState([]);
  const commandes = useSelector(getData("commandes").value);
  const metameta = useSelector(getData("commandes").meta);
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());

  useEffect(() => {
    dispatch(getCommandeCVA(deb, fin));
  }, [deb, fin]);

  useEffect(() => {
    setDeb(new Date());
    setFin(new Date());
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
      setProductData(products);
    }
  }, [meta]);
  useEffect(() => {
      setProductData(searchByName(products, value));
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
          return product.prixVente * product.quantityParProduct;
        })
      ) +
      calculateTotal(
        arr.map((product) => {
          return product.prixParCC * product.qttByCC;
        })
      )
    );
  };
  const recetteDuJour = (arr) => {
    let total = 0;
    arr.map((c) => {
      total += totalDevente(c?.contenu);
    });
    return total;
  };
  return (
    <>
      <div className="bg-dark text-white py-3 d-flex justify-content-center align-items-center">
        <h1 className="">CABINET VETERINAIRE AMBALAVAO</h1>
      </div>
      <Container fluid>
        <div className="py-2">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div className=" text-white bg-white border-1">
                <div className=" p-3 bg-thead">
                  <span style={{ fontSize: "15px" }}>
                    Total:{" "}
                    {metameta.isFetching
                      ? "0 Ar"
                      : displayMoney(recetteDuJour(commandes))}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Horloge />
            </div>
            <div className="bg-thead">
              <Link className="btn btn-primary" to={HISTORIQUEVENTEVENDEUR}>
                Voir l'historique de vente
              </Link>
            </div>
          </div>
          <Row>
            <Col xs={8}>
              <Card className="mt-2">
                <Card.Header className="bg-dark p-2 text-white d-flex text-uppercase justify-content-between align-items-center">
                  <div style={{ width: "80%" }}>Produits</div>
                  <div>
                    <button
                      className="btn btn-green btn-sm"
                      onClick={() => {
                        setValue("");
                        setRegenerate(true);
                        
                      }}
                    >
                      Mettre à jour
                    
                    </button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div class="d-flex  px-5  justify-content-between align-items-center">
                    <input
                      type="text"
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      placeholder="Nom du produit"
                      className="form-control mb-2"
                      style={{ width: "200px" }}
                    />{" "}
                    
                  </div>
                  <ListGroup>
                    <div
                      style={{
                        overflowY: "auto",
                        height: "350px",
                        maxHeight: "350px",
                        overflowX: "hidden",
                      }}
                    >
                      <div class="d-flex justify-content-center flex-wrap">
                        {productData.map((p) => (
                          <ProductItem product={p} />
                        ))}
                        {productData.length == 0 && "Aucune enregistrement trouvé"}
                      </div>{" "}
                    </div>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={4}>
              <div className=" py-2">
                <FromMagasin setRegenerate={setRegenerate} />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Products;
