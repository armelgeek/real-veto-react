export const isSpecialProductHandle = (product) => {
  return !!(
    product.condml != 0 &&
    product.condsize != 0 &&
    product.qttccpvente != 0 &&
    product.prixqttccvente != 0
  );
};

const incrementIncrement = (realproduct, qttcc, qtt = 0) => {
  let moins = 0;
  let reste = 0;
  let dose = realproduct.doseDefault;
  let add = Number(realproduct.quantityCCCVA) + Number(qttcc);
  if (Number(add) >= Number(dose)) {
    moins = Math.floor(add / Number(dose));
    reste = Number(qttcc) - Number(dose) * moins;
    if (realproduct.quantityCCCVA + reste >= Number(dose)) {
      let diff = realproduct.quantityCCCVA + reste - Number(dose);
      realproduct.quantityCCCVA += Number(diff);
      moins += 1;
    } else {
      realproduct.quantityCCCVA = realproduct.quantityCCCVA + reste;
    }
  } else {
    if (realproduct.quantityCCCVA + reste >= Number(dose)) {
      let diff = realproduct.quantityCCCVA + reste - Number(dose);
      realproduct.quantityCCCVA += Number(diff);
      moins += 1;
    } else {
      realproduct.quantityCCCVA = realproduct.quantityCCCVA + Number(qttcc);
    }
  }
  let x = moins + Number(qtt);
  realproduct.quantityBruteCVA += x;
};
const correctionValue = (product, diff, diffcc, diffl) => {
  product.quantityParProduct = diff;
  product.qttByCC = diffcc;
  product.qttbylitre = diffl;
};
const decrementDecrement = (realproduct, qttcc, qtt = 0) => {
  let moins = 0;
  let reste = 0;
  let dose = realproduct.doseDefault;
  let isValid = true;
  if (Number(qttcc) >= Number(dose)) {
    moins = Math.floor(Number(qttcc) / Number(dose));
    reste = Number(qttcc) - Number(dose) * moins;
    if (realproduct.quantityCCCVA - reste < 0) {
      moins += 1;
    } else {
    }
  } else {
    if (realproduct.quantityCCCVA - Number(qttcc) < 0) {
      moins += 1;
    } else {
    }
  }
  let x = moins + Number(qtt);
  if (realproduct.quantityBruteCVA - x < 0) isValid = false;
  return isValid;
};
const incrementX = (realproduct, qttcc, qtt = 0, qttlitre, type = "inc") => {
  let moins = 0,
    moinscond = 0,
    moinslitre = 0;
  let reste = 0,
    restelitre = 0,
    restecond = 0,
    isValid = true;
  let dose = realproduct.condml;
  let condsize = realproduct.condsize;
  console.log(qttcc);
  if (type == "mcinc") {
    let add = Number(realproduct.quantityCCCVA) + Number(qttcc);
    if (Number(add) >= Number(dose)) {
      moins = Math.floor(add / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA + reste >= Number(dose)) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA + Number(qttcc) >= Number(dose)) {
        moins += 1;
      } else {
      }
    }

    let mm = Number(moins) + Number(qtt);
    if (Number(mm) >= Number(condsize)) {
      moinscond = Math.floor(mm / Number(condsize));
      restecond = Number(mm) - Number(condsize) * moinscond;
      if (realproduct.condval + restecond >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    } else {
      if (realproduct.condval + Number(mm) >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    }
    if (realproduct.quantityBruteCVA + moinscond - qttlitre < 0)
      isValid = false;
  } else if (type == "mdecinc") {
    if (Number(qttcc) >= Number(dose)) {
      moins = Math.floor(Number(qttcc) / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA - reste < 0) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA - Number(qttcc) < 0) {
        moins += 1;
      } else {
      }
    }

    let mn = Number(moins);
    if (Number(mn) >= Number(condsize)) {
      moinslitre = Math.floor(Number(mn) / Number(condsize));
      restelitre = Number(mn) - Number(condsize) * moinslitre;
      if (realproduct.condval - restelitre < 0) {
        moinslitre += 1;
      } else {
      }
    } else {
      if (realproduct.condval - Number(mn) < 0) {
        moinslitre += 1;
      } else {
      }
    }
    let mma = Number(qtt);
    if (Number(mma) >= Number(condsize)) {
      moinscond = Math.floor(mma / Number(condsize));
      restecond = Number(mma) - Number(condsize) * moinscond;
      if (realproduct.condval + restecond >= Number(condsize)) {
        moinscond += 1;
      } else {
        realproduct.condval = Number(realproduct.condval) + restecond;
      }
    } else {
      if (realproduct.condval + Number(mma) >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    }
    let x1 = realproduct.quantityBruteCVA + qttlitre + moinscond;
    if (x1 - moinslitre < 0) {
      isValid = false;
    }
  } else if (type == "decinc") {
    if (Number(qttcc) >= Number(dose)) {
      moins = Math.floor(Number(qttcc) / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA - reste < 0) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA - Number(qttcc) < 0) {
        moins += 1;
      } else {
      }
    }

    let mn = Number(moins);
    if (Number(mn) >= Number(condsize)) {
      moinslitre = Math.floor(Number(mn) / Number(condsize));
      restelitre = Number(mn) - Number(condsize) * moinslitre;
      if (realproduct.condval - restelitre < 0) {
        moinslitre += 1;
      } else {
      }
    } else {
      if (realproduct.condval - Number(mn) < 0) {
        moinslitre += 1;
      } else {
      }
    }

    let mma = Number(qtt);
    if (Number(mma) >= Number(condsize)) {
      moinscond = Math.floor(mma / Number(condsize));
      restecond = Number(mma) - Number(condsize) * moinscond;
      if (realproduct.condval + restecond >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    } else {
      if (realproduct.condval + Number(mma) >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    }
    if (
      realproduct.quantityBruteCVA + moinscond - (qttlitre + moinslitre) <
      0
    ) {
      isValid = false;
    }
  } else {
    let add = Number(realproduct.quantityCCCVA) + Number(qttcc);

    if (Number(add) >= Number(dose)) {
      moins = Math.floor(add / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA + reste >= Number(dose)) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA + Number(qttcc) >= Number(dose)) {
        moins += 1;
      } else {
      }
      isValid = true;
    }
  }
  return isValid;
};
const decrementX = (realproduct, qttcc, qtt = 0, qttlitre, type = "dec") => {
  let moins = 0,
    moinslitre = 0,
    moinscond = 0,
    reste = 0,
    restelitre = 0,
    isValid = true,
    restecond;
  let dose = realproduct.condml;
  let condsize = realproduct.condsize;
  if (type == "pcdec") {
    if (Number(qttcc) >= Number(dose)) {
      moins = Math.floor(Number(qttcc) / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA - reste < 0) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA - Number(qttcc) < 0) {
        moins += 1;
      } else {
      }
    }

    let mn = Number(moins) + Number(qtt);
    if (Number(mn) >= Number(condsize)) {
      moinslitre = Math.floor(Number(mn) / Number(condsize));
      restelitre = Number(mn) - Number(condsize) * moinslitre;
      if (realproduct.condval - restelitre < 0) {
        moinslitre += 1;
      } else {
      }
    } else {
      if (realproduct.condval - Number(mn) < 0) {
        moinslitre += 1;
      } else {
      }
    }
    if (realproduct.quantityBruteCVA + qttlitre - moinslitre < 0) {
      isValid = false;
    }
  } else if (type == "mincdec") {
    let moins = 0,
      moinscond = 0;
    let reste = 0,
      restecond = 0;
    let dose = realproduct.condml;
    let condsize = realproduct.condsize;

    let add = Number(realproduct.quantityCCCVA) + Number(qttcc);
    if (Number(add) >= Number(dose)) {
      moins = Math.floor(add / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA + reste >= Number(dose)) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA + Number(qttcc) >= Number(dose)) {
        moins += 1;
      } else {
      }
    }
    let mm = Number(moins);
    if (Number(mm) >= Number(condsize)) {
      moinscond = Math.floor(mm / Number(condsize));
      restecond = Number(mm) - Number(condsize) * moinscond;
      if (realproduct.condval + restecond >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    } else {
      if (realproduct.condval + Number(mm) >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    }

    let mna = Number(qtt);
    if (Number(mna) >= Number(condsize)) {
      moinslitre = Math.floor(Number(mna) / Number(condsize));
      restelitre = Number(mna) - Number(condsize) * moins;
      if (realproduct.condval - restelitre < 0) {
        moinslitre += 1;
      } else {
      }
    } else {
      if (realproduct.condval - Number(mna) < 0) {
        moinslitre += 1;
      } else {
        realproduct.condval = realproduct.condval - Number(mna);
      }
    }
    let x1 = realproduct.quantityBruteCVA + moinscond + qttlitre;
    if (x1 - moinslitre) isValid = false;
  } else if (type == "incdec") {
    // mis erreur ici:
    let moins = 0,
      moinscond = 0;
    let reste = 0,
      restecond = 0;
    let dose = realproduct.condml;
    let condsize = realproduct.condsize;

    let add = Number(realproduct.quantityCCCVA) + Number(qttcc);
    if (Number(add) >= Number(dose)) {
      moins = Math.floor(add / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA + reste >= Number(dose)) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA + Number(qttcc) >= Number(dose)) {
        moins += 1;
      } else {
      }
    }
    let mm = Number(moins);
    if (Number(mm) >= Number(condsize)) {
      moinscond = Math.floor(mm / Number(condsize));
      restecond = Number(mm) - Number(condsize) * moinscond;
      if (realproduct.condval + restecond >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    } else {
      if (realproduct.condval + Number(mm) >= Number(condsize)) {
        moinscond += 1;
      } else {
      }
    }

    let mna = Number(qtt);
    if (Number(mna) >= Number(condsize)) {
      moinslitre = Math.floor(Number(mna) / Number(condsize));
      restelitre = Number(mna) - Number(condsize) * moins;
      if (realproduct.condval - restelitre < 0) {
        moinslitre += 1;
      } else {
      }
    } else {
      if (realproduct.condval - Number(mna) < 0) {
        moinslitre += 1;
      } else {
      }
    }
    let x1 = realproduct.quantityBruteCVA + moinscond;
    let x2 = moinslitre + qttlitre;
    if (x1 - x2 < 0) isValid = false;
  } else {
    if (Number(qttcc) >= Number(dose)) {
      moins = Math.floor(Number(qttcc) / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA - reste < 0) {
        moins += 1;
      }
    } else {
      if (realproduct.quantityCCCVA - Number(qttcc) < 0) {
        moins += 1;
      }
    }

    let mn = Number(moins) + Number(qtt);
    if (Number(mn) >= Number(condsize)) {
      moinslitre = Math.floor(Number(mn) / Number(condsize));
      restelitre = Number(mn) - Number(condsize) * moinslitre;
      if (realproduct.condval - restelitre < 0) {
        moinslitre += 1;
      }
    } else {
      if (realproduct.condval - Number(mn) < 0) {
        moinslitre += 1;
      }
    }
    let mns = moinslitre + qttlitre;
    if (realproduct.quantityBruteCVA - mns < 0) isValid = false;
  }
  return isValid;
};
const decrement = (realproduct, qttcc, qtt = 0, type = "dec") => {
  let moins = 0,
    reste = 0;
  let dose = realproduct.doseDefault;
  let isValid = true;

  if (type != "incdec") {
    if (Number(qttcc) >= Number(dose)) {
      moins = Math.floor(Number(qttcc) / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA - reste < 0) {
        moins += 1;
      } else {
      }
    } else {
      if (realproduct.quantityCCCVA - Number(qttcc) < 0) {
        moins += 1;
      } else {
      }
    }
    let mn = moins + qtt;
    if (realproduct.quantityBruteCVA - mn < 0) isValid = false;
  } else {
    let add = Number(realproduct.quantityCCCVA) + Number(qttcc);
    if (Number(add) >= Number(dose)) {
      moins = Math.floor(add / Number(dose));
      reste = Number(qttcc) - Number(dose) * moins;
      if (realproduct.quantityCCCVA + reste >= Number(dose)) {
        moins += 1;
      }
    } else {
      if (realproduct.quantityCCCVA + Number(qttcc) >= Number(dose)) {
        moins += 1;
      }
    }
    if (realproduct.quantityBruteCVA + moins - qtt < 0) {
      isValid = false;
    }
  }

  return isValid;
};
export const blockItOnSold = (realQtt, realQttCC, realQttLitre, product) => {
  let isSpecific = false;
  if (isSpecialProductHandle(product)) {
    isSpecific = true;
    let qtt = realQtt;
    let qttcc = realQttCC;
    let qttlitre = realQttLitre;
    let normalQtt = product.condval;
    let normalQttCC = product.quantityCCCVA;
    let normalQttLitre = product.quantityBruteCVA;
    let condsize = product.condsize;
    let dose = product.doseDefault;
    let condml = product.condml;
    let isValid = true;
    if (qttlitre > 0 && qtt == 0 && qttcc == 0) {
      if (qttlitre > normalQttLitre) {
        isValid = false;
        normalQtt = qtt;
        normalQttCC = qttcc;
      }
    }
    if (qttlitre == 0 && qtt > 0 && qttcc == 0) {
      let moins = 0,
        reste = 0;
      if (Number(qtt) > Number(condsize)) {
        moins = Math.floor(Number(qtt) / Number(condsize));
        reste = Number(qtt) - Number(condsize) * moins;
        if (normalQtt - reste < 0) {
          moins += 1;
        }
      }
      if (normalQttLitre - moins < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQttCC = qttcc;
      }
    }
    if (qttlitre == 0 && qtt == 0 && qttcc > 0) {
      if (normalQttCC - qttcc < 0) {
        let moins = 0,
          moinslitre = 0,
          restelitre = 0,
          reste = 0;
        if (Number(qttcc) > Number(dose)) {
          moins = Math.floor(Number(qttcc) / Number(dose));
          reste = Number(qttcc) - Number(dose) * moins;
          if (normalQttCC - reste < 0) {
            moins += 1;
          }
        }
        if (Number(moins) > Number(condsize)) {
          moinslitre = Math.floor(Number(moins) / Number(condsize));
          restelitre = Number(moins) - Number(condsize) * moins;
          if (normalQtt - restelitre < 0) {
            moinslitre += 1;
          }
        }
        if (normalQttLitre - moinslitre < 0) {
          isValid = false;
          normalQttLitre = qttlitre;
          normalQtt = qtt;
        }
      }
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
          moins += 1;
        }
      } else {
        if (normalQttCC - Number(qttcc) < 0) {
          moins = 1;
        }
      }
      let mm = Number(qtt) + moins;
      if (mm > Number(condsize)) {
        moinslitre = Math.floor(mm / Number(condsize));
        restelitre = mm - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          moinslitre += 1;
        }
      } else {
        if (normalQtt - mm < 0) {
          moinslitre = 1;
        }
      }
      if (normalQttLitre - moinslitre < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = qtt;
      }
    }
    if (qttlitre > 0 && qtt > 0 && qttcc == 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;

      if (Number(qtt) > Number(condsize)) {
        moinslitre = Math.floor(Number(qtt) / Number(condsize));
        restelitre = Number(qtt) - Number(condsize) * moinslitre;
        if (normalQtt - (restelitre + qtt) < 0) {
          moinslitre += 1;
        }
      } else {
        if (normalQtt - Number(qtt) < 0) {
          moinslitre = 1;
        }
      }

      if (normalQttLitre - (moinslitre + qttlitre) < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = qtt;
      }
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
          moins += 1;
        }
      } else {
        if (normalQttCC - Number(qttcc) < 0) {
          moins = 1;
        }
      }

      if (Number(moins) > Number(condsize)) {
        moinslitre = Math.floor(Number(moins) / Number(condsize));
        restelitre = Number(moins) - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          moinslitre += 1;
        }
      } else {
        if (normalQtt - moins < 0) {
          moinslitre = 1;
        }
      }
      if (normalQttLitre - (moinslitre + qttlitre) < 0) {
        isValid = false;
        normalQtt = qtt;
      }
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
          moins += 1;
        }
      } else {
        if (normalQttCC - Number(qttcc) < 0) {
          moins = 1;
        }
      }
      let mns = Number(moins) + Number(qtt);
      if (mns > Number(condsize)) {
        moinslitre = Math.floor(mns / Number(condsize));
        restelitre = mns - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          moinslitre += 1;
        }
      } else {
        if (normalQtt - mns < 0) {
          moinslitre = 1;
        }
      }
      if (normalQttLitre - (moinslitre + qttlitre) < 0) {
        isValid = false;
      }
    }

    return {
      normalQtt,
      normalQttCC,
      normalQttLitre,
      isSpecific,
      isValid,
    };
  } else {
    let qtt = realQtt;
    let qttcc = realQttCC;
    let normalQtt = product.quantityBruteCVA;
    let normalQttCC = product.quantityCCCVA;
    let dose = product.doseDefault;
    let normalQttLitre = product.quantityBruteCVA;
    isSpecific = false;
    let isValid = true;
    if (qtt == 0 && qttcc > 0) {
      let moins = 0,
        reste = 0;
      if (Number(qttcc) > Number(dose)) {
        moins = Math.floor(Number(qttcc) / Number(dose));
        reste = Number(qttcc) - Number(dose) * moins;
        console.log(reste);
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else {
        if (normalQttCC - Number(qttcc) < 0) {
          moins = 1;
        }
      }

      if (qttcc > normalQttCC) {
        if (normalQtt - moins < 0) {
          isValid = false;
          normalQtt = qtt;
        }
      }
    }
    if (qtt > 0 && qttcc == 0) {
      if (qtt > normalQtt) {
        isValid = false;
        normalQttCC = qttcc;
      }
    }
    if (qtt > 0 && qttcc > 0) {
      let moins,
        reste = 0;
      if (Number(qttcc) > Number(dose)) {
        moins = Math.floor(Number(qttcc) / Number(dose));
        reste = Number(qttcc) - Number(dose) * moins;
        console.log(reste);
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else {
        if (normalQttCC - Number(qttcc) < 0) {
          moins = 1;
        }
      }

      if (Number(normalQtt) - (Number(moins) + Number(qtt)) < 0) {
        isValid = false;
      }
      if (qtt > normalQtt) {
        isValid = false;
        normalQttCC = qttcc;
      }
    }
    return {
      normalQtt,
      normalQttCC,
      normalQttLitre,
      isValid,
      isSpecific,
    };
  }
};

export const blockItis = (product, minitial, initial) => {
  const initialCom = minitial.contenu.find((e) => e.id == product.id);
  console.log("minitial", minitial);
  let isSpecific = false;
  let diff = 0,
    diffcc = 0,
    diffl = 0,
    isValid = true;
  let etat = "none";

  let normalQtt = initial.quantityParProduct;
  let normalQttCC = initial.qttByCC;
  let normalQttLitre = initial.qttbylitre;

  if (isSpecialProductHandle(product)) {
    isSpecific = true;
    isSpecific = false;
    // commande actuel
    let qtt = initial.quantityParProduct;
    let qttcc = initial.qttByCC;
    let qttlitre = initial.qttbylitre;
    // commande initial
    console.log(qtt, qttcc);
    let cmdqtt = initialCom!=undefined
      ? initialCom?.quantityParProduct
      : initial.condval;
    let cmdqttcc = initialCom!=undefined
      ? initialCom?.qttByCC
      : initial.quantityCCCVA;
    let cmdqttlitre = initialCom!=undefined
      ? initialCom?.qttbylitre
      : initial.quantityBruteCVA;
    console.log(cmdqtt, cmdqttcc, cmdqttlitre);
    if (qttlitre == cmdqttlitre && qtt == cmdqtt && qttcc == cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt == cmdqtt && qttcc == cmdqttcc";
    }
    if (qttlitre == cmdqttlitre && qtt == cmdqtt && qttcc > cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt == cmdqtt && qttcc > cmdqttcc";
      diffcc = qttcc - cmdqttcc;
      isValid = decrementX(product, diffcc, diff, diffl);
      if (isValid == false) {
        normalQttCC = cmdqttcc;
      }
    }
    if (qttlitre == cmdqttlitre && qtt == cmdqtt && qttcc < cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt == cmdqtt && qttcc < cmdqttcc";
      diffcc = cmdqttcc - qttcc;
      //incrementX(product, diffcc, diff, diffl);
      isValid = true;
    }
    if (qttlitre == cmdqttlitre && qtt > cmdqtt && qttcc == cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt > cmdqtt && qttcc == cmdqttcc";
      diff = qtt - cmdqtt;
      isValid = decrementX(product, diffcc, diff, diffl);
      if (isValid == false) {
        normalQtt = cmdqtt;
      }
    }
    if (qttlitre == cmdqttlitre && qtt < cmdqtt && qttcc == cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt < cmdqtt && qttcc == cmdqttcc";
      diff = cmdqtt - qtt;
      //incrementX(product, diffcc, diff, diffl);
      isValid = true;
    }
    if (qttlitre == cmdqttlitre && qtt > cmdqtt && qttcc > cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt > cmdqtt && qttcc > cmdqttcc";
      diff = qtt - cmdqtt;
      diffcc = qttcc - cmdqttcc;
      isValid = decrementX(product, diffcc, diff, diffl);
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
      }
    }
    if (qttlitre == cmdqttlitre && qtt < cmdqtt && qttcc < cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt < cmdqtt && qttcc < cmdqttcc";
      diff = cmdqtt - qtt;
      diffcc = cmdqttcc - qttcc;
      //incrementX(product, diffcc, diff, diffl);
      isValid = true;
    }
    if (qttlitre == cmdqttlitre && qtt > cmdqtt && qttcc < cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt > cmdqtt && qttcc < cmdqttcc";
      diff = qtt - cmdqtt;
      diffcc = cmdqttcc - qttcc;
      isValid = decrementX(product, diffcc, diff, diffl, "incdec");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
      }
    }
    if (qttlitre == cmdqttlitre && qtt < cmdqtt && qttcc > cmdqttcc) {
      etat = "qttlitre == cmdqttlitre && qtt < cmdqtt && qttcc > cmdqttcc";
      diff = cmdqtt - qtt;
      diffcc = qttcc - cmdqttcc;
      isValid = incrementX(product, diffcc, diff, diffl, "decinc");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
      }
    }
    if (qttlitre > cmdqttlitre && qtt == cmdqtt && qttcc == cmdqttcc) {
      etat = "qttlitre > cmdqttlitre && qtt == cmdqtt && qttcc == cmdqttcc";
      diffl = qttlitre - cmdqttlitre;
      isValid = decrementX(product, diffcc, diff, diffl);
      if (isValid == false) {
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre < cmdqttlitre && qtt == cmdqtt && qttcc == cmdqttcc) {
      etat = "qttlitre < cmdqttlitre && qtt == cmdqtt && qttcc == cmdqttcc";
      diffl = cmdqttlitre - qttlitre;
      //incrementX(product, diffcc, diff, diffl);
      isValid = true;
    }
    if (qttlitre > cmdqttlitre && qtt > cmdqtt && qttcc > cmdqttcc) {
      etat = "qttlitre > cmdqttlitre && qtt > cmdqtt && qttcc > cmdqttcc";
      diff = qtt - cmdqtt;
      diffcc = qttcc - cmdqttcc;
      diffl = qttlitre - cmdqttlitre;
      isValid = decrementX(product, diffcc, diff, diffl);
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre > cmdqttlitre && qtt > cmdqtt && qttcc < cmdqttcc) {
      etat = "qttlitre > cmdqttlitre && qtt > cmdqtt && qttcc < cmdqttcc";
      diff = qtt - cmdqtt;
      diffcc = cmdqttcc - qttcc;
      diffl = qttlitre - cmdqttlitre;
      isValid = decrementX(product, diffcc, diff, diffl, "incdec");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre > cmdqttlitre && qtt < cmdqtt && qttcc > cmdqttcc) {
      etat = "qttlitre > cmdqttlitre && qtt < cmdqtt && qttcc > cmdqttcc";
      diff = cmdqtt - qtt;
      diffcc = qttcc - cmdqttcc;
      diffl = qttlitre - cmdqttlitre;
      isValid = incrementX(product, diffcc, diff, diffl, "decinc");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre > cmdqttlitre && qtt < cmdqtt && qttcc < cmdqttcc) {
      etat = "qttlitre > cmdqttlitre && qtt < cmdqtt && qttcc < cmdqttcc";
      diff = cmdqtt - qtt;
      diffcc = cmdqttcc - qttcc;
      diffl = qttlitre - cmdqttlitre;
      isValid = incrementX(product, diffcc, diff, diffl, "mcinc");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre < cmdqttlitre && qtt > cmdqtt && qttcc > cmdqttcc) {
      etat = "qttlitre < cmdqttlitre && qtt > cmdqtt && qttcc > cmdqttcc";
      diff = qtt - cmdqtt;
      diffcc = qttcc - cmdqttcc;
      diffl = cmdqttlitre - qttlitre;
      isValid = decrementX(product, diffcc, diff, diffl, "pcdec");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre < cmdqttlitre && qtt > cmdqtt && qttcc < cmdqttcc) {
      etat = "qttlitre < cmdqttlitre && qtt > cmdqtt && qttcc < cmdqttcc";
      diff = qtt - cmdqtt;
      diffcc = cmdqttcc - qttcc;
      diffl = cmdqttlitre - qttlitre;
      isValid = decrementX(product, diffcc, diff, diffl, "mincdec");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre < cmdqttlitre && qtt < cmdqtt && qttcc > cmdqttcc) {
      etat = "qttlitre < cmdqttlitre && qtt < cmdqtt && qttcc > cmdqttcc";
      diff = cmdqtt - qtt;
      diffcc = qttcc - cmdqttcc;
      diffl = cmdqttlitre - qttlitre;
      isValid = incrementX(product, diffcc, diff, diffl, "mdecinc");
      if (isValid == false) {
        normalQttCC = cmdqttcc;
        normalQtt = cmdqtt;
        normalQttLitre = cmdqttlitre;
      }
    }
    if (qttlitre < cmdqttlitre && qtt < cmdqtt && qttcc < cmdqttcc) {
      etat = "qttlitre < cmdqttlitre && qtt < cmdqtt && qttcc < cmdqttcc";
      diff = cmdqtt - qtt;
      diffcc = cmdqttcc - qttcc;
      diffl = cmdqttlitre - qttlitre;
      isValid = true;
      //incrementX(product, diffcc, diff, diffl);
    }
  } else {
    isSpecific = false;
    // commande actuel
    let qtt = initial.quantityParProduct;
    let qttcc = initial.qttByCC;
    // commande initial
    console.log(qtt, qttcc);
    let cmdqtt = initialCom!=undefined
      ? initialCom?.quantityParProduct
      : initial.quantityBruteCVA;
    let cmdqttcc =  initialCom!=undefined
      ? initialCom?.qttByCC
      : initial.quantityCCCVA;
    console.log(cmdqtt, cmdqttcc);
    if (qtt > cmdqtt && qttcc == cmdqttcc) {
      etat = "qtt > cmdqtt && qttcc == cmdqttcc";
      diff = qtt - cmdqtt;
      console.log(product.quantityBruteCVA, diff);
      if (product.quantityBruteCVA - diff >= 0) {
        isValid = true;
      } else {
        isValid = false;
        normalQtt = cmdqtt;
      }
    }
    if (qtt < cmdqtt && qttcc == cmdqttcc) {
      etat = "qtt < cmdqtt && qttcc == cmdqttcc";
      diff = cmdqtt - qtt;
      isValid = true;
    }
    if (qtt == cmdqtt && qttcc == cmdqttcc) {
      etat = "qtt == cmdqtt && qttcc == cmdqttcc";
      isValid = true;
    }

    if (qtt == cmdqtt && qttcc > cmdqttcc) {
      etat = "qtt == cmdqtt && qttcc > cmdqttcc";
      diffcc = qttcc - cmdqttcc;
      isValid = decrement(product, diffcc);
      normalQttCC = cmdqttcc;
    }
    if (qtt == cmdqtt && qttcc < cmdqttcc) {
      etat = "qtt == cmdqtt && qttcc < cmdqttcc";
      diffcc = cmdqttcc - qttcc;
      isValid = true;
    }
    if (qtt > cmdqtt && qttcc < cmdqttcc) {
      // ok
      etat = "qtt > cmdqtt && qttcc < cmdqttcc";
      diff = qtt - cmdqtt;
      diffcc = cmdqttcc - qttcc;
      isValid = decrement(product, diffcc, diff, "incdec");
      normalQtt = cmdqtt;
      normalQttCC = cmdqttcc;
    }
    if (qtt < cmdqtt && qttcc > cmdqttcc) {
      // ok - il faut tester derniere fois si le cc restant est insuffisant
      etat = "qtt < cmdqtt && qttcc > cmdqttcc";
      diff = cmdqtt - qtt;
      diffcc = qttcc - cmdqttcc;
      isValid = true;
    }
    if (qtt < cmdqtt && qttcc < cmdqttcc) {
      diff = cmdqtt - qtt;
      diffcc = cmdqttcc - qttcc;
      etat = "qtt < cmdqtt && qttcc < cmdqttcc";
      isValid = true;
    }
    if (qtt > cmdqtt && qttcc > cmdqttcc) {
      diff = qtt - cmdqtt;
      diffcc = qttcc - cmdqttcc;
      etat = "qtt > cmdqtt && qttcc > cmdqttcc";
      isValid = decrementDecrement(product, diffcc, diff);
      normalQtt = cmdqtt;
      normalQttCC = cmdqttcc;
    }
  }

  console.log("--------" + etat + "---------");

  return { normalQtt, normalQttCC, normalQttLitre, isSpecific, isValid };
};

