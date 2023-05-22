export const isSpecialProductHandle = (product) => {
  return !!(
    product.condml != 0 &&
    product.condsize != 0 &&
    product.qttccpvente != 0 &&
    product.prixqttccvente != 0
  );
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
    let condsize = product.condsize;
    let dose = product.doseDefault;
    let condml = product.condml;
    if (qttlitre > 0 && qtt == 0 && qttcc == 0) {
      product.quantityBruteCVA -= qttlitre;
      //tester le 12 avril 2022 : marche tres bien
    }
    if (qttlitre == 0 && qtt > 0 && qttcc == 0) {
      //tester le 12 avril 2022 : marche tres bien
      let moins = 0,
        reste = 0;
      if (Number(qtt) >= Number(condsize)) {
        moins = Math.floor(Number(qtt) / Number(condsize));
        reste = Number(qtt) - Number(condsize) * moins;

        if (normalQtt - reste < 0) {
          //tester le 12 avril 2022 : marche tres bien
          let diff = Number(reste) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moins += 1;
        } else {
          product.condval = normalQtt - reste;
        }
      } else {
        //tester le 12 avril 2022 : marche tres bien
        if (product.condval - Number(qtt) < 0) {
          let diff = Number(qtt) - Number(product.condval);
          let mireste = Number(condsize) - Number(diff);
          product.condval = mireste;
          moins += 1;
        } else {
          product.condval -= Number(qtt);
        }
      }
      product.quantityBruteCVA -= moins;
    }
    if (qttlitre == 0 && qtt == 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) >= Number(condml)) {
        moins = Math.floor(Number(qttcc) / Number(condml));
        reste = Number(qttcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          let diff = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(condml) - Number(diff);
          moins += 1;
        } else {
          product.quantityCCCVA = normalQttCC - reste;
        }
      } else {
        //tester le 12 avril 2022 : marche tres bien
        if (Number(qttcc) >= product.quantityCCCVA) {
          moins += 1;
          let diff = Number(qttcc) - product.quantityCCCVA;
          product.quantityCCCVA = Number(condml) - diff;
        } else {
          product.quantityCCCVA -= Number(qttcc);
        }
      }
      if (Number(moins) >= Number(condsize)) {
        moinslitre = Math.floor(Number(moins) / Number(condsize));
        restelitre = Number(moins) - Number(condsize) * restelitre;
        if (normalQtt - restelitre < 0) {
          //tester le 12 avril 2022 : marche tres bien
          let diff = Number(restelitre) - Number(normalQtt);
          product.condval = Number(condsize) - Number(diff);
          moinslitre += 1;
        } else {
          product.condval = normalQtt - restelitre;
        }
      } else {
        //tester le 12 avril 2022 : marche tres bien
        if (product.condval - Number(moins) < 0) {
          let diff = Number(moins) - Number(product.condval);
          let mireste = Number(condsize) - Number(diff);
          product.condval = mireste;
          moinslitre += 1;
        } else {
          product.condval -= Number(moins);
        }
      }
      product.quantityBruteCVA -= moinslitre;
    }

    if (qttlitre == 0 && qtt > 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) >= Number(condml)) {
        moins = Math.floor(Number(qttcc) / Number(condml));
        reste = Number(qttcc) - Number(condml) * moins;
        if (normalQttCC - reste < 0) {
          let diff = Number(reste) - Number(normalQttCC);
          product.quantityCCCVA = Number(condml) - Number(diff);
          moins += 1;
        } else {
          // ok
          product.quantityCCCVA = Number(normalQttCC) - reste;
        }
      } else {
        // ok
        if (Number(qttcc) >= product.quantityCCCVA) {
          moins += 1;
          let diff = Number(qttcc) - product.quantityCCCVA;
          product.quantityCCCVA = Number(condml) - diff;
        } else {
          product.quantityCCCVA -= Number(qttcc);
        }
      }
      let mm = Number(qtt) + moins;
      if (mm >= Number(condsize)) {
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
        // a teste avant
        if (product.condval - Number(mm) < 0) {
          let diffic = Number(mm) - Number(product.condval);
          let mireste = Number(condsize) - Number(diffic);
          product.condval = mireste;
          moinslitre += 1;
        } else {
          product.condval -= Number(mm);
        }
      }
      product.quantityBruteCVA -= moinslitre;
    }

    if (qttlitre > 0 && qtt > 0 && qttcc == 0) {
      let moinslitre = 0,
        restelitre = 0;

      if (Number(qtt) >= Number(condsize)) {
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
        if (product.condval - Number(qtt) < 0) {
          let diffic = Number(qtt) - Number(product.condval);
          let mireste = Number(condsize) - Number(diffic);
          product.condval = mireste;
          moinslitre += 1;
        } else {
          product.condval -= Number(qtt);
        }
      }
      product.quantityBruteCVA -= moinslitre + qttlitre;
    }

    if (qttlitre > 0 && qtt == 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) >= Number(condml)) {
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
        // ok
        if (Number(qttcc) >= product.quantityCCCVA) {
          moins += 1;
          let diff = Number(qttcc) - product.quantityCCCVA;
          product.quantityCCCVA = Number(condml) - diff;
        } else {
          product.quantityCCCVA -= Number(qttcc);
        }
      }

      if (Number(moins) >= Number(condsize)) {
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
        //ok
        if (product.condval - Number(moins) < 0) {
          let diff = Number(moins) - Number(product.condval);
          let mireste = Number(condsize) - Number(diff);
          product.condval = mireste;
          moinslitre += 1;
        } else {
          product.condval -= Number(moins);
        }
      }
      product.quantityBruteCVA -= moinslitre + qttlitre;
    }
    if (qttlitre > 0 && qtt > 0 && qttcc > 0) {
      let moins = 0,
        moinslitre = 0,
        restelitre = 0,
        reste = 0;
      if (Number(qttcc) >= Number(condml)) {
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
        if (Number(qttcc) >= product.quantityCCCVA) {
          moins += 1;
          let diff = Number(qttcc) - product.quantityCCCVA;
          product.quantityCCCVA = Number(condml) - diff;
        } else {
          product.quantityCCCVA -= Number(qttcc);
        }
      }
      let mns = Number(moins) + Number(qtt);
      if (mns >= Number(condsize)) {
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
        if (product.condval - Number(mns) < 0) {
          let diff = Number(mns) - Number(product.condval);
          let mireste = Number(condsize) - Number(diff);
          product.condval = mireste;
          moinslitre += 1;
        } else {
          product.condval -= Number(mns);
        }
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
      //tester le 12 avril 2022 : marche tres bien
      let moins = 0,
        reste = 0;
      if (Number(qttcc) >= Number(dose)) {
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
        // a tester avant la saisie
        if (product.quantityCCCVA - Number(qttcc) < 0) {
          let diff = Number(qttcc) - Number(product.quantityCCCVA);
          product.quantityCCCVA = Number(dose) - Number(diff);
          moins += 1;
        } else {
          product.quantityCCCVA -= Number(qttcc);
        }
      }
      console.log(moins);
      product.quantityBruteCVA -= moins;
    }
    if (qtt > 0 && qttcc == 0) {
      //tester le 12 avril 2022 : marche tres bien
      product.quantityBruteCVA -= qtt;
    }
    if (qtt > 0 && qttcc > 0) {
      //tester le 12 avril 2022 : marche tres bien
      let moins = 0,
        reste = 0;
      if (Number(qttcc) >= Number(dose)) {
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
        if (product.quantityCCCVA - Number(qttcc) < 0) {
          let diff = Number(qttcc) - Number(product.quantityCCCVA);
          product.quantityCCCVA = Number(dose) - Number(diff);
          moins += 1;
        } else {
          product.quantityCCCVA -= Number(qttcc);
        }
      }
      let x = moins + Number(qtt);
      product.quantityBruteCVA -= x;
    }
  }
};
