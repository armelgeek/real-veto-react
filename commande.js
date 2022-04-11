const db = require("../models/index.js");
const { getPagingData } = require("../lib/api/getList");
const moment = require("moment");
const { Op } = require("sequelize");
const { sequelize } = require("../models/index.js");
const isSpecialProductHandle = (product) => {
  return !!(
    product.condml != 0 &&
    product.condsize != 0 &&
    product.qttccpvente != 0 &&
    product.prixqttccvente != 0
  );
};
/**
 * debut du fonction de retour de produit
 */
const oneSoldOneReturn = (product, initialCommande) => {
  // 1 vendu,1 retour
  let etat = "none";
  let diff = 0;
  if (product.quantityParProduct > 0) {
    if (product.quantityBruteCVA >= 0) {
      if (product.quantityParProduct == initialCommande.quantityParProduct) {
        //  product.quantityBruteCVA += product.quantityParProduct;
        diff = 0;
        etat = "same-qtt";
      } else if (
        initialCommande.quantityParProduct > product.quantityParProduct
      ) {
        diff = initialCommande.quantityParProduct - product.quantityParProduct;
        // initialCommande.quantityParProduct -= diff;
        // initialCommande.quantityBruteCVA += diff;
        // product.quantityParProduct = 0;
        // product.quantityBruteCVA += diff;
        etat = "minus-qtt";
      } else if (
        initialCommande.quantityParProduct < product.quantityParProduct
      ) {
        diff = product.quantityParProduct - initialCommande.quantityParProduct;
        /* initialCommande.quantityParProduct += diff;
        if (initialCommande.quantityBruteCVA - diff > 0) {
          initialCommande.quantityBruteCVA -= diff;
        } else {
          initialCommande.quantityBruteCVA = 0;
        }
*/
        // product.quantityParProduct = 0;
        // product.quantityBruteCVA -= differ;
        etat = "add-qtt";
      }
    }
  }
  return {
    diff,
    quantityParProduct: product.quantityParProduct,
    transformedCommande: initialCommande,
    etat,
  };
};
const mlSoldIncrement = (product, initialCommande) => {
  let etat = "none";
  let diff = 0;
  let diffcc = 0;
  if (product.qttByCC >= 0) {
    if (product.quantityParProduct >= 0) {
      console.log("initial:", initialCommande.quantityParProduct);
      console.log("initial cc :", initialCommande.quantityCCCVA);
      console.log("initial cbva:", initialCommande.quantityBruteCVA);
      if (product.quantityParProduct == initialCommande.quantityParProduct) {
        if (product.qttByCC > initialCommande.qttByCC) {
          // 19 < 20
          diffcc = product.qttByCC - initialCommande.qttByCC;
          // 20 - 10 = 10
          initialCommande.qttByCC += diffcc;
          // 10 +10 = 20
          if (isSpecialProductHandle(product)) {
            if (product.quantityCCCVA - diffcc > 0) {
              if (initialCommande.quantityCCCVA - diffcc > 0) {
                initialCommande.quantityCCCVA -= diffcc;
              } else {
                initialCommande.quantityCCCVA = 0;
              }
              if (product.quantityCCCVA - diffcc > 0) {
                product.quantityCCCVA -= diffcc;
              } else {
                product.quantityCCCVA = 0;
              }
            } else {
              if (product.condval > 0) {
                if (diffcc - product.quantityCCCVA == 0) {
                  product.quantityCCCVA = 0;
                  product.condval -= 1;
                } else {
                  if (product.condval - 1 >= 0) {
                    product.condval -= 1;
                  } else {
                    product.condval = 0;
                  }
                  //100 + (60-59)
                  product.quantityCCCVA =
                    product.condml - (diffcc - product.quantityCCCVA);
                }
              } else {
                // 40 - 40 = 0
                product.quantityCCCVA = 0;
              }
            }
          } else {
            if (product.quantityCCCVA - diffcc > 0) {
              // 40 - 10 = 30
              if (initialCommande.quantityCCCVA - diffcc > 0) {
                initialCommande.quantityCCCVA -= diffcc;
              } else {
                initialCommande.quantityCCCVA = 0;
              }
              if (product.quantityCCCVA - diffcc > 0) {
                product.quantityCCCVA -= diffcc;
              } else {
                product.quantityCCCVA = 0;
              }
            } else {
              if (product.quantityBruteCVA > 0) {
                if (diffcc - product.quantityCCCVA == 0) {
                  product.quantityCCCVA = 0;
                  product.quantityBruteCVA -= 1;
                } else {
                  product.quantityBruteCVA -= 1;
                  //100 + (60-59)
                  product.quantityCCCVA =
                    product.doseDefault - (diffcc - product.quantityCCCVA);
                }
              } else {
                // 40 - 40 = 0
                product.quantityCCCVA = 0;
              }
            }
          }

          etat = "same-cc-big-qtt";
          /* console.log("final:", product.quantityParProduct);
          console.log("intit cc :", initialCommande.quantityCCCVA);
          console.log("final cc :", product.quantityCCCVA);
         
          console.log("diffcc:", product.qttByCC);*/
        }
        if (product.qttByCC < initialCommande.qttByCC) {
          diffcc = initialCommande.qttByCC - product.qttByCC;
          // 90 - 20 = 70
          initialCommande.qttByCC -= diffcc;
          if (isSpecialProductHandle(product)) {
            if (initialCommande.quantityCCCVA + diffcc > product.condml) {
              initialCommande.condval += 1;
              initialCommande.quantityCCCVA =
                initialCommande.quantityCCCVA + diffcc - product.condml;
            } else if (
              initialCommande.quantityCCCVA + diffcc ==
              product.condml
            ) {
              if (initialCommande.condval + 1 > initialCommande.condsize) {
                initialCommande.quantityBruteCVA += 1;
                initialCommande.condval =
                  initialCommande.condval + 1 - initialCommande.condsize;
              } else {
                initialCommande.condval += 1;
              }
              initialCommande.quantityCCCVA = 0;
            }
          } else {
            if (initialCommande.quantityCCCVA + diffcc > product.doseDefault) {
              // 40 + 70 =110 > 100
              initialCommande.quantityBruteCVA += 1;
              // + 1 boite
              initialCommande.quantityCCCVA =
                initialCommande.quantityCCCVA + diffcc - product.doseDefault;
              // 110 - 100 = 10
            } else if (
              initialCommande.quantityCCCVA + diffcc ==
              product.doseDefault
            ) {
              initialCommande.quantityBruteCVA += 1;
              initialCommande.quantityCCCVA = 0;
            } else {
              // 40 + 14 = 64 < 100
              initialCommande.quantityCCCVA += diffcc;
            }
            if (initialCommande.quantityParProduct - diff < 0) {
              initialCommande.quantityParProduct -= diff;
            } else initialCommande.quantityParProduct = 0;

            if (product.quantityCCCVA + diffcc > product.doseDefault) {
              product.quantityBruteCVA += 1;
              product.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.doseDefault;
            } else if (product.quantityCCCVA + diffcc == product.doseDefault) {
              product.quantityBruteCVA += 1;
              product.quantityCCCVA = 0;
            } else {
              product.quantityCCCVA += diffcc;
            }
          }
          // 20
        }
        console.log("diff:", diff);
        console.log("diffcc:", diffcc);
        // console.log("final:", product.quantityParProduct);
        console.log("final cbv:", product.quantityBruteCVA);
        console.log("final cc :", product.quantityCCCVA);
        etat = "samme-cc-min-qtt";
      } else if (
        initialCommande.quantityParProduct > product.quantityParProduct
      ) {
        // 1  > 0
        diff = initialCommande.quantityParProduct - product.quantityParProduct;

        if (product.qttByCC > initialCommande.qttByCC) {
          // 11 _ 9
          // 19 < 20
          diffcc = product.qttByCC - initialCommande.qttByCC;
          // 20 - 10 = 10
          initialCommande.qttByCC += diffcc;
          if (isSpecialProductHandle(product)) {
            if (product.quantityCCCVA - diffcc > 0) {
              if (initialCommande.quantityCCCVA - diffcc > 0) {
                initialCommande.quantityCCCVA -= diffcc;
              } else {
                initialCommande.quantityCCCVA = 0;
              }
              if (product.quantityCCCVA - diffcc > 0) {
                product.quantityCCCVA -= diffcc;
              } else {
                product.quantityCCCVA = 0;
              }
              if (product.condval - diff > 0) {
                product.condval -= diff;
              } else {
                product.condval = 0;
              }
            } else {
              if (product.condval > 0) {
                if (diffcc - product.quantityCCCVA == 0) {
                  product.quantityCCCVA = 0;
                  product.condval = product.condval - diff - 1;
                } else {
                  if (product.condval - diff - 1 < 0) {
                    product.condval = 0;
                  } else {
                    product.condval = product.condval - diff - 1;
                  }
                  product.quantityCCCVA =
                    product.condml - (diffcc - product.quantityCCCVA);
                }
              } else {
                // 40 - 40 = 0
                product.quantityCCCVA = 0;
              }
            }
          } else {
            // 10 +10 = 20
            if (product.quantityCCCVA - diffcc > 0) {
              // 40 - 10 = 30
              if (initialCommande.quantityCCCVA - diffcc > 0) {
                initialCommande.quantityCCCVA -= diffcc;
              } else {
                initialCommande.quantityCCCVA = 0;
              }
              if (product.quantityCCCVA - diffcc > 0) {
                product.quantityCCCVA -= diffcc;
              } else {
                product.quantityCCCVA = 0;
              }
              if (product.quantityBruteCVA - diff > 0) {
                product.quantityBruteCVA -= diff;
              } else {
                product.quantityBruteCVA = 0;
              }
            } else {
              if (product.quantityBruteCVA > 0) {
                if (diffcc - product.quantityCCCVA == 0) {
                  product.quantityCCCVA = 0;
                  product.quantityBruteCVA - diff - 1;
                } else {
                  if (product.quantityBruteCVA - diff - 1 < 0) {
                    product.quantityBruteCVA = 0;
                  } else {
                    product.quantityBruteCVA =
                      product.quantityBruteCVA - diff - 1;
                  }
                  product.quantityCCCVA =
                    product.doseDefault - (diffcc - product.quantityCCCVA);
                }
              } else {
                // 40 - 40 = 0
                product.quantityCCCVA = 0;
              }
            }
          }
        }
        if (product.qttByCC < initialCommande.qttByCC) {
          // 9 _ 11

          diffcc = initialCommande.qttByCC - product.qttByCC;
          // 90 - 20 = 70
          initialCommande.qttByCC -= diffcc;
          // 20

          if (isSpecialProductHandle(product)) {
            if (initialCommande.quantityCCCVA + diffcc > product.condml) {
              // 40 + 70 =110 > 100
              if (initialCommande.condval + 1 > initialCommande.condsize) {
                if (initialCommande.quantityBruteCVA > 0) {
                  initialCommande.quantityBruteCVA += 1;
                  initialCommande.condval = initialCommande.condsize;
                } else {
                  initialCommande.condval = initialCommande.condsize;
                }
              }
              initialCommande.condval += 1;

              // + 1 boite
              initialCommande.quantityCCCVA =
                initialCommande.quantityCCCVA + diffcc - product.condml;
              // 110 - 100 = 10
            } else {
              initialCommande.quantityCCCVA += diffcc;
            }
            if (product.quantityCCCVA + diffcc > product.condml) {
              if (product.condval + diff + 1 < product.condsize) {
                product.condval = product.condval + diff + 1;
              } else {
                if (product.quantityBruteCVA > 0) {
                  product.quantityBruteCVA += 1;
                  product.condval = product.condsize;
                } else {
                  product.condval = product.condsize;
                }
              }
              product.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.condml;
            } else if (product.quantityCCCVA + diffcc == product.condml) {
              if (product.condval + diff + 1 < product.condsize) {
                product.condval = product.condval + diff + 1;
              } else {
                if (product.quantityBruteCVA > 0) {
                  product.quantityBruteCVA += 1;
                  product.condval = product.condsize;
                } else {
                  product.condval = product.condsize;
                }
              }
              product.quantityCCCVA = 0;
            }
          } else {
            if (initialCommande.quantityCCCVA + diffcc > product.doseDefault) {
              // 40 + 70 =110 > 100
              initialCommande.quantityBruteCVA += 1;
              // + 1 boite
              initialCommande.quantityCCCVA =
                initialCommande.quantityCCCVA + diffcc - product.doseDefault;
              // 110 - 100 = 10
            } else {
              // 40 + 14 = 64 < 100
              initialCommande.quantityCCCVA += diffcc;
            }
            if (product.quantityCCCVA + diffcc > product.doseDefault) {
              product.quantityBruteCVA = product.quantityBruteCVA + diff + 1;
              product.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.doseDefault;
            } else if (product.quantityCCCVA + diffcc == product.doseDefault) {
              product.quantityBruteCVA = product.quantityBruteCVA + diff + 1;
              product.quantityCCCVA = 0;
            } else {
              product.quantityBruteCVA = product.quantityBruteCVA + diff + 1;
              product.quantityCCCVA += diffcc;
            }
          }
          
        } else if (diff > 0 && initialCommande.qttByCC == product.qttByCC) {
          if (isSpecialProductHandle(product)) {
            if (product.quantityBruteCVA > 0) {
              product.quantityBruteCVA += 1;
              product.condval = product.condsize;
            } else {
              product.condval = product.condsize;
            }
          }else{
            product.quantityBruteCVA += diff;
          }
         
        }
        console.log("diff:", diff);
        console.log("diffcc:", diffcc);
        // console.log("final:", product.quantityParProduct);
        console.log("final cbv:", product.quantityBruteCVA);
        console.log("final cc :", product.quantityCCCVA);
        etat = "minus-qtt-with-cc";
      
      
      } else if (
        initialCommande.quantityParProduct < product.quantityParProduct
      ) {
      
        etat = "add-qtt-with-cc";
        diff = product.quantityParProduct - initialCommande.quantityParProduct;
        if (initialCommande.qttByCC > product.qttByCC) {
          // 90 20
          diffcc = initialCommande.qttByCC - product.qttByCC;
          // 90 - 20 = 70
          initialCommande.qttByCC -= diffcc;
          // 20
          if (isSpecialProductHandle(product)) {
            if (initialCommande.quantityCCCVA + diffcc > product.condml) {
              // 40 + 70 =110 > 100
              
              if(initialCommande.condval +1 < initialCommande.condsize){
                if (product.quantityBruteCVA > 0) {
                  product.quantityBruteCVA += 1;
                  product.condval = product.condsize;
                } else {
                  initialCommande.condval += 1;
                }
              }
              initialCommande.quantityCCCVA =
                initialCommande.quantityCCCVA + diffcc - product.condml;
              // 110 - 100 = 10
            } else {
              // 40 + 14 = 64 < 100
              initialCommande.quantityCCCVA += diffcc;
            }
            if (product.quantityCCCVA + diffcc > product.condml) {
              product.condval = product.condval + diff + 1;
              product.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.condml;
            } else if (product.quantityCCCVA + diffcc == product.condml) {
              product.condval = product.condval + diff + 1;
              product.quantityCCCVA = 0;
            } else {
              product.condval += diff;
              product.quantityCCCVA += diffcc;
            }
          }else{
            if (initialCommande.quantityCCCVA + diffcc > product.doseDefault) {
              // 40 + 70 =110 > 100
              initialCommande.quantityBruteCVA += 1;
              // + 1 boite
              initialCommande.quantityCCCVA =
                initialCommande.quantityCCCVA + diffcc - product.doseDefault;
              // 110 - 100 = 10
            } else {
              // 40 + 14 = 64 < 100
              initialCommande.quantityCCCVA += diffcc;
            }
            if (product.quantityCCCVA + diffcc > product.doseDefault) {
              product.quantityBruteCVA = product.quantityBruteCVA + diff + 1;
              product.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.doseDefault;
            } else if (product.quantityCCCVA + diffcc == product.doseDefault) {
              product.quantityBruteCVA = product.quantityBruteCVA + diff + 1;
              product.quantityCCCVA = 0;
            } else {
              product.quantityBruteCVA += diff;
              product.quantityCCCVA += diffcc;
            }
          }
       
        
          //product.quantityBruteCVA += diff;
          //initialCommande.qttByCC -= diffcc;
          //initialCommande.quantityCCCVA += diffcc;
          // 21 > 20
        } else if (initialCommande.qttByCC < product.qttByCC) {
          // 19 < 20
          diffcc = product.qttByCC - initialCommande.qttByCC;

          // 20 - 10 = 10
          initialCommande.qttByCC += diffcc;
          // 10 +10 = 20
          if (isSpecialProductHandle(product)) {
            if (product.quantityCCCVA - diffcc > 0) {
              // 40 - 10 = 30
              if (initialCommande.quantityCCCVA - diffcc > 0) {
                initialCommande.quantityCCCVA -= diffcc;
              } else {
                initialCommande.quantityCCCVA = 0;
              }
              if (product.quantityCCCVA - diffcc > 0) {
                product.quantityCCCVA -= diffcc;
              } else {
                product.quantityCCCVA = 0;
              }
            } else {
              if (product.condval > 0) {
                if (diffcc - product.quantityCCCVA == 0) {
                  product.quantityCCCVA = 0;
                } else {
                  if (product.condval - 1 - diff < 0) {
                    product.condval -= 1;
                  } else {
                    product.condval = 0;
                  }
                  product.quantityCCCVA =
                    product.condml - (diffcc - product.quantityCCCVA);
                }
              } else {
                // 40 - 40 = 0
                product.quantityCCCVA = 0;
              }
            }
          }else{
            if (product.quantityCCCVA - diffcc > 0) {
              // 40 - 10 = 30
              if (initialCommande.quantityCCCVA - diffcc > 0) {
                initialCommande.quantityCCCVA -= diffcc;
              } else {
                initialCommande.quantityCCCVA = 0;
              }
              if (product.quantityCCCVA - diffcc > 0) {
                product.quantityCCCVA -= diffcc;
              } else {
                product.quantityCCCVA = 0;
              }
            } else {
              if (product.quantityBruteCVA > 0) {
                if (diffcc - product.quantityCCCVA == 0) {
                  product.quantityCCCVA = 0;
                } else {
                  if (product.quantityBruteCVA - 1 - diff < 0) {
                    product.quantityBruteCVA -= 1;
                  } else {
                    product.quantityBruteCVA = 0;
                  }
                  product.quantityCCCVA =
                    product.doseDefault - (diffcc - product.quantityCCCVA);
                }
              } else {
                // 40 - 40 = 0
                product.quantityCCCVA = 0;
              }
            }
          }
        
          
          ///
        } else if (diff > 0 && initialCommande.qttByCC == product.qttByCC) {
          if (isSpecialProductHandle(product)) {
            if (product.quantityBruteCVA > 0) {
              product.quantityBruteCVA += 1;
              product.condval = product.condsize;
            } else {
              product.condval = product.condsize;
            }
          }else{
            product.quantityBruteCVA += diff;
          }
        }

        console.log("diff:", diff);
        console.log("diffcc:", diffcc);
        console.log("brute:", product.quantityParProduct);
        console.log("cc:", product.qttByCC);
        console.log("final cbv:", product.quantityBruteCVA);
        console.log("final cc :", product.quantityCCCVA);
      }
    } else {
      if (product.quantityCCCVA >= 0) {
        if (product.qttByCC == initialCommande.qttByCC) {
          etat = "same-qtt-cc";
        }
        if (initialCommande.qttByCC > product.qttByCC) {
          etat = "minus-qtt-cc";
          // 90 20
          diffcc = initialCommande.qttByCC - product.qttByCC;
          // 90 - 20 = 70
          initialCommande.qttByCC -= diffcc;
          // 20

          if (isSpecialProductHandle(product)) {
            if (product.quantityCCCVA + diffcc > product.condml) {
              initialCommande.condval += 1;
              // + 1 boite
              initialCommande.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.condml;
              // 200+  100 - 250
            } else {
              initialCommande.quantityCCCVA += diffcc;
            }
            if (product.quantityCCCVA + diffcc > product.condml) {
              product.quantityBruteCVA += 1;
              product.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.condml;
            } else if (
              initialCommande.quantityCCCVA + diffcc ==
              product.condml
            ) {
              product.quantityBruteCVA = product.quantityBruteCVA + 1;
              product.quantityCCCVA = 0;
            } else {
              product.quantityCCCVA += diffcc;
            }
          } else {
            if (initialCommande.quantityCCCVA + diffcc > product.doseDefault) {
              // 40 + 70 =110 > 100
              initialCommande.quantityBruteCVA += 1;
              // + 1 boite
              initialCommande.quantityCCCVA =
                initialCommande.quantityCCCVA + diffcc - product.doseDefault;
              // 110 - 100 = 10
            } else if (
              initialCommande.quantityCCCVA + diffcc ==
              product.doseDefault
            ) {
              product.quantityBruteCVA = product.quantityBruteCVA + 1;
              product.quantityCCCVA = 0;
            } else {
              // 40 + 14 = 64 < 100
              initialCommande.quantityCCCVA += diffcc;
            }
            if (product.quantityCCCVA + diffcc > product.doseDefault) {
              product.quantityBruteCVA += 1;
              product.quantityCCCVA =
                product.quantityCCCVA + diffcc - product.doseDefault;
            } else {
              product.quantityCCCVA += diffcc;
            }
          }

          //initialCommande.qttByCC -= diffcc;
          //initialCommande.quantityCCCVA += diffcc;
          // 21 > 20
        }
        if (initialCommande.qttByCC < product.qttByCC) {
          // 19 < 20
          etat = "add-qtt-cc";
          diffcc = product.qttByCC - initialCommande.qttByCC;

          // 20 - 10 = 10
          initialCommande.qttByCC += diffcc;
          // 10 +10 = 20
          if (isSpecialProductHandle(product)) {
            if (product.quantityCCCVA + diffcc > product.condml) {
              // 200 + 32 > 50
              // 200 + 100 = 300 > 250
              // 50
              // + 1
              if (product.condval + 1 < product.condsize) {
                // 3 + 1 =
                product.condval += 1;
              } else {
                product.condval = product.condsize;
                /**   if(product.phytoqq > 0){
                  
                } */

                /** Todo retour a la litre ici pour le tikaz */
              }
              if (product.quantityCCCVA + diffcc - product.condml == 0) {
                product.quantityCCCVA = 0;
              } else {
                product.quantityCCCVA =
                  product.quantityCCCVA + diffcc - product.condml;
              }
            } else {
              // 20 + 20 < 100
              product.quantityCCCVA += diffcc;
            }
          } else {
            if (product.quantityCCCVA - diffcc > 0) {
              // 40 - 10 = 30
              if (initialCommande.quantityCCCVA - diffcc > 0) {
                initialCommande.quantityCCCVA -= diffcc;
              } else {
                initialCommande.quantityCCCVA = 0;
              }
              if (product.quantityCCCVA - diffcc > 0) {
                product.quantityCCCVA -= diffcc;
              } else {
                product.quantityCCCVA = 0;
              }
            } else {
              if (product.quantityBruteCVA > 0) {
                if (diffcc - product.quantityCCCVA == 0) {
                  product.quantityCCCVA = 0;
                } else {
                  product.quantityBruteCVA -= 1;
                  //100 + (60-59)
                  product.quantityCCCVA =
                    product.doseDefault - (diffcc - product.quantityCCCVA);
                }
              } else {
                // 40 - 40 = 0
                product.quantityBruteCVA = 0;
                product.quantityCCCVA = 0;
              }
            }
          }

          ///
        }
        /* if (product.quantityCCCVA + product.qttByCC > product.doseDefault) {
        //20 + reste ML > dosedefault  qttbrute +1, qttcc = quantityCCCVA + qttByCC - doseDefault
        // 90 + 20 > 100
        product.quantityBruteCVA += 1;
        product.quantityCCCVA =
          product.quantityCCCVA + product.qttByCC - product.doseDefault;
      } else {
        // 20 + 20 < 100
        product.quantityCCCVA += product.qttByCC;
      }*/
      }
    }
  } else {
    if (product.quantityParProduct >= 0) {
      if (product.quantityBruteCVA > 0) {
        if (product.quantityParProduct == initialCommande.quantityParProduct) {
          //  product.quantityBruteCVA += product.quantityParProduct;
          diff = 0;
          etat = "same-qtt";
        }
        if (initialCommande.quantityParProduct > product.quantityParProduct) {
          diff =
            initialCommande.quantityParProduct - product.quantityParProduct;
          initialCommande.quantityParProduct -= diff;
          initialCommande.quantityBruteCVA += diff;
          product.quantityParProduct = 0;
          product.quantityBruteCVA += diff;
          etat = "minus-qtt";
        }
        if (initialCommande.quantityParProduct < product.quantityParProduct) {
          diff =
            product.quantityParProduct - initialCommande.quantityParProduct;
          initialCommande.quantityParProduct += diff;
          if (initialCommande.quantityBruteCVA - diff > 0) {
            initialCommande.quantityBruteCVA -= diff;
          }
          if (product.quantityBruteCVA - diff > 0) {
            product.quantityBruteCVA -= diff;
          }
          product.quantityParProduct = 0;
          // product.quantityBruteCVA -= differ;
          etat = "add-qtt";
        }
      }
    }
  }

  return { product, diff, diffcc, initialCommande, etat };
};

