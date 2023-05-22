import React, { useState, useMemo, useEffect, useCallback } from "react";
import ProductItem from "../../../fromDepot/item";
import { ListGroup } from "react-bootstrap";
import searchByName from "../../../../filters/searchByName";
import { action, getData } from "../../../../utils/lib/call";
import { useSelector, useDispatch } from "react-redux";
const RenderInputSearch = ({ setValue }) => {
  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );
  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder="Nom du produit"
      className="form-control mb-2"
      style={{ width: "200px" }}
    />
  );
};
const FromMagasinProduct = () => {
  const [value, setValue] = useState("");
  const [productData, setProductData] = useState([]);
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
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

  const memorizeList = React.useMemo(() =>
    productData.map((p) => <ProductItem product={p} />)
  );
  return (
    <>
      <div class="d-flex   justify-content-between align-items-center">
        <RenderInputSearch setValue={setValue} />
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
            {memorizeList}
            {productData.length == 0 && "Aucune enregistrement trouvé"}
          </div>{" "}
        </div>
      </ListGroup>
    </>
  );
};
export default React.memo(FromMagasinProduct);
