import {
  minusQuantityCc,
  canBuyCCFromCva,
  canBuyBruteFromCva,
  minusQuantityBruteCvaWhenQttCcIsEmpty,
  handleSoldQuantityCC,
  isSpecialProductHandle,
  isBiggerThanLastCondML,
  handlePhtyoSpecific,
  getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC,
  handleMinusProduct,
  isBiggerThanLastQuantityCC,
  isLowerThanLastQuantityCC,
  isSameOfLastQuantityCC,
  cantBuyCCFromCva,
  cantBuyBruteFromCva,
  handleMinusCondML,
  handleSoldProduct,
  canBuy,
} from "../function";
import { hasAnyBruteStockButHasNoCcStockProduct } from "../mocks/products/mock-has-any-brute-stock-but-has-no-cc-stock-product";
import { hasAnyBruteStockButHasSomeOfCcStockProduct } from "../mocks/products/mock-has-any-brute-stock-but-has-some-of-cc-stock-product";
import { hasAnyProductData } from "../mocks/products/mock-has-any-product";
import { hasNoBruteStockButHasAnyCcStockProduct } from "../mocks/products/mock-has-no-brute-stock-but-has-any-cc-stock-product";
import { hasNoBruteStockButHasNoCcStockProduct } from "../mocks/products/mock-has-no-brute-stock-but-has-no-cc-stock-product";
import { productData } from "../mocks/products/mock-initial-product";
import { hasAnyBruteStockButHasNAnyCcStockProduct } from "../mocks/products/mock-has-any-brute-stock-but-has-any-cc-stock-product";
import { phytoSpecificProduct } from "../mocks/products/mock-phyto-specif-product";
import { hasCondValAndHasAnyCCStockProduct } from "../mocks/products/phyto/mock-has-cond-val-and-has-any-cc-stock-product";
import { hasCondValAndHasNoCCStockProduct } from "../mocks/products/phyto/mock-has-cond-val-and-has-no-cc-stock-product";
import { hasNoCondValAndHasAnyCCStockProduct } from "../mocks/products/phyto/mock-has-no-cond-val-and-has-any-cc-stock-product";
import { hasAnyProduct } from "../mocks/products/simple/mock-has-any-product";
import { productDataCantBy } from "../mocks/products/mock-initial-product-cant-buy";
import { productDataMinus1 } from "../mocks/products/mock-initial-product-minus-1";
import { productDataMinus2 } from "../mocks/products/mock-initial-product-minus-2";
import { productDataMissingQttProduct } from "../mocks/products/mock-initial-product-missing-qtt-brute";
import { hasNoCondValAndHasNoCCStockProduct } from "../mocks/products/phyto/mock-has-no-cond-val-and-has-no-cc-stock-product";
import { hasNoCondValAndHasNoCCStockProductNoBrute } from "../mocks/products/phyto/mock-has-no-cond-val-and-has-no-cc-stock-product-no-brute";
import { hasNoCondValAndHasCCStockProductNoBrute } from "../mocks/products/phyto/mock-has-no-cond-val-and-has-cc-stock-product-no-brute";
import { hasOneCondValAndHas4CCStockProduct1Brute } from "../mocks/products/phyto/mock-has-one-cond-val-and-has-4-cc-stock-product-has-brute";
import { productDataNoBrute } from "../mocks/products/mock-initial-product-no-brute";
import { productDataNoBruteCC } from "../mocks/products/mock-initial-product-has-brute-and-cc";
import { productDataNoBruteCCMultiple } from "../mocks/products/mock-initial-product-has-mutiple-brute-and-cc";
import { hasOneCondValAndHas4CCStockProduct1Brute1 } from "../mocks/products/phyto/mock-has-one-cond-val-and-has-4-cc-stock-product-has-brute 1";
import { hasOneCondValAndHas4CCStockProduct1BruteIs1 } from "../mocks/products/phyto/mock-has-one-cond-val-and-has-4-cc-stock-product-has-brute-is-1";
import { hasOneCondValAndHas0CCStockProduct1BruteIs1 } from "../mocks/products/phyto/mock-has-one-cond-val-and-has-0-cc-stock-product-has-brute-is-one";
import { describe } from "jest-circus";
import { mockDataError1, mockDataError2, mockDataError3, mockDataError4 } from "../mocks/products/mock-data-error";
import { CanBuy1 } from '../mocks/products/can-by';
function copy(object) {
  var output, value, key;
  output = Array.isArray(object) ? [] : {};
  for (key in object) {
    value = object[key];
    output[key] = typeof value === "object" ? copy(value) : value;
  }
  return output;
}
describe("Buy system", () => {
  it("can buy cc from cva", () => {
    expect(canBuyCCFromCva(productData)).toBeTruthy();
  });
  it("can't buy cc from cva", () => {
    expect(cantBuyCCFromCva(productDataCantBy)).toBeTruthy();
  });
  it("can buy brute from cva", () => {
    expect(canBuyBruteFromCva(productData)).toBeTruthy();
  });
  it("can't buy brute from cva", () => {
    let productBuy = copy(productData);
    productBuy.quantityBruteCVA -= 11;
    expect(cantBuyBruteFromCva(productBuy)).toBeTruthy();
  });
  it("Minus quantity brute cva when quantity cc is enough", () => {
    let productBuy = copy(productData);
    productBuy.quantityCCCVA -= 1;
    let received = minusQuantityBruteCvaWhenQttCcIsEmpty(productBuy);

    expect(productBuy).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 9,
      quantityCCCVA: 99,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("don't minus quantity brute cva,when has enough stock of quantityBruteCVA", () => {
    let productBuy = copy(productDataNoBrute);
    productBuy.qttByCC = 10;
    let received = minusQuantityBruteCvaWhenQttCcIsEmpty(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 10,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  it("is qttByCC is bigger than quantityCCCVA", () => {
    let productBuy = copy(productData);
    productBuy.qttByCC = 20;
    expect(isBiggerThanLastQuantityCC(productBuy)).toBeTruthy();
  });
  it("is qttByCC is same of  quantityCCCVA", () => {
    let productBuy = copy(productData);
    productBuy.qttByCC = 20;
    productBuy.quantityCCCVA = 20;
    expect(isSameOfLastQuantityCC(productBuy)).toBeTruthy();
  });
  it("is qttByCC is lower than  quantityCCCVA", () => {
    let productBuy = copy(productData);
    productBuy.qttByCC = 10;
    productBuy.quantityCCCVA = 30;
    expect(isLowerThanLastQuantityCC(productBuy)).toBeTruthy();
  });
  it("Minus quantity cc cva if is qttByCC is bigger than quantityCCCVA", () => {
    let productBuy = copy(productData);
    //productBuy.quantityBruteCVA -=10;
    productBuy.qttByCC = 13;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 13,
      quantityBrute: 150,
      quantityBruteCVA: 9,
      quantityCCCVA: 87,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("Minus quantity cc cva if is qttByCC is equals than quantityCCCVA", () => {
    let productBuy = copy(productDataMinus1);
    //productBuy.quantityBruteCVA -=10;
    productBuy.qttByCC = 13;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 13,
      quantityBrute: 150,
      quantityBruteCVA: 10,
      quantityCCCVA: 0,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("Minus quantity cc cva if is qttByCC is lower than quantityCCCVA", () => {
    let productBuy = copy(productDataMinus2);
    productBuy.qttByCC = 13;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 13,
      quantityBrute: 150,
      quantityBruteCVA: 10,
      quantityCCCVA: 2,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("can't buy because quantity product in cva is empty ", () => {
    let productBuy = copy(productDataMissingQttProduct);
    //productBuy.quantityBruteCVA -=10;
    productBuy.qttByCC = 13;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 13,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("handle commande product", () => {
    let productBuy = copy(hasAnyProduct);
    productBuy.quantityParProduct = 3;
    expect(handleMinusProduct(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 7,
      quantityCCCVA: 100,
      quantityParProduct: 3,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  describe("Handle sold by cc ", () => {
    let productBuy = copy(hasNoBruteStockButHasAnyCcStockProduct);
    productBuy.qttByCC = 2;
    it("si la quantite brute restant ne plus suffisante mais que le reste en cc  est encore suffisante,du cout on enleve juste  la quantité cc souhaité", () => {
      expect(handleSoldQuantityCC(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "CLOSANTEL 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 100,
        doseRestantEnMg: 0,
        qttByCC: 2,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 98,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 0,
        condval: 0,
        qttccpvente: 0,
        prixqttccvente: 0,
      });
    });
    it("si la quantite brute restant ne plus suffisante mais que le reste en cc  est ne pas   suffisante,du cout on ne fait rien", () => {
      let productBuy = copy(hasNoBruteStockButHasNoCcStockProduct);
      productBuy.qttByCC = 2;
      expect(handleSoldQuantityCC(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "CLOSANTEL 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 100,
        doseRestantEnMg: 0,
        qttByCC: 2,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 0,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 0,
        condval: 0,
        qttccpvente: 0,
        prixqttccvente: 0,
      });
    });
    it("si la quantite brute restant est  suffisante mais que le reste en cc  est ne plus suffisante,du cout on enleve une boite et on reinitalise la quantité du cc cva en enlevant la quantité de commande au dose default", () => {
      let productBuy = copy(hasAnyBruteStockButHasNoCcStockProduct);
      productBuy.qttByCC = 30;
      expect(handleSoldQuantityCC(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "CLOSANTEL 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 100,
        doseRestantEnMg: 0,
        qttByCC: 30,
        quantityBrute: 150,
        quantityBruteCVA: 99,
        quantityCCCVA: 70,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 0,
        condval: 0,
        qttccpvente: 0,
        prixqttccvente: 0,
      });
    });

    it("si la quantite brute restant est  suffisante mais que le reste en cc  est contient un peut de  cc mais pas suffisant pour la commande actuel,du cout on enleve une boite et on reinitalise la quantité du cc cva en enlevant la reste de commande au dose default", () => {
      let productBuy = copy(hasAnyBruteStockButHasSomeOfCcStockProduct);
      productBuy.qttByCC = 12;
      expect(handleSoldQuantityCC(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "CLOSANTEL 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 100,
        doseRestantEnMg: 0,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 99,
        quantityCCCVA: 98,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 0,
        condval: 0,
        qttccpvente: 0,
        prixqttccvente: 0,
      });
    });

    it("si la quantite brute restante est  suffisante et que le reste en cc  est suffisante pour la commande actuel,du cout on enleve juste le quantite commander de  la reste de la quantite cc en stock", () => {
      let productBuy = copy(hasAnyBruteStockButHasNAnyCcStockProduct);
      productBuy.qttByCC = 2;
      expect(handleSoldQuantityCC(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "CLOSANTEL 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 100,
        doseRestantEnMg: 0,
        qttByCC: 2,
        quantityBrute: 150,
        quantityBruteCVA: 100,
        quantityCCCVA: 98,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 0,
        condval: 0,
        qttccpvente: 0,
        prixqttccvente: 0,
      });
    });

    it("doit retourner vrai si c'est un produit avecc conditionnement specifique", () => {
      expect(isSpecialProductHandle(phytoSpecificProduct)).toBeTruthy();
    });
    it("doit retourner faux si c'est un produit avec n'a pas de  conditionnement specifique", () => {
      expect(
        isSpecialProductHandle(hasAnyBruteStockButHasNAnyCcStockProduct)
      ).toBeFalsy();
    });
    it("doit tester si je peux acheter du cc phyto", () => {
      expect(isBiggerThanLastCondML(phytoSpecificProduct)).toBeFalsy();
    });
    it("doit permettre de gerer la vente par conditionnement pour les produits phyto", () => {
      let productBuy = copy(hasCondValAndHasAnyCCStockProduct);
      productBuy.qttByCC = 4;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 4,
        quantityBrute: 150,
        quantityBruteCVA: 100,
        quantityCCCVA: 246,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 3,
        qttccpvente: 4,
        condsize: 4,
        prixqttccvente: 1500,
      });
    });

    it("doit permettre de retirer un cond val si il n'y a plus de cc en stock", () => {
      let productBuy = copy(hasCondValAndHasNoCCStockProduct);
      productBuy.qttByCC = 12;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 100,
        quantityCCCVA: 242,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 2,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });
    it("recuperer le reste d'une commande if bigger than quantityCCVA", () => {
      let productBuy = copy(hasCondValAndHasNoCCStockProduct);
      productBuy.qttByCC = 12;
      expect(
        getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(productBuy)
      ).toBe(8);
    });
    it("recuperer le reste d'une commande  if lower than quantityCCVA", () => {
      let productBuy = copy(hasCondValAndHasNoCCStockProduct);
      productBuy.qttByCC = 3;
      expect(
        getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(productBuy)
      ).toBe(1);
    });
    it("si la quantite de cond val est egale à 0,la quantité cc restant est encore suffisant et la quantité brute cva suffisante ", () => {
      let productBuy = copy(hasNoCondValAndHasAnyCCStockProduct);
      productBuy.qttByCC = 12;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 99,
        quantityCCCVA: 242,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 3,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });
    it("si la quantite de cond val est egale à 0,la quantité cc restant est 0 et la quantité brute cva suffisante ", () => {
      let productBuy = copy(hasNoCondValAndHasNoCCStockProduct);
      productBuy.qttByCC = 12;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 99,
        quantityCCCVA: 238,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 3,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });

    it("si la quantite de cond val est 0,la quantité cc restant est 0 suffisant et la quantité brute cva est 0 ", () => {
      let productBuy = copy(hasNoCondValAndHasNoCCStockProductNoBrute);
      productBuy.qttByCC = 12;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 0,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 0,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });

    it("si la quantite de cond val est 0,has cc  is bigger et la quantité brute cva est 0 ", () => {
      let productBuy = copy(hasNoCondValAndHasCCStockProductNoBrute);
      productBuy.qttByCC = 12;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 0,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 0,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });

    it("si la quantite de cond val est 0,has cc is lower et la quantité brute cva est 0 ", () => {
      let productBuy = copy(hasNoCondValAndHasCCStockProductNoBrute);
      productBuy.qttByCC = 9;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 9,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 2,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 0,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });

    it("si la quantite de cond val est 0,has cc is same et la quantité brute cva est 0 ", () => {
      let productBuy = copy(hasNoCondValAndHasCCStockProductNoBrute);
      productBuy.qttByCC = 11;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 11,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 0,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 0,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });

    it("si la quantite de cond val est egale à 1,la quantité cc est 4 et la quantité brute cva est 1", () => {
      let productBuy = copy(hasOneCondValAndHas4CCStockProduct1Brute);
      productBuy.qttByCC = 20;
      expect(handlePhtyoSpecific(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 20,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 234,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 3,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });

    it("si la quantite de cond val est egale à 0,la quantité cc est 4 et la quantité brute cva est 1", () => {
      let productBuy = copy(hasOneCondValAndHas4CCStockProduct1BruteIs1);
      productBuy.qttByCC = 20;
      expect(handleMinusCondML(productBuy)).toStrictEqual({
        datePer: "2021-11-30",
        createdAt: "2021-11-26",
        id: 1,
        name: "Tikaz 5% 100ML",
        prixVente: 6000,
        prixFournisseur: 5700,
        prixVaccinateur: 5800,
        type: "FLACON",
        uniteMesure: "ml",
        doseDefault: 1000,
        doseRestantEnMg: 0,
        qttByCC: 20,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 234,
        quantityParProduct: 0,
        prixParCC: 300,
        quantityCC: 0,
        condml: 250,
        condval: 3,
        condsize: 4,
        qttccpvente: 4,
        prixqttccvente: 1500,
      });
    });
  });

  it("si la quantite de cond val est egale à 0,la quantité cc est 0 et la quantité brute cva est 1", () => {
    let productBuy = copy(hasOneCondValAndHas0CCStockProduct1BruteIs1);
    productBuy.qttByCC = 20;
    expect(handleMinusCondML(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "Tikaz 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 1000,
      doseRestantEnMg: 0,
      qttByCC: 20,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 230,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 250,
      condval: 3,
      condsize: 4,
      qttccpvente: 4,
      prixqttccvente: 1500,
    });
  });
});
describe("handle minus cond val", () => {
  it("si la quantite de cond val est egale à 1,la quantité cc est 4 et la quantité brute cva est 1", () => {
    let productBuy = copy(hasOneCondValAndHas4CCStockProduct1Brute);
    productBuy.quantityParProduct = 1;
    expect(handleMinusCondML(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "Tikaz 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 1000,
      doseRestantEnMg: 0,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 1,
      quantityCCCVA: 4,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 250,
      condval: 0,
      condsize: 4,
      qttccpvente: 4,
      prixqttccvente: 1500,
    });
  });
  it("si la quantite de cond val est egale à 2,la quantité cc est 4 et la quantité brute cva est 1", () => {
    let productBuy = copy(hasOneCondValAndHas4CCStockProduct1Brute);
    productBuy.quantityParProduct = 2;
    expect(handleMinusCondML(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "Tikaz 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 1000,
      doseRestantEnMg: 0,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 4,
      quantityParProduct: 2,
      prixParCC: 300,
      quantityCC: 0,
      condml: 250,
      condval: 3,
      condsize: 4,
      qttccpvente: 4,
      prixqttccvente: 1500,
    });
  });

  it("si la quantite de cond val est egale à 2,la quantité cc est 4 et la quantité brute cva est 1", () => {
    let productBuy = copy(hasOneCondValAndHas4CCStockProduct1Brute);
    productBuy.quantityParProduct = 2;
    expect(handleMinusCondML(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "Tikaz 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 1000,
      doseRestantEnMg: 0,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 4,
      quantityParProduct: 2,
      prixParCC: 300,
      quantityCC: 0,
      condml: 250,
      condval: 3,
      condsize: 4,
      qttccpvente: 4,
      prixqttccvente: 1500,
    });
  });

  it("si la quantite de cond val est egale à 1 with quantityParProduct,la quantité cc est 4 et la quantité brute cva est 1", () => {
    let productBuy = copy(hasOneCondValAndHas4CCStockProduct1Brute);
    productBuy.quantityParProduct = 1;
    productBuy.qttByCC = 1;
    expect(handleMinusCondML(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "Tikaz 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 1000,
      doseRestantEnMg: 0,
      qttByCC: 1,
      quantityBrute: 150,
      quantityBruteCVA: 1,
      quantityCCCVA: 3,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 250,
      condval: 0,
      condsize: 4,
      qttccpvente: 4,
      prixqttccvente: 1500,
    });
  });

  it("si la quantite de cond val est egale à 1 with more quantityParProduct,la quantité cc est 4 et la quantité brute cva est 1", () => {
    let productBuy = copy(hasOneCondValAndHas4CCStockProduct1Brute);
    productBuy.quantityParProduct = 1;
    productBuy.qttByCC = 11;
    expect(handleMinusCondML(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "Tikaz 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 1000,
      doseRestantEnMg: 0,
      qttByCC: 11,
      quantityBrute: 150,
      quantityBruteCVA: 1,
      quantityCCCVA: 4,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 250,
      condval: 1,
      condsize: 4,
      qttccpvente: 4,
      prixqttccvente: 1500,
    });
  });
  it("si la quantite de cond val est egale à 2 with more quantityParProduct,la quantité cc est 4 et la quantité brute cva est 1", () => {
    let productBuy = copy(hasOneCondValAndHas4CCStockProduct1Brute);
    productBuy.quantityParProduct = 2;
    productBuy.qttByCC = 11;
    expect(handleMinusCondML(productBuy)).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "Tikaz 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 1000,
      doseRestantEnMg: 0,
      qttByCC: 11,
      quantityBrute: 150,
      quantityBruteCVA: 1,
      quantityCCCVA: 4,
      quantityParProduct: 2,
      prixParCC: 300,
      quantityCC: 0,
      condml: 250,
      condval: 1,
      condsize: 4,
      qttccpvente: 4,
      prixqttccvente: 1500,
    });
  });
});
describe("avec quantité brute  et cc ", () => {
  it("don't minus quantity brute cva,when has enough stock of quantityBruteCVA and qttByCC", () => {
    let productBuy = copy(productDataNoBrute);
    productBuy.quantityParProduct = 1;
    productBuy.qttByCC = 10;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 10,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  it("has brute and cc minusQuantityCc", () => {
    let productBuy = copy(productDataNoBruteCC);
    productBuy.quantityParProduct = 1;
    productBuy.qttByCC = 80;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 80,
      quantityBrute: 150,
      quantityBruteCVA: 1,
      quantityCCCVA: 20,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  it("has brute and cc minusQuantityCc 2", () => {
    let productBuy = copy(productDataNoBruteCC);
    productBuy.quantityParProduct = 2;
    productBuy.qttByCC = 80;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 80,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 20,
      quantityParProduct: 2,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("has brute and cc minusQuantityCc 3", () => {
    let productBuy = copy(productDataNoBruteCC);
    productBuy.quantityParProduct = 2;
    productBuy.qttByCC = 100;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 100,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 2,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  it("has brute and cc minusQuantityCc 4", () => {
    let productBuy = copy(productDataNoBruteCC);
    productBuy.quantityParProduct = 2;
    productBuy.qttByCC = 120;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 100,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 2,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("has brute and cc minusQuantityCc 5", () => {
    let productBuy = copy(productDataNoBruteCCMultiple);
    productBuy.quantityParProduct = 2;
    productBuy.qttByCC = 10;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 10,
      quantityBrute: 150,
      quantityBruteCVA: 1,
      quantityCCCVA: 70,
      quantityParProduct: 2,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("has brute and cc minusQuantityCc 6", () => {
    let productBuy = copy(productDataNoBruteCCMultiple);
    productBuy.quantityParProduct = 3;
    productBuy.qttByCC = 10;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 10,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 70,
      quantityParProduct: 3,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });

  it("has brute and cc minusQuantityCc 7", () => {
    let productBuy = copy(productDataNoBruteCCMultiple);
    productBuy.quantityParProduct = 4;
    productBuy.qttByCC = 10;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC: 10,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 70,
      quantityParProduct: 3,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
});
describe("test errors", () => {
  it("it should return 0 if has nothing", () => {
    let productBuy = copy(mockDataError1);
    productBuy.qttByCC = 48;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC:48,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 38,
      quantityParProduct: 0,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  it("it should return 0 if has nothing 2", () => {
    let productBuy = copy(mockDataError2);
    productBuy.quantityParProduct = 69;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC:0,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  it("it should return 0 if has nothing 3", () => {
    let productBuy = copy(mockDataError4);
    productBuy.quantityParProduct = 3;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC:0,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
  it("it should return 0 if has nothing 4", () => {
    let productBuy = copy(mockDataError4);
    productBuy.quantityParProduct = 7;
    let received = minusQuantityCc(productBuy);
    expect(received).toStrictEqual({
      datePer: "2021-11-30",
      createdAt: "2021-11-26",
      id: 1,
      name: "CLOSANTEL 5% 100ML",
      prixVente: 6000,
      prixFournisseur: 5700,
      prixVaccinateur: 5800,
      type: "FLACON",
      uniteMesure: "ml",
      doseDefault: 100,
      doseRestantEnMg: 0,
      qttByCC:0,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 0,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: 0,
      condml: 0,
      condval: 0,
      qttccpvente: 0,
      prixqttccvente: 0,
    });
  });
});
describe('can buy', () => {
  it('is can by cc cva',()=>{
    let productBuy = copy(CanBuy1);
    let received = canBuy(productBuy);
    expect(received).toBe(true);
  })
});
