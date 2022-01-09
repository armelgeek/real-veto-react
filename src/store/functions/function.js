// tester l'existance d'une quantité suffisante pour en cc d'un produit dans le cva
export const canBuyCCFromCva = (product) => {
  if (product.quantityBruteCVA > 0) {
    return true;
  } else {
    if (product.quantityCCCVA > 0) {
      return true;
    } else {
      return false;
    }
  }
};
export const cantBuyCCFromCva = (product) => {
  if (product.quantityBruteCVA <= 0) {
    if (product.quantityCCCVA > 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const canBuyBruteFromCva = (product) => {
  if (product.quantityBruteCVA > 0) {
    return true;
  } else {
    return false;
  }
};
export const cantBuyBruteFromCva = (product) => {
  if (product.quantityBruteCVA == 0 || product.quantityBruteCVA < 0) {
    return true;
  } else {
    return false;
  }
};
export const cantBuyBrute = (product) => {
  return !!product.quantityBrute <= 0;
};
export const canBuyBrute = (product) => {
  return !!product.quantityBrute > 0;
};

export const getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC = (
  product
) => {
  if (isBiggerThanLastQuantityCC(product))
    return product.qttByCC - product.quantityCCCVA;
  else return product.quantityCCCVA - product.qttByCC;
};
export const minusQuantityBruteCvaWhenQttCcIsEmpty = (product) => {
  if (canBuyCCFromCva(product)) {
    product.quantityBruteCVA -= 1;
    reinitQuantityCCCva(
      product,
      product.doseDefault -
        getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product)
    );
  }
  return product;
};

export const isBiggerThanLastQuantityCC = (product) => {
  if (product.qttByCC > product.quantityCCCVA) {
    return true;
  } else {
    return false;
  }
};
export const isLowerThanLastQuantityCC = (product) => {
  if (product.qttByCC < product.quantityCCCVA) {
    return true;
  } else {
    return false;
  }
};
export const isSameOfLastQuantityCC = (product) => {
  if (product.qttByCC == product.quantityCCCVA) {
    return true;
  } else {
    return false;
  }
};
const notSatisfaisanteProductCommande = (product) => {
  return (
    product.quantityCCCVA - product.qttByCC < 0 &&
    product.quantityBruteCVA - 1 - product.quantityParProduct * 1 < 0
  );
};
export const minusQuantityCc = (product) => {
  if (product.quantityParProduct > 0) {
    if (product.qttByCC > 0) {
      if (!notSatisfaisanteProductCommande(product)) {
        //   product.quantityBruteCVA -= product.quantityParProduct;
        if (product.quantityBruteCVA < product.quantityParProduct) {
          product.quantityParProduct = product.quantityBruteCVA;
          product.quantityBruteCVA = 0;
        } else {
          product.quantityBruteCVA -= product.quantityParProduct;
        }
      }
      if (product.qttByCC >= product.doseDefault) {
        product.qttByCC = product.doseDefault;
      }
    } else {
      handleMinusProduct(product);
    }
  }
  if (canBuyCCFromCva(product)) {
    if (isBiggerThanLastQuantityCC(product)) {
      minusQuantityBruteCvaWhenQttCcIsEmpty(product);
    } else if (isSameOfLastQuantityCC(product)) {
      reinitQuantityCCCva(product, 0);
    } else if (isLowerThanLastQuantityCC(product)) {
      reinitQuantityCCCva(product, product.quantityCCCVA - product.qttByCC);
    }
  } else {
    reinitQuantityCCCva(product, 0);
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
    product.condml != 0 &&
    product.condsize != 0 &&
    product.qttccpvente != 0 &&
    product.prixqttccvente != 0
  );
};
export const isBiggerThanLastCondML = (product) => {
  return !!(product.qttByCC > product.condml);
};
export const hasCondVal = (product) => {
  return !!product.condval > 0;
};
export const minusCondValWhenQttCcIsEmpty = (product) => {
  product.condval -= 1;
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
const notSatifyCommande = (product) => {
  return (
    product.quantityCCCVA - product.qttByCC < 0 &&
    product.condval - 1 - product.quantityParProduct * 1 < 0
  );
};
export const minusCondML = (product) => {
  if (hasCondVal(product)) {
    if (product.quantityParProduct > 0) {
      if (product.qttByCC > 0) {
        if (!notSatifyCommande(product)) {
          if (product.condval < product.quantityParProduct) {
            if (product.condval - product.quantityParProduct < 0) {
              if (canBuyBruteFromCva(product)) {
                product.quantityBruteCVA -= 1;
                product.condval = product.condsize - 1;
              } else {
                product.condval = 0;
              }
            } else {
              product.quantityParProduct = product.condval;
              product.condval = 0;
            }
          } else {
            product.condval -= product.quantityParProduct;
            product.quantityCCCVA -= product.qttByCC;
          }
        }
        if (product.qttByCC >= product.condml) {
          product.qttByCC = product.condml;
        }
      } else {
        product.condval -= product.quantityParProduct;
        if (product.condval < 0) {
          if (canBuyBruteFromCva(product)) {
            product.quantityBruteCVA -= 1;
            product.condval = product.condsize - 1;
          } else {
            product.condval = 0;
          }
        }
      }
    } else {
      if (isBiggerThanLastQuantityCC(product)) {
        minusCondValWhenQttCcIsEmpty(product);
        if (product.condval == 0) {
          if (canBuyBruteFromCva(product)) {
            if (
              getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product) > 0
            ) {
              product.quantityBruteCVA -= 1;
              reinitQuantityCCCva(
                product,
                product.condml -
                  getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product)
              );
              product.condval = product.condsize - 1;
            }
          }
        } else {
          reinitQuantityCCCva(
            product,
            product.condml -
              getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product)
          );
        }
      } else {
        if (isSameOfLastQuantityCC(product)) {
          return false;
        } else if (isLowerThanLastQuantityCC(product)) {
          if (canBuyCCFromCva(product))
            product.quantityCCCVA -= product.qttByCC;
          else product.quantityCCCVA = 0;
        } else {
        }
      }
    }
  } else {
    if (canBuyBruteFromCva(product)) {
      product.quantityBruteCVA -= 1;
      reinitQuantityCCCva(
        product,
        product.condml -
          getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product)
      );
      if (product.condval == 0) product.condval = product.condsize - 1;
    } else {
      if (canBuyCCFromCva(product)) {
        if (isBiggerThanLastQuantityCC(product)) {
          if (canBuyBruteFromCva(product)) {
            product.quantityBruteCVA -= 1;
          } else {
            reinitQuantityCCCva(product, 0);
          }
        } else if (isSameOfLastQuantityCC(product)) {
          reinitQuantityCCCva(product, 0);
        } else if (isLowerThanLastQuantityCC(product)) {
          reinitQuantityCCCva(product, product.quantityCCCVA - product.qttByCC);
        }
      } else {
        reinitQuantityCCCva(product, 0);
      }
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
export const handleMinusCondML = (product) => {
  minusCondML(product);
  return product;
};
export const resetProductData = (product, cloneProduct) => {
  Object.keys(cloneProduct).forEach(function (key) {
    if (cloneProduct[key] == 0 || cloneProduct[key] == 0) {
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
