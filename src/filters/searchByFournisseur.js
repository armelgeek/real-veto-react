const searchByFournisseur = (data, query) => {
  return data.filter((el) => {
    return query !="" ? el.fournisseurId == query : true;
  });
};
export default searchByFournisseur;
