import moment  from "moment";
/**
 *
 * Filter array by date range
 *
 */
const getByRangeDateAndProduct = (data,dateKey, now, productKey) => {
  let val = data.filter((d) => {
    var date = new Date(d[dateKey]);
    return moment(date).isSame(now, "day");
  });
  const result = [...new Set([].concat(...val.map((o) => o.contenu)))];
  let resultat = result
    .reduce((r, { id, name, type, category, quantityParProduct, qttByCC }) => {
      var temp = r.find((o) => o.id === id);
      if (!temp) {
        r.push({
          id,
          name,
          type,
          category,
          quantityParProduct,
          qttByCC,
        });
      } else {
        temp.quantityParProduct =
          parseInt(temp.quantityParProduct) + parseInt(quantityParProduct);
        temp.qttByCC = parseInt(temp.qttByCC) + parseInt(qttByCC);
      }
      return r;
    }, [])
    .sort(function (a, b) {
      return a.id > b.id;
    });
  let resufinal = resultat.find((o) => o.id === productKey);
  return resufinal;
};

export default getByRangeDateAndProduct;
