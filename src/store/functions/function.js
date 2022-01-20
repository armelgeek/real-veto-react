// tester l'existance d'une quantité suffisante pour en cc d'un produit dans le cva
export const canBuyCCFromCva = (product) => {
  return !!product.quantityCCCVA > 0;
};
export const canBuyBruteFromCva = (product) => {
  return !!product.quantityBruteCVA > 0;
};
export const cantBuyBruteFromCva = (product) => {
  return !!product.quantityBruteCVA < 0;
};
export const cantBuyBrute = (product) => {
  return !!product.quantityBrute <= 0;
};
export const canBuyBrute = (product) => {
  return !!product.quantityBrute >= 1;
};
export const isBiggerThanLastQuantityCC = (product) => {
  return !!(product.qttByCC > product.quantityCCCVA);
};
export const isLowerThanLastQuantityCC = (product) => {
  return !!(product.qttByCC < product.quantityCCCVA);
};
export const isSameOfLastQuantityCC = (product) => {
  return !!(product.qttByCC == product.quantityCCCVA);
};
export const getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC = (
  product
) => {
  if (isBiggerThanLastQuantityCC(product))
    return product.qttByCC - product.quantityCCCVA;
  else return product.quantityCCCVA - product.qttByCC;
};
export const minusQuantityBruteCvaWhenQttCcIsEmpty = (product) => {
  if (canBuyBruteFromCva(product)) product.quantityBruteCVA -= 1;
  else product.quantityBruteCVA = 0;
  return product;
};
export const minusQuantityCc = (product) => {
  if (canBuyBruteFromCva(product)) {
    if (isBiggerThanLastQuantityCC(product)) {
      minusQuantityBruteCvaWhenQttCcIsEmpty(product);
      reinitQuantityCCCva(
        product,
        product.doseDefault -
          getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product)
      );
    } else if (isSameOfLastQuantityCC(product)) {
      reinitQuantityCCCva(product, 0);
    } else {
      reinitQuantityCCCva(product, product.quantityCCCVA - product.qttByCC);
    }
  } else {
    if (product.quantityCCCVA > 0)
      reinitQuantityCCCva(product, product.quantityCCCVA - product.qttByCC);
    else {
      reinitQuantityCCCva(product, 0);
    }
  }
  return product;
};
export const reinitQuantityCCCva = (product, value) => {
  product.quantityCCCVA = value;
  return product;
};

export const soldAllStockCCCva = (product) => {
  product.quantityCCCVA = 0;
};
export const resetQuantityBruteCva = (product) => {
  product.quantityBruteCVA = 0;
};

export const handleSoldQuantityCC = (product) => {
  minusQuantityCc(product);
  return product;
};
export const isSpecialProductHandle = (product) => {
  return !!(
    product.condml != null &&
    product.condval != null &&
    product.qttccpvente != null &&
    product.prixqttccvente != null
  );
};
export const isBiggerThanLastCondML = (product) => {
  return !!(product.qttByCC > product.condml);
};
export const hasCondVal = (product) => {
  return !!product.condval >= 0;
};
export const minusCondValWhenQttCcIsEmpty = (product) => {
  if (product.condval > 0) {
    product.condval -= 1;
  } else {
    if (product.quantityBruteCVA > 0) {
      minusQuantityBruteCvaWhenQttCcIsEmpty(product);
      product.condval = product.condsize - 1;
    } else {
      product.condval = 0;
    }
  }
  return product;
};

export const reinitConditionnement = (product) => {
  product.quantityCCCVA =
    product.condml -
    getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product);
  product.condval = product.condval - 1;
  return product;
};
export const minusQuantityBruteCvaWhenQttCcCondIsEmpty = (product) => {
  if (canBuyBruteFromCva(product)) {
    product.quantityBruteCVA -= 1;
    reinitConditionnement(product);
  } else product.quantityBruteCVA = 0;
  return product;
};
export const minusCondML = (product) => {
  if (hasCondVal(product)) {
    if (isBiggerThanLastQuantityCC(product)) {
      minusCondValWhenQttCcIsEmpty(product);
      reinitQuantityCCCva(
        product,
        product.condml -
          getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product)
      );
    } else {
      if (canBuyCCFromCva(product)) product.quantityCCCVA -= product.qttByCC;
      else product.quantityCCCVA = 0;
    }
  } else {
    if (canBuyBruteFromCva(product)) {
      minusQuantityBruteCvaWhenQttCcIsEmpty(product);
      reinitQuantityCCCva(
        product,
        product.condml -
          getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product)
      );
      if (product.condval == 0) product.condval = product.condsize - 1;
    } else {
      product.quantityCCCVA -= product.qttByCC;
    }
  }
  return product;
};

export const handlePhtyoSpecific = (product) => {
  minusCondML(product);
  return product;
};
export const handleMinusProduct = (product) => {
  if (canBuyBruteFromCva(product)) {
    product.quantityBruteCVA -= product.quantityParProduct;
  } else if (cantBuyBruteFromCva(product)) {
    product.quantityBruteCVA = 0;
  }
  return product;
};
export const resetProductData = (product, cloneProduct) => {
  Object.keys(cloneProduct).forEach(function (key) {
    if (cloneProduct[key] == null || cloneProduct[key] == 0) {
      cloneProduct[key] = product[key];
    }
  });
};

export const handleSoldProduct = (product) => {
  if (canBuyBrute(product)) {
    product.quantityBrute -= product.quantityParProduct;
  } else if (cantBuyBrute(product)) {
    product.quantityBrute = 0;
  }
  return product;
};
