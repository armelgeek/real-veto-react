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
          normalQtt = qtt;
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
        let moins = 0;
  
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