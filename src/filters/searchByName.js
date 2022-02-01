function strOp(str) {
    return str.toString().replace(/\s/g, "").toLowerCase();
  }
const searchByName = (data, query) => {
    return data.filter((el) => {
      return query!="" ? strOp(el.name).includes(strOp(query)):true;
    });
  };
  export default searchByName;
