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
export const minusCondML = (product) => {
  if (hasCondVal(product)) {
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
            let diff = product.quantityParProduct - product.condval;
            let moins = 0;
            if (diff > product.condsize) {
              moins = Math.floor(Number(diff) / Number(product.condsize));
              let reste = Number(diff) - Number(product.condsize) * moins;
              product.condval = reste;
              if (product.condval - reste < 0) {
                moins += 1;
              }
            } else {
              product.condval = product.condsize - diff;
              if (product.condval - diff < 0) {
                moins = 1;
              }
            }

            product.quantityBruteCVA -= moins;
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
export const buy = (product) => {
  let isSpecific = false;
  if (isSpecialProductHandle(product)) {
    isSpecific = true;
    let qtt = product.quantityParProduct;
    let qttcc = product.qttByCC;
    let qttlitre = product.qttbylitre;
    let normalQtt = product.condval;
    let normalQttCC = product.quantityCCCVA;
    let normalQttLitre = product.quantityBruteCVA;
    let condsize = product.condsize;
    let dose = product.doseDefault;
    let condml = product.condml;
    let isValid = true;
    if (qttlitre > 0 && qtt == 0 && qttcc == 0) {
      if (qttlitre <= normalQttLitre) {
        product.quantityBruteCVA -= qttlitre;
      }
    }
    if (qttlitre == 0 && qtt > 0 && qttcc == 0) {
      let moins = 0,
        reste = 0;
      if (Number(qtt) > Number(condsize)) {
        moins = Math.floor(Number(qtt) / Number(condsize));
        reste = Number(qtt) - Number(condsize) * moins;
        if (normalQtt - reste < 0) {
          let diff = Number(reste) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moins += 1;
        } else {
          product.condval = normalQtt - reste;
        }
      } else {
        product.condval -= Number(qtt);
      }
      product.quantityBruteCVA -= moins;
    }
    if (qttlitre == 0 && qtt == 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) > Number(dose)) {
        moins = Math.floor(Number(qttcc) / Number(dose));
        reste = Number(qttcc) - Number(dose) * moins;
        if (normalQttCC - reste < 0) {
          let diff = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(dose) - Number(diff);
          moins += 1;
        } else {
          product.quantityCCCVA = normalQttCC - reste;
        }
      } else {
        product.quantityCCCVA -= Number(qttcc);
      }
      if (Number(moins) > Number(condsize)) {
        moinslitre = Math.floor(Number(moins) / Number(condsize));
        restelitre = Number(moins) - Number(condsize) * restelitre;
        if (normalQtt - restelitre < 0) {
          let diff = Number(restelitre) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moinslitre += 1;
        } else {
          product.condval = normalQtt - restelitre;
        }
      } else {
        product.condval -= Number(qtt);
      }
      product.quantityBruteCVA -= moinslitre;
    }
  
    if (qttlitre == 0 && qtt > 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) > Number(condml)) {
        moins = Math.floor(Number(qttcc) / Number(condml));
        reste = Number(qttcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          let diff = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(condml) - Number(diff);
          moins += 1;
        } else {
          product.quantityCCCVA = Number(normalQttCC) - reste;
        }
      } else {
        product.quantityCCCVA -= Number(qttcc);
      }
      let mm = Number(qtt) + moins;
      if (mm > Number(condsize)) {
        moinslitre = Math.floor(mm / Number(condsize));
        restelitre = mm - Number(condsize) * moins;
        if (normalQtt - restelitre < 0) {
          let diff = Number(restelitre) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moinslitre += 1;
        } else {
          product.condval = normalQtt - restelitre;
        }
      } else {
        product.condval -= mm;
      }
      product.quantityBruteCVA -= moinslitre;
    }
  
    if (qttlitre > 0 && qtt > 0 && qttcc == 0) {
      let moinslitre = 0,
        restelitre = 0;
  
      if (Number(qtt) > Number(condsize)) {
        moinslitre = Math.floor(Number(qtt) / Number(condsize));
        restelitre = Number(qtt) - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          let diff = Number(restelitre) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moinslitre += 1;
        } else {
          product.condval = normalQtt - restelitre;
        }
      } else {
        product.condval -= Number(qtt);
      }
      product.quantityBruteCVA -= moinslitre + qttlitre;
    }
  
    if (qttlitre > 0 && qtt == 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) > Number(condml)) {
        moins = Math.floor(Number(qttcc) / Number(condml));
        reste = Number(qttcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          let diffcc = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(condml) - Number(diffcc);
          moins += 1;
        } else {
          product.quantityCCCVA = normalQttCC - reste;
        }
      } else {
        product.quantityCCCVA -= Number(normalQttCC);
      }
  
      if (Number(moins) > Number(condsize)) {
        moinslitre = Math.floor(Number(moins) / Number(condsize));
        restelitre = Number(moins) - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          let diff = Number(restelitre) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moinslitre += 1;
        } else {
          product.condval = normalQtt - reste;
        }
      } else {
        product.condval -= Number(normalQtt);
      }
  
      product.quantityBruteCVA -= moinslitre + qttlitre;
    }
    if (qttlitre > 0 && qtt > 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) > Number(condml)) {
        moins = Math.floor(Number(qttcc) / Number(condml));
        reste = Number(qttcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          let diffcc = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(condml) - Number(diffcc);
          moins += 1;
        } else {
          product.quantityCCCVA = normalQttCC - reste;
        }
      } else {
        product.quantityCCCVA -= Number(normalQttCC);
      }
      let mns = Number(moins) + Number(qtt);
      if (mns > Number(condsize)) {
        moinslitre = Math.floor(mns / Number(condsize));
        restelitre = mns - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          let diff = Number(restelitre) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moinslitre += 1;
        } else {
          product.condval = normalQtt - reste;
        }
      } else {
        product.condval -= Number(normalQtt);
      }
      product.quantityBruteCVA -= moinslitre + qttlitre;
    }
  } else {
    let qtt = product.quantityParProduct;
    let qttcc = product.qttByCC;
    let normalQtt = product.quantityBruteCVA;
    let normalQttCC = product.quantityCCCVA;
    let dose = product.doseDefault;
    isSpecific = false;
    let isValid = true;
    if (qtt == 0 && qttcc > 0) {
      let moins = 0;
  
      if (Number(qttcc) > Number(dose)) {
        moins = Math.floor(Number(qttcc) / Number(dose));
        reste = Number(qttcc) - Number(dose) * moins;
        if (normalQttCC - reste < 0) {
          let diff = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(dose) - Number(diff);
          moins += 1;
        } else {
          product.quantityCCCVA = Number(normalQttCC) - reste;
        }
      } else {
        product.quantityCCCVA -= Number(normalQttCC);
      }
      product.quantityBruteCVA -= moins;
    }
    if (qtt > 0 && qttcc == 0) {
      product.quantityBruteCVA -= qtt;
    }
    if (qtt > 0 && qttcc > 0) {
      let moins,
        reste = 0;
      if (Number(qttcc) > Number(dose)) {
        moins = Math.floor(Number(qttcc) / Number(dose));
        reste = Number(qttcc) - Number(dose) * moins;
        if (normalQttCC - reste < 0) {
          let diff = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(dose) - Number(diff);
          moins += 1;
        } else {
          product.quantityCCCVA = Number(normalQttCC) - reste;
        }
      } else {
        product.quantityCCCVA -= Number(normalQttCC);
      }
      product.quantityBruteCVA -= Number(moins) + Number(qtt);
    }
  }
};
  