function strOp(str) {
  return str.toString().replace(/\s/g, "").toLowerCase();
}
const searchByNameAndFournisseur = (data, query, id) => {
  return data.filter((el) => {
    return (
      (query != "" ? strOp(el.name).includes(strOp(query)) : true) &&
      (id != "" ? el.fournisseurId == id : true)
    );
  });
};
export default searchByNameAndFournisseur;
