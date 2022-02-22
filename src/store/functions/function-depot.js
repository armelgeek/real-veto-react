// tester l'existance d'une quantité suffisante pour en cc d'un produit dans le cva
export const canBuyCCFromDepot = (product) => {
  return !!product.quantityCC > 0;
};
export const canBuyBruteFromDepot = (product) => {
  return !!product.quantityBrute > 0;
};
export const cantBuyBruteFromDepot = (product) => {
  return !!product.quantityBrute < 0;
};

export const isBiggerThanLastQuantityCCDepot = (product) => {
  return !!(product.qttByCCDepot > product.quantityCC);
};
export const isLowerThanLastQuantityCCDepot = (product) => {
  return !!(product.qttByCCDepot < product.quantityCCCVA);
};
export const isSameOfLastQuantityCCDepot = (product) => {
  return !!(product.qttByCCDepot == product.quantityCC);
};
export const getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCCDepot = (
  product
) => {
  if (isBiggerThanLastQuantityCCDepot(product))
    return product.qttByCCDepot - product.quantityCC;
  else return product.quantityCC - product.qttByCCDepot;
};
export const minusQuantityBruteWhenQttCcIsEmptyDepot = (product) => {
  if (canBuyBruteFromDepot(product)) product.quantityBrute -= 1;
  else product.quantityBrute = 0;
  return product;
};
export const minusQuantityCcDepot = (product) => {


  if (canBuyBruteFromDepot(product)) {
    console.log('hello ici');
    if (isBiggerThanLastQuantityCCDepot(product)) {

      minusQuantityBruteWhenQttCcIsEmptyDepot(product);
      reinitQuantityCCDepot(
        product,
        product.doseDefault -
          getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCCDepot(product)
      );
    } else if (isSameOfLastQuantityCCDepot(product)) {
      reinitQuantityCCDepot(product, 0);
    } else {
      reinitQuantityCCDepot(product, product.quantityCC - product.qttByCCDepot);
    }
  } else {
    if (product.quantityCC > 0)
      reinitQuantityCCDepot(product, product.quantityCC - product.qttByCCDepot);
    else {
      reinitQuantityCCDepot(product, 0);
    }
  }
  return product;
};
export const reinitQuantityCCDepot = (product, value) => {
  product.quantityCC = value;
  return product;
};

export const soldAllStockCCDepot = (product) => {
  product.quantityCC = 0;
};
export const resetQuantityBrute = (product) => {
  product.quantityBrute = 0;
};

export const handleSoldQuantityCCDepot = (product) => {
  minusQuantityCcDepot(product);
  return product;
};
export const isSpecialProductHandleDepot = (product) => {
  return !!(
    product.condmldepot != null &&
    product.condvaldepot != null &&
    product.qttccpventedepot != null &&
    product.prixqttccventedepot != null
  );
};
export const isBiggerThanLastCondML = (product) => {
  return !!(product.qttByCCDepot > product.condmldepot);
};
export const hasCondValDepot = (product) => {
  return !!product.condvaldepot >= 0;
};
export const minusCondValWhenQttCcIsEmptyDepot = (product) => {
  if (product.condvaldepot > 0) {
    product.condvaldepot -= 1;
  } else {
    if (product.quantityBrute> 0) {
      minusQuantityBruteWhenQttCcIsEmptyDepot(product);
      product.condvaldepot = product.condsizedepot - 1;
    } else {
      product.condvaldepot = 0;
    }
  }
  return product;
};

export const reinitConditionnementDepot = (product) => {
  product.quantityCC =
    product.condmldepot -
    getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCCDepot(product);
  product.condvaldepot = product.condvaldepot - 1;
  return product;
};
export const minusQuantityBruteWhenQttCcCondIsEmptyDepot = (product) => {
  if (canBuyBruteFromDepot(product)) {
    product.quantityBrute -= 1;
    reinitConditionnementDepot(product);
  } else product.quantityBrute = 0;
  return product;
};
export const minusCondMLDepot = (product) => {
  if (hasCondValDepot(product)) {
    if (isBiggerThanLastQuantityCCDepot(product)) {
      minusCondValWhenQttCcIsEmptyDepot(product);
      reinitQuantityCCDepot(
        product,
        product.condmldepot -
          getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCCDepot(product)
      );
    } else {
      if (canBuyCCFromDepot(product)) product.quantityCC -= product.qttByCCDepot;
      else product.quantityCC= 0;
    }
  } else {
    if (canBuyBruteFromDepot(product)) {
      minusQuantityBruteWhenQttCcIsEmptyDepot(product);
      reinitQuantityCCDepot(
        product,
        product.condmldepot -
          getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCCDepot(product)
      );
      if (product.condvaldepot == 0) product.condvaldepot = product.condsizedepot - 1;
    } else {
      product.quantityCC -= product.qttByCCDepot;
    }
  }
  return product;
};

export const handlePhtyoSpecificDepot = (product) => {
  minusCondMLDepot(product);
  return product;
};
export const handleMinusProductDepot = (product) => {
  if (canBuyBruteFromDepot(product)) {
    product.quantityBrute -= product.quantityParProductDepot;
  } else if (cantBuyBruteFromDepot(product)) {
    product.quantityBrute = 0;
  }
  return product;
};
export const resetProductDataDepot = (product, cloneProduct) => {
  Object.keys(cloneProduct).forEach(function (key) {
    if (cloneProduct[key] == null || cloneProduct[key] == 0) {
      cloneProduct[key] = product[key];
    }
  });
};

export const handleSoldProductDepot = (product) => {
  if (canBuyBruteFromDepot(product)) {
    product.quantityBrute -= product.quantityParProductDepot;
  } else if (cantBuyBruteFromDepot(product)) {
    product.quantityBrute = 0;
  }
  return product;
};
