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
        if (product.quantityBruteCVA - product.quantityParProduct < 0) {
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
      if (product.quantityBruteCVA - product.quantityParProduct < 0) {
        product.quantityParProduct = product.quantityBruteCVA;
        product.quantityBruteCVA = 0;
      } else {
        product.quantityBruteCVA -= product.quantityParProduct;
      }
    }
  }
  if (canBuyCCFromCva(product)) {
    if (isBiggerThanLastQuantityCC(product)) {
      if (product.quantityBruteCVA - 1 >= 0) {
        minusQuantityBruteCvaWhenQttCcIsEmpty(product);
      } else {
        product.quantityBruteCVA = 0;
        reinitQuantityCCCva(product, product.quantityCCCVA);
      }
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
    console.log("condval");
    if (product.qttbylitre > 0) {
      if (product.quantityParProduct > 0) {
        if (product.qttByCC > 0) {
          //  1 1 10
          if (product.quantityBruteCVA - product.qttbylitre >= 0) {
            product.quantityBruteCVA =
              Number(product.quantityBruteCVA) - product.qttbylitre;
          } else {
            product.quantityBruteCVA = 0;
          }
          if (product.condval - product.quantityParProduct < 0) {
            product.condval =
              product.condsize - product.quantityParProduct + product.condval;
            product.quantityBruteCVA -= 1;
            product.quantityCCCVA =
              product.condml - Number(product.quantityCCCVA) + product.qttByCC;
          } else {
            product.condval -= product.quantityParProduct;
          }
          if (product.quantityCCCVA - product.qttByCC > 0) {
            /** product.quantityCCCVA =
              Number(product.quantityCCCVA) - product.qttByCC;  */
          } else if (product.quantityCCCVA - product.qttByCC == 0) {
            product.quantityCCCVA = 0;
          } else {
            console.log("ici");
            if (product.condval - 1 < 0) {
              if (product.quantityBruteCVA - 1 > 0) {
                let difference =
                  product.qttByCC - Number(product.quantityCCCVA);
                product.condval = product.condsize - 1;
                product.quantityBruteCVA -= 1;
                product.quantityCCCVA = product.condml - difference;
              } else if (product.condval - 1 == 0) {
                product.condval = 0;
                product.quantityCCCVA =
                  product.condml -
                  product.qttByCC -
                  Number(product.quantityCCCVA);
              }
            } else {
              if (Number(product.quantityCCCVA) - product.qttByCC < 0) {
                let difference =
                  product.qttByCC - Number(product.quantityCCCVA);
                product.condval -= 1;
                product.quantityCCCVA = product.condml - difference;
              } else if (Number(product.quantityCCCVA) - product.qttByCC > 0) {
                product.quantityCCCVA -= product.qttByCC;
              } else if (Number(product.quantityCCCVA) - product.qttByCC == 0) {
                product.quantityCCCVA = 0;
              }
            }
          }
        } else {
          // 1 1 0
          if (product.condval - product.quantityParProduct < 0) {
            product.condval =
              product.condsize - product.quantityParProduct + product.condval;
            product.quantityBruteCVA -= 1;
            product.quantityCCCVA =
              product.condml - Number(product.quantityCCCVA) + product.qttByCC;
          }
          if (product.quantityBruteCVA - product.qttbylitre >= 0) {
            product.quantityBruteCVA =
              Number(product.quantityBruteCVA) - product.qttbylitre;
          } else {
            product.quantityBruteCVA = 0;
          }
        }
      } else {
        if (product.qttByCC > 0) {
          // 1 0 10
          if (product.quantityCCCVA - product.qttByCC > 0) {
            if (product.quantityBruteCVA - product.qttbylitre >= 0) {
              product.quantityBruteCVA =
                Number(product.quantityBruteCVA) - product.qttbylitre;
            } else {
              product.quantityBruteCVA = 0;
            }
            product.quantityCCCVA =
              Number(product.quantityCCCVA) - product.qttByCC;
          } else {
            if (product.condval - 1 < 0) {
              if (product.quantityBruteCVA - 1 >= 0) {
                product.condval = product.condsize - 1;
                product.quantityBruteCVA -= 1;
              }
            } else {
              if (product.quantityCCCVA - product.qttByCC < 0) {
                product.condval -= 1;
                product.quantityCCCVA = 10;
                product.condml -
                  Number(product.quantityCCCVA) -
                  product.qttByCC;
              } else if (product.quantityCCCVA - product.qttByCC > 0) {
                product.quantityCCCVA -= product.qttByCC;
              } else if (product.quantityCCCVA - product.qttByCC == 0) {
                product.quantityCCCVA = 0;
              }
              product.condval -= 1;
              product.quantityCCCVA =
                product.condml -
                Number(product.quantityCCCVA) +
                product.qttByCC;
            }
          }
        } else {
          // 1 0 0
          if (product.quantityBruteCVA - product.qttbylitre >= 0) {
            product.quantityBruteCVA =
              Number(product.quantityBruteCVA) - product.qttbylitre;
          } else {
            product.quantityBruteCVA = 0;
          }
        }
      }
    } else {
      if (product.quantityParProduct > 0) {
        if (product.qttByCC > 0) {
          if (product.condval - product.quantityParProduct < 0) {
            if (product.quantityBruteCVA - 1 >= 0) {
              product.quantityBruteCVA -= 1;
              product.condval = product.condsize - 1;
            } else {
              product.quantityBruteCVA = 0;
              product.condval = 0;
            }
          }
          if (product.condval - product.quantityParProduct == 0) {
            product.condval = 0;
          } else {
            product.condval -= product.quantityParProduct;
          }

          if (Number(product.quantityCCCVA) - product.qttByCC < 0) {
            let difference = product.qttByCC - Number(product.quantityCCCVA);
            product.condval -= 1;
            product.quantityCCCVA = product.condml - difference;
          } else if (Number(product.quantityCCCVA) - product.qttByCC > 0) {
            product.quantityCCCVA -= product.qttByCC;
          } else if (Number(product.quantityCCCVA) - product.qttByCC == 0) {
            product.quantityCCCVA = 0;
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
                getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(product) >
                0
              ) {
                product.quantityBruteCVA -= 1;
                reinitQuantityCCCva(
                  product,
                  product.condml -
                    getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(
                      product
                    )
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
    }
  } else {
    /** if (canBuyBruteFromCva(product)) {
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
    } */
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

export const canBuy = (product) => {
  if (isSpecialProductHandle(product)) {
  }
  return true;
};
export const oneSoldOneReturn = (product, initialCommande) => {
  // 1 vendu,1 retour
  let etat = "none";
  if (product.quantityParProduct > 0) {
    if (product.quantityBruteCVA >= 0) {
      if (product.quantityParProduct == initialCommande.quantityParProduct) {
        product.quantityBruteCVA += product.quantityParProduct;
        product.quantityParProduct = 0;
        etat = "same-qtt";
      } else if (
        initialCommande.quantityParProduct > product.quantityParProduct
      ) {
        let diff =
          initialCommande.quantityParProduct - product.quantityParProduct;
        initialCommande.quantityParProduct -= diff;
        initialCommande.quantityBruteCVA += diff;
        product.quantityParProduct = 0;
        product.quantityBruteCVA += diff;
        etat = "minus-qtt";
        // qttParcommande > qttactuel =  (qttParcommande - qttactuel), commande quantité - (qttParcommande - qttactuel), +(qttParcommande - qttactuel) stock
        // 3 > 2 = 3 - 2 = 1, qttcommande -= 1,quantiteProduit (qttParcommande - qttactuel)
      } else if (
        initialCommande.quantityParProduct < product.quantityParProduct
      ) {
        let differ =
          product.quantityParProduct - initialCommande.quantityParProduct;
        // qttParcommande < qttactuel =  (qttactuel - qttParcommande), commande quantité + (qttactuel - qttParcommande), -(qttParcommande - qttactuel) stock
        // 4 < 5 = 5 - 4 = 1,qttcommande +=1 , stock + (qttParcommande - qttactuel)
        initialCommande.quantityParProduct += differ;
        initialCommande.quantityBruteCVA -= differ;
        product.quantityParProduct = 0;
        product.quantityBruteCVA -= differ;
        etat = "add-qtt";
      }
    }
  }
  return { product, initialCommande, etat };
};

export const mlSoldIncrement = (product, initialCommande) => {
  let etat = "none";
  if (product.qttByCC > 0) {
    if (product.quantityParProduct > 0) {
      product.quantityBruteCVA += product.quantityParProduct;
      product.quantityParProduct = 0;
    }
    if (product.quantityCCCVA >= 0) {
      if (product.qttByCC == initialCommande.qttByCC) {
        etat = "same-qtt-cc";
      } else if (initialCommande.qttByCC > product.qttByCC) {
        etat = "minus-qtt-cc";
        // 90 20
        let diff = initialCommande.qttByCC - product.qttByCC;
        // 90 - 20 = 70
        initialCommande.qttByCC -= diff;
        // 20
        if (product.quantityCCCVA + diff > product.doseDefault) {
          // 40 + 70 =110 > 100
          initialCommande.quantityBruteCVA += 1;
          // + 1 boite
          initialCommande.quantityCCCVA =
            product.quantityCCCVA + diff - product.doseDefault;
          // 110 - 100 = 10
        } else {
          // 40 + 14 = 64 < 100

          initialCommande.quantityCCCVA += diff;
        }
        //initialCommande.qttByCC -= diff;
        //initialCommande.quantityCCCVA += diff;
        // 21 > 20
      } else if (initialCommande.qttByCC < product.qttByCC) {
        // 19 < 20
        etat = "add-qtt-cc";
        let differ = product.qttByCC - initialCommande.qttByCC;
        // 20 - 10 = 10
        initialCommande.qttByCC += differ;
        // 10 +10 = 20
        if (product.quantityCCCVA - differ > 0) {
          // 40 - 10 = 30
          initialCommande.quantityCCCVA -= differ;
        } else {
          // 40 - 40 = 0
          product.quantityCCCVA = 0;
        }
      }
      if (product.quantityCCCVA + product.qttByCC > product.doseDefault) {
        //20 + reste ML > dosedefault  qttbrute +1, qttcc = quantityCCCVA + qttByCC - doseDefault
        // 90 + 20 > 100
        product.quantityBruteCVA += 1;
        product.quantityCCCVA =
          product.quantityCCCVA + product.qttByCC - product.doseDefault;
      } else {
        // 20 + 20 < 100
        product.quantityCCCVA += product.qttByCC;
      }
      product.qttByCC = 0;
    }
  } else {
    if (product.quantityParProduct > 0) {
      if (product.quantityBruteCVA >= 0) {
        if (product.quantityParProduct == initialCommande.quantityParProduct) {
          product.quantityBruteCVA += product.quantityParProduct;
          product.quantityParProduct = 0;
          etat = "same-qtt";
        } else if (
          initialCommande.quantityParProduct > product.quantityParProduct
        ) {
          let diff =
            initialCommande.quantityParProduct - product.quantityParProduct;
          initialCommande.quantityParProduct -= diff;
          initialCommande.quantityBruteCVA += diff;
          product.quantityParProduct = 0;
          product.quantityBruteCVA += diff;
          etat = "minus-qtt";
          // qttParcommande > qttactuel =  (qttParcommande - qttactuel), commande quantité - (qttParcommande - qttactuel), +(qttParcommande - qttactuel) stock
          // 3 > 2 = 3 - 2 = 1, qttcommande -= 1,quantiteProduit (qttParcommande - qttactuel)
        } else if (
          initialCommande.quantityParProduct < product.quantityParProduct
        ) {
          let differ =
            product.quantityParProduct - initialCommande.quantityParProduct;
          // qttParcommande < qttactuel =  (qttactuel - qttParcommande), commande quantité + (qttactuel - qttParcommande), -(qttParcommande - qttactuel) stock
          // 4 < 5 = 5 - 4 = 1,qttcommande +=1 , stock + (qttParcommande - qttactuel)
          initialCommande.quantityParProduct += differ;
          initialCommande.quantityBruteCVA -= differ;
          product.quantityParProduct = 0;
          product.quantityBruteCVA -= differ;
          etat = "add-qtt";
        }
      }
    }
  }
  return { product, initialCommande, etat };
};

export const oneSoldOneReturnCond = (product, initialCommande) => {
  let etat = "none";
  if (product.quantityParProduct > 0) {
    if (product.condval >= 0) {
      if (product.quantityParProduct == initialCommande.quantityParProduct) {
        if (product.condval + product.quantityParProduct < product.condsize) {
          product.condval += product.quantityParProduct;
        } else {
          product.condval = product.condsize;
        }
        product.quantityParProduct = 0;
        etat = "same-qtt-cond";
      } else if (
        initialCommande.quantityParProduct > product.quantityParProduct
      ) {
        let diff =
          initialCommande.quantityParProduct - product.quantityParProduct;
        initialCommande.quantityParProduct -= diff;
        initialCommande.condval += diff;
        product.quantityParProduct = 0;

        if (product.condval + diff < product.condsize) {
          product.condval += diff;
        } else {
          product.condval = product.condsize;
        }
        etat = "minus-qtt-cond";
        // qttParcommande > qttactuel =  (qttParcommande - qttactuel), commande quantité - (qttParcommande - qttactuel), +(qttParcommande - qttactuel) stock
        // 3 > 2 = 3 - 2 = 1, qttcommande -= 1,quantiteProduit (qttParcommande - qttactuel)
      } else if (
        initialCommande.quantityParProduct < product.quantityParProduct
      ) {
        let differ =
          product.quantityParProduct - initialCommande.quantityParProduct;
        // qttParcommande < qttactuel =  (qttactuel - qttParcommande), commande quantité + (qttactuel - qttParcommande), -(qttParcommande - qttactuel) stock
        // 4 < 5 = 5 - 4 = 1,qttcommande +=1 , stock + (qttParcommande - qttactuel)
        initialCommande.quantityParProduct += differ;
        initialCommande.condval -= differ;
        product.quantityParProduct = 0;

        if (product.condval - differ >= 0) {
          product.condval -= differ;
        } else {
          product.condval = 0;
        }
        etat = "add-qtt-cond";
      }
    }
  } else {
    initialCommande.quantityParProduct = initialCommande.quantityParProduct;
    product.quantityParProduct = product.quantityParProduct;
  }
  return { product, initialCommande, etat };
};

export const mlSoldIncrementCond = (product, initialCommande) => {
  // 1 vendu,1 retour
  let etat = "none";
  if (product.qttByCC > 0) {
    if (product.quantityParProduct > 0) {
      product.condval += product.quantityParProduct;
      product.quantityParProduct = 0;
    }
    if (product.quantityCCCVA >= 0) {
      if (product.qttByCC == initialCommande.qttByCC) {
        etat = "same-qtt-cc-cond";
      } else if (initialCommande.qttByCC > product.qttByCC) {
        etat = "minus-qtt-cc-cond";
        let diff = initialCommande.qttByCC - product.qttByCC;
        //200 - 100 = 100
        initialCommande.qttByCC -= diff;
        // 100
        //200 + 100 = 100 > 250
        if (product.quantityCCCVA + diff > product.condml) {
          initialCommande.condval += 1;
          // + 1 boite
          initialCommande.quantityCCCVA =
            product.quantityCCCVA + diff - product.condml;
          // 200+  100 - 250
        } else {
          initialCommande.quantityCCCVA += diff;
        }
        // 21 > 20
      } else if (initialCommande.qttByCC < product.qttByCC) {
        // 19 < 20
        etat = "add-qtt-cc-cond";
        let differ = product.qttByCC - initialCommande.qttByCC;
        // 20 - 19 = 1
        initialCommande.qttByCC += differ;
        if (product.quantityCCCVA - differ > 0) {
          initialCommande.quantityCCCVA -= differ;
        } else {
          product.quantityCCCVA = 0;
        }
      }

      if (product.quantityCCCVA + product.qttByCC > product.condml) {
        // 200 + 32 > 50
        let diff = product.quantityCCCVA + product.qttByCC - product.condml;
        // 200 + 100 = 300 > 250
        // 50
        // + 1
        if (product.condval + 1 < product.condsize) {
          product.condval += 1;
        } else {
          product.condval = product.condsize;
        }
        product.quantityCCCVA = diff;
      } else {
        // 20 + 20 < 100
        product.quantityCCCVA += product.qttByCC;
      }
      product.qttByCC = 0;
    }
  } else {
    if (product.quantityParProduct > 0) {
      oneSoldOneReturnCond(product, initialCommande);
    }
  }

  return { product, initialCommande, etat };
};

// cas normal

// 20 + reste ML > dosedefault  qttbrute +1, qttcc = dose - reste
// 1 flacon + 20 ML , 20 + reste ML > dosedefault  qttbrute +1, qttcc = dose - reste , +1
//1 flacon + 20 ML , 20 + reste ML < dosedefault  qttbrute +1, qttcc -= qttCC

// cas modification

// qttParcommande > qttactuel =  (qttParcommande - qttactuel), commande quantité - (qttParcommande - qttactuel), +(qttParcommande - qttactuel) stock
// 3 > 2 = 3 - 2 = 1, qttcommande -= 1,quantiteProduit (qttParcommande - qttactuel)
// qttParcommande < qttactuel =  (qttactuel - qttParcommande), commande quantité + (qttactuel - qttParcommande), -(qttParcommande - qttactuel) stock
// 4 < 5 = 5 - 4 = 1,qttcommande +=1 , stock + (qttParcommande - qttactuel)

// cas tikaz
// 1 vendu , 1 retour
// 100 ml, reste ML + 100 < dosedefault, reste ML + 100
//100 ml, reste ML + 100 > dosedefault, on calcue la difference qttcc, + 1 condval ( + 1 condval > 4 donc ,)
// 1 cond , 100ML ,  reste ML + 100 > dosedefault, on calcue la difference qttcc, + 1 condval +1 cond,
//  1 cond , 100ML , +1 cond,  reste ML + 100 < dosedefault,+1 cond, qttc = reste ML + 100
//

//date : 11 12 13 14 15
//qtt  : 10  9  8  7  6
//       +1
//       11   +1 + 1 +1
//       -1 -1  - 1
