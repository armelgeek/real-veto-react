
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
  