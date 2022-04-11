export const isSpecialProductHandle = (product) => {
  return !!(
    product.condml != 0 &&
    product.condsize != 0 &&
    product.qttccpvente != 0 &&
    product.prixqttccvente != 0
  );
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
    let isValid = true;
    if (qttlitre > 0 && qtt == 0 && qttcc == 0) {
      if (qttlitre > normalQttLitre) {
        isValid = false;
        normalQtt = qtt;
        normalQttCC = qttcc;
      }
    }
    if (qttlitre == 0 && qtt > 0 && qttcc == 0) {
      if (normalQtt - qtt < 0) {
        if (normalQttLitre - 1 < 0) {
          isValid = false;
          normalQttLitre = qttlitre;
          normalQttCC = qttcc;
        }
      }
    }
    if (qttlitre == 0 && qtt == 0 && qttcc > 0) {
      if (normalQttCC - qttcc < 0) {
        if (normalQtt - 1 < 0) {
          isValid = false;
          normalQttLitre = qttlitre;
          normalQtt = qtt;
        }
      }
    }

    if (qttlitre == 0 && qtt > 0 && qttcc > 0) {
      let moins = 0;
      if (normalQttCC - qttcc < 0) {
        moins = 1;
      }
      if (normalQtt - (moins + qtt) < 0) {
        if (normalQttLitre - 1 < 0) {
          isValid = false;
          normalQttLitre = qttlitre;
        }
      }
    }
    if (qttlitre > 0 && qtt > 0 && qttcc == 0) {
      let moinsqtt = 0;
      if (normalQtt - qtt < 0) {
        moinsqtt = 1;
      }
      if (normalQttLitre - (moinsqtt + qttlitre) < 0) {
        isValid = false;
      }
    }
    if (qttlitre > 0 && qtt == 0 && qttcc > 0) {
      let moins = 0;
      if (normalQttCC - qttcc < 0) {
        moins = 1;
      }
      let moinsqtt = 0;
      if (normalQtt - moins < 0) {
        moinsqtt = 1;
      }
      if (normalQttLitre - (moinsqtt + qttlitre) < 0) {
        isValid = false;
        normalQtt = qtt;
      }
    }
    if (qttlitre > 0 && qtt > 0 && qttcc > 0) {
      let moins = 0;
      if (normalQttCC - qttcc < 0) {
        moins = 1;
      }
      let moinsqtt = 0;
      if (normalQtt - (moins + qtt) < 0) {
        moinsqtt = 1;
      }
      if (normalQttLitre - (moinsqtt + qttlitre) < 0) {
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
    let normalQttLitre = product.quantityBruteCVA;
    isSpecific = false;
    let isValid = true;
    if (qtt == 0 && qttcc > 0) {
      let moins = 0;
      if (normalQttCC - qttcc < 0) {
        moins = 1;
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
      let moins = 0;
      if (normalQttCC - qttcc < 0) {
        moins = 1;
      }
      if (qttcc > normalQttCC) {
        if (normalQtt - (moins + qtt) < 0) {
          isValid = false;
        }
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
    let normalQtt = product[0]?.condval;
    let normalQttCC = product[0]?.quantityCCCVA;
    let normalQttLitre = product[0]?.quantityBruteCVA;

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
      let moins = 0;
      diff = qtt - initialCQtt;
      if (normalQtt - diff < 0) {
        moins = 1;
      }
      if (normalQttLitre - moins < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = initialCQtt;
        normalQttCC = qttcc;
      }
    }
    if (qttlitre == 0 && qtt == 0 && qttcc > 0) {
      let moincc = 0;
      diffcc = qttcc - initialCQttCC;
      if (normalQttCC - diffcc < 0) {
        moincc = 1;
      }
      let cx = normalQtt - moincc;
      let moinsqtt = 0;
      if (cx < 0) {
        moinsqtt = 1;
      }
      if (normalQttLitre - moinsqtt < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = qtt;
        normalQttCC = initialCQttCC;
      }
    }

    if (qttlitre == 0 && qtt > 0 && qttcc > 0) {
      let moins = 0;
      let moinsl = 0;
      diff = qtt - initialCQtt;
      diffcc = qttcc - initialCQttCC;
      if (normalQttCC - diffcc < 0) {
        moins = 1;
      }
      if (normalQtt - (diff + moins) < 0) {
        moinsl = 1;
      }
      if (normalQttLitre - moinsl < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = initialCQtt;
        normalQttCC = initialCQttCC;
      }
    }
    if (qttlitre > 0 && qtt > 0 && qttcc == 0) {
      let moinsl = 0;
      diff = qtt - initialCQtt;
      diffl = qttlitre - initialCQttLitre;
      if (normalQtt - diff < 0) {
        moinsl = 1;
      }
      if (normalQttLitre - (moinsl + diffl) < 0) {
        isValid = false;
        normalQttLitre = qttlitre;
        normalQtt = qtt;
        normalQttCC = initialCQttCC;
      }
    }
    if (qttlitre > 0 && qtt == 0 && qttcc > 0) {
      let moins = 0;
      let moinsl = 0;
      diff = qtt - initialCQtt;
      diffl = qttlitre - initialCQttLitre;
      if (normalQttCC - diffcc < 0) {
        moins = 1;
      }
      if (normalQtt - moins < 0) {
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
      let moins = 0;
      let moinsl = 0;
      diff = qtt - initialCQtt;
      diffl = qttlitre - initialCQttLitre;
      diffcc = qttcc - initialCQttCC;
      if (normalQttCC - diffcc < 0) {
        moins = 1;
      }
      if (normalQtt - (diff + moins) < 0) {
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
    let isValid = true;
    isSpecific = false;
    let diff = 0,
      diffcc = 0,
      diffl = 0;

    if (qtt > initialCQtt && (qttcc == 0 || qttcc == null)) {
      diff = qtt - initialCQtt;
      if (normalQtt - diff < 0) {
        isValid = false;
        normalQtt = initialCQtt;
      }
    }
    if (qtt == 0 && qttcc > initialCQttCC) {
      diffcc = qttcc - initialCQttCC;
      if (normalQttCC - diffcc < 0) {
        // diff / dose
        if (normalQtt - 1 < 0) {
          isValid = false;
          normalQttCC = initialCQttCC;
        }
      }
    }

    if (qtt > 0 && qttcc > 0) {
      diff = qtt - initialCQtt;

      diffcc = qttcc - initialCQttCC;

      let moins = 0;
      if (normalQttCC - diffcc < 0) {
        moins = 1;
      }
      console.log(normalQtt - (moins + diff));
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

export const blockItOnDelete = () => {};
