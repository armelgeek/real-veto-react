import React from "react";
import { action, getData } from "../utils/lib/call";
import { useSelector, useDispatch } from "react-redux";
import ProductItemApprov from "./composants/Approvis/ProductItemApprov";
import { reactFastCompare } from "react-fast-compare";
import searchByName from "../filters/searchByName";
import debouce from "lodash.debounce";
import useApprov from '../hooks/useApprov';

const FactureProduct = () => {
  const approvisionnements = useSelector((state) => state.approvisionnements);
  const products = useSelector(getData("products").value);
  const meta = useSelector(getData("products").meta);
  const dispatch = useDispatch();
  const { isItemOnApprov, addToApprov } = useApprov(
    approvisionnements,
    dispatch
  );
  const [productData, setProductData] = React.useState([]);
  const [regenerate, setRegenerate] = React.useState(false);
  React.useEffect(() => {
    if (regenerate == true) {
      dispatch(action("products").fetch());
      setRegenerate(false);
    }
    return () => {
      setRegenerate(false);
    };
  }, [regenerate]);

  React.useEffect(() => {
    dispatch(action("products").fetch());
  }, []);
  React.useEffect(() => {
    if (!meta.isFetching) {
      setProductData(products);
    }
  }, [meta]);
  const handleAddToApprov = React.useCallback((product) => {
    if (addToApprov) addToApprov(product);
  }, [addToApprov]);
  const renderProduct = React.useMemo(
    () => productData.map((p) => <ProductItemApprov key={p.id} product={p} isItemOnApprov={isItemOnApprov} handleAddToApprov={handleAddToApprov} />),
    [productData]
  );
  const handleChange = (e) => {
    if (e.target != null) {
      setProductData(searchByName(products, e.target.value));
    }
  };
  const debouncedResults = React.useMemo(() => {
    return debouce(handleChange, 300);
  }, [handleChange]);

  return (
    <div>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            handleChange(e);
          }
        }}
        placeholder="Taper sur entrer pour valider votre recherche"
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
        <>
          {renderProduct}
          {productData.length == 0 && "Aucun produit trouvé"}
        </>{" "}
      </div>
    </div>
  );
};
export default React.memo(FactureProduct, reactFastCompare);