/**
 * fin de la fonction de retour de produit
 *
 */

exports.addFromMagasin = async (req, res, next) => {
  const id = req.body.id;
  const contenu = req.body.contenu;
  const sorte = req.body.sorte;
  const type = req.body.type;
  const emprunterId = req.body.emprunterId;
  const vaccinateurId = req.body.vaccinateurId;
  const status = req.body.status;
  const dateCom = req.body.dateCom;
  await sequelize
    .transaction(async (t) => {
      if (contenu.length > 0) {
        for (const c of contenu) {
          let product = await db.product.findByPk(c.id, { transaction: t });
          await db.product.update(
            {
              quantityBruteCVA: c.quantityBruteCVA,
              quantityCCCVA: c.quantityCCCVA,
              condval: c.condval,
              quantityParProduct: 0,
              qttByCC: 0,
              qttyspecificmirror: 0,
            },
            { transaction: t, where: { id: c.id } }
          );
        }
      }
      await db.commande.create(
        {
          contenu: contenu,
          sorte: sorte,
          type: type,
          status: status,
          vaccinateurId: vaccinateurId,
          emprunterId: emprunterId,
          dateCom: dateCom,
        },
        { transaction: t }
      );
    })
    .then(function (result) {
      res.send({
        message: "Ok!!!",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
};
exports.updateObjectValue = (state, index, key, value) => {
  let temp_state = [...state];
  temp_state[index] = { ...temp_state[index], [key]: value };
  return temp_state;
};

exports.updateFromMagasin = async (req, res, next) => {
  const id = req.body.id;
  const contenu = req.body.contenu;
  const sorte = req.body.sorte;
  const type = req.body.type;
  const status = req.body.status;
  const emprunterId = req.body.emprunterId;
  const vaccinateurId = req.body.vaccinateurId;
  const exist = req.body.exist;
  const missing = req.body.missing;
  const added = req.body.added;

  await sequelize
    .transaction(async (t) => {
      let commande = await db.commande.findByPk(id, { transaction: t });

      if (exist.length > 0) {
        for (const ex of exist) {
          let initial = commande.contenu.find((p) => p.id == ex.id);
          let index = commande.contenu.findIndex((p) => p.id == ex.id);

          let val = mlSoldIncrement(ex, initial);
          // console.log(val.product);
          /**      console.log(
            val.product.name,
            val.product.qttByCC,
            val.initialCommande.qttByCC,
            val.etat,
            val.diff,
            val.diffcc
          ); */
          let modific = this.updateObjectValue(
            commande.contenu,
            index,
            "quantityParProduct",
            val.initialCommande.quantityParProduct
          );
          let modificcc = this.updateObjectValue(
            modific,
            index,
            "qttByCC",
            val.initialCommande.qttByCC
          );
          let qttbrecva = this.updateObjectValue(
            modificcc,
            index,
            "quantityBruteCVA",
            val.initialCommande.quantityBruteCVA
          );
          let qttbrecccc = this.updateObjectValue(
            qttbrecva,
            index,
            "quantityCCCVA",
            val.initialCommande.quantityCCCVA
          );
          console.log(val.etat);
          /*   await db.commande.update(
            {
              contenu: qttbrecccc,
            },
            {
              where: {
                id: id,
              },
              transaction: t,
            }
          );

          await db.product.update(
            {
              quantityBruteCVA: val.product.quantityBruteCVA,
              quantityCCCVA: val.product.quantityCCCVA,
            },
            {
              transaction: t,
              where: { id: ex.id },
            }
          );*/
          /** if (val.etat == "add-qtt-cc") {
            await db.commande.update(
              {
                contenu: qttbrecccc,
              },
              {
                where: {
                  id: id,
                },
                transaction: t,
              }
            );

            await db.product.update(
              {
                quantityBruteCVA: val.product.quantityBruteCVA,
                quantityCCCVA: val.product.quantityCCCVA,
              },
              {
                transaction: t,
                where: { id: ex.id },
              }
            );
          }
          if (val.etat == "minus-qtt-cc") {
            await db.commande.update(
              {
                contenu: modificcc,
              },
              {
                where: {
                  id: id,
                },
                transaction: t,
              }
            );

            await db.product.update(
              {
                quantityBruteCVA: val.product.quantityBruteCVA,
                quantityCCCVA: val.product.quantityCCCVA,
              },
              {
                transaction: t,
                where: { id: ex.id },
              }
            );
          }
          if (val.etat == "add-qtt") {
            await db.commande.update(
              {
                contenu: data,
              },
              {
                where: {
                  id: id,
                },
                transaction: t,
              }
            );

            await db.product.update(
              {
                quantityBruteCVA: val.product.quantityBruteCVA,
              },
              {
                transaction: t,
                where: { id: ex.id },
              }
            );
          }

          if (val.etat == "minus-qtt") {
            let data = this.updateObjectValue(
              modific,
              index,
              "quantityBruteCVA",
              val.initialCommande.quantityBruteCVA
            );
            await db.product.update(
              {
                quantityBruteCVA: val.product.quantityBruteCVA,
              },
              {
                transaction: t,
                where: { id: ex.id },
              }
            );
            await db.commande.update(
              {
                contenu: data,
              },
              {
                where: {
                  id: id,
                },
                transaction: t,
              }
            );
          } */
        }
      }
    })
    .then(function (result) {
      res.send({
        message: "Modification avec success",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });

  /*await sequelize
    .transaction(async (t) => {
      if (exist.length > 0) {
        for (const ex of exist) {
          await db.product.update(ex, {
            transaction: t,
            where: { id: ex.id },
          });
        }
      }
      if (added.length > 0)
      {
        for (const ad of added) {
          let product = await db.product.findByPk(ad.id, { transaction: t });
          await product.decrement(
            {
              quantity_brute_c_v_a: ad.quantityParProduct,
            },
            { transaction: t }
          );
        }
      }
      if (missing.length > 0) {
        for (const m of missing) {
          let product = await db.product.findByPk(m.id, { transaction: t });
          await product.increment(
            {
              quantity_brute_c_v_a: m.quantityParProduct,
            },
            { transaction: t }
          );
        }
      }
       
    })
    .then(function (result) {
      res.send({
        message: "commande mis a jour",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });*/
};
/***
 * await db.commande.update(
  {
    contenu: contenu,
    sorte: sorte,
    type: type,
    status: status,
    vaccinateurId: vaccinateurId,
    emprunterId: emprunterId,
  },
  { transaction: t, where: { id: id } }
);
 */
exports.deleteFromMagasin = async (req, res, next) => {
  const contenu = req.body.contenu;
  await sequelize
    .transaction(async (t) => {
      if (contenu.length > 0) {
        for (const c of contenu) {
          let product = await db.product.findByPk(c.id, { transaction: t });
          await product.increment(
            {
              quantity_brute_c_v_a: c.quantityParProduct,
            },
            { transaction: t }
          );
        }
      }
      await db.commande.destroy({
        transaction: t,
        where: {
          id: req.body.id,
        },
      });
    })
    .then(function (result) {
      res.send({
        message: "Suppresion avec success",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
  //console.log(req);*/
};
exports.addFromDepot = async (req, res, next) => {
  const id = req.body.id;
  const contenu = req.body.contenu;
  const sorte = req.body.sorte;
  const type = req.body.type;
  const emprunterId = req.body.emprunterId;
  const vaccinateurId = req.body.vaccinateurId;
  const status = req.body.status;
  const dateCom = req.body.dateCom;

  await sequelize
    .transaction(async (t) => {
      if (contenu.length > 0) {
        for (const c of contenu) {
          let product = await db.product.findByPk(c.id, { transaction: t });
          await db.product.update(
            {
              quantityParProductDepot: 0,
              qttByCCDepot: 0,
              qttyspecificmirrordepot: 0,
            },
            { transaction: t, where: { id: c.id } }
          );
          await product.decrement(
            {
              quantity_brute: c.quantityParProductDepot,
            },
            { transaction: t }
          );
        }
      }
      await db.commande.create(
        {
          contenu: contenu,
          sorte: sorte,
          type: type,
          status: status,
          vaccinateurId: vaccinateurId,
          emprunterId: emprunterId,
          dateCom: dateCom,
        },
        { transaction: t }
      );
    })
    .then(function (result) {
      res.send({
        message: "Ok!!!",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
};
exports.updateFromDepot = async (req, res, next) => {
  const id = req.body.id;
  const contenu = req.body.contenu;
  const sorte = req.body.sorte;
  const type = req.body.type;
  const status = req.body.status;
  const dateCom = req.body.dateCom;
  const emprunterId = req.body.emprunterId;
  const vaccinateurId = req.body.vaccinateurId;
  const exist = req.body.exist;
  const missing = req.body.missing;
  const added = req.body.added;
  await sequelize
    .transaction(async (t) => {
      let commande = await db.commande.findByPk(id, { transaction: t });

      if (exist.length > 0) {
      
        for (const ex of exist) {
          let initial = commande.contenu.find((p) => p.id == ex.id);
          let index = commande.contenu.findIndex((p) => p.id == ex.id);
  
          await db.product.update(ex, {
            transaction: t,
            where: { id: ex.id },
          });
        }
      }

     
      if (added.length > 0) {
      /**
       *  for (const ad of added) {
          let product = await db.product.findByPk(ad.id, { transaction: t });
          await product.decrement(
            {
              quantity_brute: ad.quantityParProductDepot,
            },
            { transaction: t }
          );
          
        } * 
        */ 
      }
      if (missing.length > 0) {
          /**
           * for (const m of missing) {
          let product = await db.product.findByPk(m.id, { transaction: t });
          await product.increment(
            {
              quantity_brute: m.quantityParProductDepot,
            },
            { transaction: t }
          );
        }* 
        */
      }
      await db.commande.update(
        {
          contenu: contenu,
          sorte: sorte,
          type: type,
          status: status,
          vaccinateurId: vaccinateurId,
          emprunterId: emprunterId,
          dateCom: dateCom,
        },
        { transaction: t, where: { id: id } }
      );
    })
    .then(function (result) {
      res.send({
        message: "commande mis a jour",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
};

exports.deleteFromDepot = async (req, res, next) => {
  const contenu = req.body.contenu;
  await sequelize
    .transaction(async (t) => {
      if (contenu.length > 0) {
        for (const c of contenu) {
          let product = await db.product.findByPk(c.id, { transaction: t });
          await product.increment(
            {
              quantity_brute: c.quantityParProductDepot,
            },
            { transaction: t }
          );
        }
      }
      await db.commande.destroy({
        transaction: t,
        where: {
          id: req.body.id,
        },
      });
    })
    .then(function (result) {
      res.send({
        message: "Suppresion avec success",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
  //console.log(req);*/
};
exports.addToMagasin = async (req, res, next) => {
  const id = req.body.id;
  const contenu = req.body.contenu;
  const sorte = req.body.sorte;
  const type = req.body.type;
  const status = req.body.status;
  const dateCom = req.body.dateCom;
  await sequelize
    .transaction(async (t) => {
      if (contenu.length > 0) {
        for (const c of contenu) {
          let product = await db.product.findByPk(c.id, { transaction: t });
          await db.product.update(
            {
              quantityParProduct: 0,
            },
            { transaction: t, where: { id: c.id } }
          );
          await product.decrement(
            {
              quantity_brute: c.quantityParProduct,
            },
            { transaction: t }
          );
          await product.increment(
            {
              quantity_brute_c_v_a: c.quantityParProduct,
            },
            { transaction: t }
          );
        }
      }
      await db.commande.create(
        {
          contenu: contenu,
          sorte: sorte,
          type: type,
          status: status,
          dateCom: dateCom,
        },
        { transaction: t }
      );
    })
    .then(function (result) {
      res.send({
        message: "Commande reussie",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
};

exports.updateToMagasin = async (req, res, next) => {
  const id = req.body.id;
  const contenu = req.body.contenu;
  const sorte = req.body.sorte;
  const type = req.body.type;
  const status = req.body.status;
  const exist = req.body.exist;
  const missing = req.body.missing;
  const added = req.body.added;
  await sequelize
    .transaction(async (t) => {
      if (exist.length > 0) {
        for (const ex of exist) {
          await db.product.update(ex, {
            transaction: t,
            where: { id: ex.id },
          });
        }
      }
      if (added.length > 0) {
        for (const ad of added) {
          let product = await db.product.findByPk(ad.id, { transaction: t });
          await product.decrement(
            {
              quantity_brute: ad.quantityParProduct,
            },
            { transaction: t }
          );
          await product.increment(
            {
              quantity_brute_c_v_a: ad.quantityParProduct,
            },
            { transaction: t }
          );
        }
      }
      if (missing.length > 0) {
        for (const m of missing) {
          let product = await db.product.findByPk(m.id, { transaction: t });
          await product.increment(
            {
              quantity_brute: m.quantityParProduct,
            },
            { transaction: t }
          );
          await product.decrement(
            {
              quantity_brute_c_v_a: m.quantityParProduct,
            },
            { transaction: t }
          );
        }
      }
      await db.commande.update(
        {
          contenu: contenu,
          sorte: sorte,
          type: type,
          status: status,
        },
        { transaction: t, where: { id: id } }
      );
    })
    .then(function (result) {
      res.send({
        message: "commande mis a jour",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
};

exports.deleteToMagasin = async (req, res, next) => {
  const contenu = req.body.contenu;
  await sequelize
    .transaction(async (t) => {
      if (contenu.length > 0) {
        for (const c of contenu) {
          let product = await db.product.findByPk(c.id, { transaction: t });
          await product.increment(
            {
              quantity_brute: c.quantityParProduct,
            },
            { transaction: t }
          );
          await product.decrement(
            {
              quantity_brute_c_v_a: c.quantityParProduct,
            },
            { transaction: t }
          );
        }
      }
      await db.commande.destroy({
        transaction: t,
        where: {
          id: req.body.id,
        },
      });
    })
    .then(function (result) {
      res.send({
        message: "Suppresion avec success",
      });
    })
    .catch(function (err) {
      console.log("NO!!!");
      return next(err);
    });
  //console.log(req);*/
};
exports.getCredit = async (req, res) => {
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: {
            type: ["vente-depot-credit", "credit-cva"],
            dateCom: {
              [Op.gte]: moment(req.query.deb),
              [Op.lte]: moment(req.query.fin),
            },
          },
          include: ["emprunter"],
        })
      ),
      0,
      10000
    )
  );
};
exports.getCreditVaccinateur = async (req, res) => {
  console.log(req.query.type);
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: {
            type: "vente-depot-vaccinateur",
          },
          include: ["vaccinateur"],
        })
      ),
      0,
      10
    )
  );
};
exports.getCommandeDirect = async (req, res) => {
  console.log(req.query.type);
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: {
            type: "direct",
            //status:1
          },
          include: [],
        })
      ),
      0,
      10
    )
  );
};
exports.setPayerCommande = async (req, res) => {
  const { cId } = req.query;
  await res.respond(
    db.commande.update(
      {
        status: true,
      },
      {
        where: {
          id: cId,
        },
      }
    )
  );
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: {
            type: "credit",
            status: false,
          },
          include: ["vaccinateur", "emprunter"],
        })
      ),
      0,
      10
    )
  );
};
const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;
  let total = 0;
  arr.forEach((el) => {
    total +=
      (Number(el.prixVente) - Number(el.prixFournisseur)) *
      Number(el.quantityParProduct);
  });
  return total;
};
exports.beneficeEntre2Dates = async (req, res) => {
  let total = 0;
  var whereStatement = {};
  whereStatement.status = true;
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  if (req.query.pid) whereStatement.pid = req.query.pid;
  // eslint-disable-next-line no-undef
  const { rows, count } = (products = await res.respond(
    db.commande.findAndCountAll({
      where: whereStatement,
    })
  ));
  rows.forEach((el) => {
    total += calculateTotal(el.contenu);
  });
  res.send(
    // eslint-disable-next-line no-undef
    getPagingData(products, 0, 10, total)
  );
};

exports.resteApayerEntre2Dates = async (req, res) => {
  let total = 0;
  var whereStatement = {};
  whereStatement.status = false;
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  const { rows, count } = await res.respond(
    db.commande.findAndCountAll({
      where: whereStatement,
    })
  );
  rows.forEach((el) => {
    total += calculateTotal(el.contenu);
  });
  res.send(
    getPagingData({
      rows: [
        {
          total: total,
          count: 0,
        },
      ],
    }),
    0,
    10
  );
};

exports.getEntreeProduit = async (req, res) => {
  var whereStatement = {};
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  whereStatement.sorte = "entree";
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: whereStatement,
          include: [],
        })
      ),
      0,
      1000
    )
  );
};

exports.getSortieProduit = async (req, res) => {
  var whereStatement = {};
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  whereStatement.sorte = "sortie";
  whereStatement.type = "vente-depot";
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: whereStatement,
          include: [],
        })
      ),
      0,
      1000
    )
  );
};

