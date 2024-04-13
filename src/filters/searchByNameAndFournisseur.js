function strOp(str) {
  return str.toString().replace(/\s/g, "").toLowerCase();
}
function copy(object) {
  var output, value, key;
  output = Array.isArray(object) ? [] : {};
  for (key in object) {
    value = object[key];
    output[key] = typeof value === "object" ? copy(value) : value;
  }
  return output;
}
const searchByNameAndFournisseur = (data, query, id) => {
  return copy(data).filter((el) => {
    return (
      (query != "" ? strOp(el.name).includes(strOp(query)) : true) &&
      (id != "" ? el.fournisseurId == id : true)
    );
  });
};
export default searchByNameAndFournisseur;