export const blockItOnEdit = (
  realQtt,
  realQttCC,
  realQttLitre,
  product,
  initialCommande
) => {
  let isSpecific = false;
  if (isSpecialProductHandle(product)) {
    isSpecific = true;
    let qtt = realQtt;
    let qttcc = realQttCC;
    let qttlitre = realQttLitre;
    let normalQtt = product?.condval;
    let normalQttCC = product?.quantityCCCVA;
    let normalQttLitre = product?.quantityBruteCVA;
    let condsize = product?.condsize;
    let dose = product?.doseDefault;
    let condml = product?.condml;
    let initialCQtt = initialCommande.quantityParProduct;
    let initialCQttCC = initialCommande.qttByCC;
    let initialCQttLitre = initialCommande.qttbylitre;

    let isValid = true;
    let diff = 0,
      diffcc = 0,
      diffl = 0;

    if (qttlitre > initialCQttLitre && qtt == 0 && qttcc == 0) {
      diffl = qttlitre - initialCQttLitre;
      if (normalQttLitre - diffl < 0) {
        isValid = false;
        normalQttLitre = initialCQttLitre;
        normalQtt = qtt;
        normalQttCC = qttcc;
      }
    }
    if (qttlitre == 0 && qtt > 0 && qttcc == 0) {
      let moins = 0,
        reste = 0;
      diff = qtt - initialCQtt;

      if (Number(diff) >= Number(condsize)) {
        moins = Math.floor(Number(diff) / Number(condsize));
        reste = Number(diff) - Number(condsize) * moins;
        if (normalQtt - reste < 0) {
          moins += 1;
        }
      } else {
        if (normalQtt - diff < 0) {
          moins = 1;
        }
      }
      if (normalQttLitre - moins < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = initialCQtt;
        normalQttCC = qttcc;
      }
    }
    if (qttlitre == 0 && qtt == 0 && qttcc > 0) {
      let moins = 0,
        reste = 0,
        moinslitre = 0,
        restelitre = 0;
      diffcc = qttcc - initialCQttCC;
      if (Number(diffcc) >= Number(condml)) {
        moins = Math.floor(Number(diffcc) / Number(condml));
        reste = Number(diffcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else if (normalQttCC - diffcc < 0) {
        moins = 1;
      }

      if (Number(moins) >= Number(condsize)) {
        moinslitre = Math.floor(Number(moins) / Number(condsize));
        restelitre = Number(moins) - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          moinslitre += 1;
        }
      } else {
        if (normalQtt - moins < 0) {
          moinslitre = 1;
        }
      }
      if (normalQttLitre - moinslitre < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = qtt;
        normalQttCC = initialCQttCC;
      }
    }

    if (qttlitre == 0 && qtt > 0 && qttcc > 0) {
      let moins = 0,
        reste = 0,
        moinslitre = 0,
        restelitre = 0;
      diff = qtt - initialCQtt;
      diffcc = qttcc - initialCQttCC;
      if (Number(diffcc) >= Number(condml)) {
        moins = Math.floor(Number(diffcc) / Number(condml));
        reste = Number(diffcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else if (normalQttCC - diffcc < 0) {
        moins = 1;
      }
      let mmm = Number(moins) + diff;
      if (Number(mmm) >= Number(condsize)) {
        moinslitre = Math.floor(Number(mmm) / Number(condsize));
        restelitre = Number(mmm) - Number(condsize) * moinslitre;
        if (normalQtt - restelitre < 0) {
          moinslitre += 1;
        }
      } else {
        if (normalQtt - mmm < 0) {
          moinslitre = 1;
        }
      }

      if (normalQttLitre - moinslitre < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = initialCQtt;
        normalQttCC = initialCQttCC;
      }
    }
    if (qttlitre > 0 && qtt > 0 && qttcc == 0) {
      let moins = 0;
      diff = qtt - initialCQtt;
      diffl = qttlitre - initialCQttLitre;

      if (Number(diff) >= Number(condsize)) {
        moins = Math.floor(Number(diff) / Number(condsize));
        reste = Number(diff) - Number(condsize) * moins;
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else if (normalQtt - diff < 0) {
        moins = 1;
      }
      if (normalQttLitre - (moins + diffl) < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = qtt;
        normalQttCC = initialCQttCC;
      }
    }

    if (qttlitre > 0 && qtt == 0 && qttcc > 0) {
      let moins = 0,
        reste = 0;
      let moinsl = 0,
        restel = 0;
      diff = qtt - initialCQtt;
      diffl = qttlitre - initialCQttLitre;

      if (Number(diffcc) >= Number(condml)) {
        moins = Math.floor(Number(diffcc) / Number(condml));
        reste = Number(diffcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else if (normalQttCC - diffcc < 0) {
        moins = 1;
      }

      if (Number(moins) >= Number(condsize)) {
        moinsl = Math.floor(Number(diff) / Number(condsize));
        restel = Number(diff) - Number(condsize) * moinsl;
        if (normalQtt - reste < 0) {
          moinsl += 1;
        }
      } else if (normalQtt - moins < 0) {
        moinsl = 1;
      }
      if (normalQttLitre - (moinsl + diffl) < 0) {
        isValid = false;
        normalQttLitre = initialCQttLitre;
        normalQtt = qtt;
        normalQttCC = initialCQttCC;
      }
    }
    if (qttlitre > 0 && qtt > 0 && qttcc > 0) {
      diff = qtt - initialCQtt;
      diffl = qttlitre - initialCQttLitre;
      diffcc = qttcc - initialCQttCC;

      let moins = 0,
        reste = 0;
      let moinsl = 0,
        restel = 0;

      if (Number(diffcc) >= Number(condml)) {
        moins = Math.floor(Number(diffcc) / Number(condml));
        reste = Number(diffcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else if (normalQttCC - diffcc < 0) {
        moins = 1;
      }
      let mmm = Number(moins) + diff;
      if (mmm > Number(condsize)) {
        moinsl = Math.floor(Number(diff) / Number(condsize));
        restel = Number(diff) - Number(condsize) * moinsl;
        if (normalQtt - reste < 0) {
          moinsl += 1;
        }
      } else if (normalQtt - mmm < 0) {
        moinsl = 1;
      }
      if (normalQttLitre - (moinsl + diffl) < 0) {
        isValid = false;
        normalQttLitre = initialCQttLitre;
        normalQtt = initialCQtt;
        normalQttCC = initialCQttCC;
      }
    }

    return {
      normalQtt,
      normalQttCC,
      normalQttLitre,
      isValid,
      isSpecific,
    };
  } else {
    let qtt = realQtt;
    let qttcc = realQttCC;
    let normalQtt = product[0]?.quantityBruteCVA;
    let normalQttCC = product[0]?.quantityCCCVA;
    let normalQttLitre = product[0]?.quantityBruteCVA;
    let initialCQtt = initialCommande.quantityParProduct;
    let initialCQttCC = initialCommande.qttByCC;
    let initialCQttLitre = initialCommande.qttbylitre;
    let dose = product.condml;
    let isValid = true;
    isSpecific = false;
    let diff = 0,
      diffcc = 0,
      diffl = 0;

    if (qtt > initialCQtt && (qttcc == 0 || qttcc == null)) {
      let moins = 0,
        reste = 0;
      diff = qtt - initialCQtt;

      if (normalQtt - diff < 0) {
        isValid = false;
        normalQtt = initialCQtt;
      }
    }
    if (qtt == 0 && qttcc > initialCQttCC) {
      let moins = 0,
        reste = 0;
      diffcc = qttcc - initialCQttCC;

      if (Number(diffcc) > Number(dose)) {
        moins = Math.floor(Number(diffcc) / Number(dose));
        reste = Number(diffcc) - Number(dose) * moins;
        console.log(reste);
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else {
        if (normalQttCC - Number(diffcc) < 0) {
          moins = 1;
        }
      }

      if (normalQtt - moins < 0) {
        isValid = false;
        normalQttCC = initialCQttCC;
      }
    }

    if (qtt > 0 && qttcc > 0) {
      let moins = 0,
        reste = 0;
      diff = qtt - initialCQtt;
      diffcc = qttcc - initialCQttCC;
      if (Number(diffcc) > Number(dose)) {
        moins = Math.floor(Number(diffcc) / Number(dose));
        reste = Number(diffcc) - Number(dose) * moins;
        console.log(reste);
        if (normalQttCC - reste < 0) {
          moins += 1;
        }
      } else {
        if (normalQttCC - Number(diffcc) < 0) {
          moins = 1;
        }
      }

      if (normalQtt - (moins + diff) < 0) {
        isValid = false;
        normalQtt = initialCQtt;
        normalQttCC = initialCQttCC;
      }
    }

    return {
      normalQtt,
      normalQttCC,
      normalQttLitre,
      isValid,
      isSpecific,
    };
  }
};
export const blockItOnMinus = (productItem, commandeItem) => {
  let isValid = true;
  let isSpecific = false;
  if (isSpecialProductHandle(productItem)) {
    isSpecific = true;
  } else {
    let normalQtt = productItem.quantityBruteCVA;
    let normalQttCC = productItem.quantityCCCVA;
    let normalQttLitre = productItem.quantityBruteCVA;
    let initialCQtt = commandeItem.quantityParProduct;
    let initialCQttCC = commandeItem.qttByCC;
    let initialCQttLitre = commandeItem.qttbylitre;
    isSpecific = false;
    if (initialCQtt > 0 && (initialCQttCC == 0 || initialCQttCC == null)) {
      if (normalQtt - initialCQtt < 0) {
        isValid = false;
      }
    }
    if (initialCQtt == 0 && initialCQttCC > 0) {
      if (normalQttCC - initialCQttCC < 0) {
        isValid = false;
      }
    }

    if (initialCQtt > 0 && initialCQttCC > 0) {
    }
  }

  return { isValid, isSpecific };
};
export const blockItOnDelete = () => {};
export const isBlocked = (productItem) => {
  if (isSpecialProductHandle(productItem)) {
    if (
      productItem.quantityBruteCVA == 0 &&
      productItem.quantityCCCVA == 0 &&
      productItem.condval == 0
    )
      return true;
    else return false;
  } else {
    if (productItem.quantityBruteCVA == 0 && productItem.quantityCCCVA == 0)
      return true;
    else return false;
  }
};
export const isLocked = (productItem) => {
  if (isSpecialProductHandle(productItem)) {
    if (
      productItem.quantityParProduct == 0 &&
      productItem.qttByCC == 0 &&
      productItem.qttbylitre == 0
    )
      return true;
    else return false;
  } else {
    if (productItem.quantityParProduct == 0 && productItem.qttByCC == 0)
      return true;
    else return false;
  }
};
export const locked = (elements) => {
  return elements.filter((el) => isLocked(el)).length > 0 ? true : false;
};