exports.getCommandeCVa = async (req, res) => {
  var whereStatement = {};
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  whereStatement.sorte = "sortie";
  whereStatement.type = "vente-cva";
  whereStatement.status = true;
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: whereStatement,
          include: ["emprunter", "vaccinateur"],
        })
      ),
      0,
      10000
    )
  );
};

exports.getCVa = async (req, res) => {
  var whereStatement = {};
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  whereStatement.sorte = "sortie";
  whereStatement.type = "cva";
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: whereStatement,
          include: ["emprunter", "vaccinateur"],
        })
      ),
      0,
      10000
    )
  );
};

exports.getCommande = async (req, res) => {
  var whereStatement = {};
  whereStatement.type = ["vente-cva", "credit-cva"];
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: whereStatement,
        })
      ),
      0,
      10000
    )
  );
};

exports.getCommandetdb = async (req, res) => {
  var whereStatement = {};

  if (req.query.type == "vente-cva") {
    whereStatement.type = [req.query.type, "credit-cva"];
  } else {
    whereStatement.type = req.query.type;
  }
  if (req.query.deb && req.query.fin) {
    whereStatement.dateCom = {
      [Op.gte]: moment(req.query.deb),
      [Op.lte]: moment(req.query.fin),
    };
  }
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: whereStatement,
        })
      ),
      0,
      10000
    )
  );
};

exports.getCommandeToDay = async (req, res) => {
  var whereStatement = {};
  whereStatement.dateCom = moment(new Date());
  res.send(
    getPagingData(
      await res.respond(
        db.commande.findAndCountAll({
          where: whereStatement,
          include: ["emprunter", "vaccinateur"],
        })
      ),
      0,
      10000
    )
  );
};
