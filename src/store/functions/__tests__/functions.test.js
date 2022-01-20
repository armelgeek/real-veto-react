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
  handleMinusProduct
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
import { hasCondValAndHasNoCCStockProduct } from '../mocks/products/phyto/mock-has-cond-val-and-has-no-cc-stock-product';
import { hasNoCondValAndHasAnyCCStockProduct } from '../mocks/products/phyto/mock-has-no-cond-val-and-has-any-cc-stock-product';
import { hasAnyProduct } from '../mocks/products/simple/mock-has-any-product';
describe("Buy system", () => {
  it.skip("can buy cc from cva", () => {
    expect(canBuyCCFromCva(productData)).toBeTruthy();
  });
  it.skip("can't buy cc from cva", () => {
    productData.quantityCCCVA -= 100;
    expect(canBuyCCFromCva(productData)).toBeFalsy();
  });
  it.skip("can buy brute from cva", () => {
    expect(canBuyBruteFromCva(productData)).toBeTruthy();
  });
  it.skip("can't buy brute from cva", () => {
    productData.quantityBruteCVA -= 100;
    expect(canBuyBruteFromCva(productData)).toBeFalsy();
  });
  it.skip("Minus quantity brute cva when quantity cc is enough", () => {
    let received = minusQuantityBruteCvaWhenQttCcIsEmpty(productData);
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
      doseRestantEnMg: null,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 99,
      quantityCCCVA: 100,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: null,
      condml: null,
      condval: null,
      qttccpvente: null,
      prixqttccvente: null,
    });
  });
 
  it.skip("don't minus quantity brute cva,when has enough stock of quantityBruteCVA", () => {
    let received = minusQuantityBruteCvaWhenQttCcIsEmpty(productData);
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
      doseRestantEnMg: null,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 100,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: null,
      condml: null,
      condval: null,
      qttccpvente: null,
      prixqttccvente: null,
    });
  });
  it.skip("Minus quantity cc cva", () => {
    let received = minusQuantityCc(productData, 1);
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
      doseRestantEnMg: null,
      qttByCC: 0,
      quantityBrute: 150,
      quantityBruteCVA: 0,
      quantityCCCVA: 99,
      quantityParProduct: 1,
      prixParCC: 300,
      quantityCC: null,
      condml: null,
      condval: null,
      qttccpvente: null,
      prixqttccvente: null,
    });
  });
  describe("Handle sold by cc ", () => {
    it.skip("si la quantite brute restant ne plus suffisante mais que le reste en cc  est encore suffisante,du cout on enleve juste  la quantité cc souhaité", () => {
      expect(
        handleSoldQuantityCC(hasNoBruteStockButHasAnyCcStockProduct, 2)
      ).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 2,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 98,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: null,
        condval: null,
        qttccpvente: null,
        prixqttccvente: null,
      });
    });
    it.skip("si la quantite brute restant ne plus suffisante mais que le reste en cc  est ne pas   suffisante,du cout on ne fait rien", () => {
      expect(
        handleSoldQuantityCC(hasNoBruteStockButHasNoCcStockProduct, 2)
      ).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 2,
        quantityBrute: 150,
        quantityBruteCVA: 0,
        quantityCCCVA: 0,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: null,
        condval: null,
        qttccpvente: null,
        prixqttccvente: null,
      });
    });
    it.skip("si la quantite brute restant est  suffisante mais que le reste en cc  est ne plus suffisante,du cout on enleve une boite et on reinitalise la quantité du cc cva en enlevant la quantité de commande au dose default", () => {
      expect(
        handleSoldQuantityCC(hasAnyBruteStockButHasNoCcStockProduct, 30)
      ).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 30,
        quantityBrute: 150,
        quantityBruteCVA: 99,
        quantityCCCVA: 70,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: null,
        condval: null,
        qttccpvente: null,
        prixqttccvente: null,
      });
    });

    it.skip("si la quantite brute restant est  suffisante mais que le reste en cc  est contient un peut de  cc mais pas suffisant pour la commande actuel,du cout on enleve une boite et on reinitalise la quantité du cc cva en enlevant la reste de commande au dose default", () => {
      expect(
        handleSoldQuantityCC(hasAnyBruteStockButHasSomeOfCcStockProduct, 12)
      ).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 99,
        quantityCCCVA: 98,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: null,
        condval: null,
        qttccpvente: null,
        prixqttccvente: null,
      });
    });
    it.skip("si la quantite brute restante est  suffisante et que le reste en cc  est suffisante pour la commande actuel,du cout on enleve juste le quantite commander de  la reste de la quantite cc en stock", () => {
      expect(
        handleSoldQuantityCC(hasAnyBruteStockButHasNAnyCcStockProduct, 2)
      ).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 2,
        quantityBrute: 150,
        quantityBruteCVA: 100,
        quantityCCCVA: 98,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: null,
        condval: null,
        qttccpvente: null,
        prixqttccvente: null,
      });
    });

    it.skip("doit retourner vrai si c'est un produit avecc conditionnement specifique", () => {
      expect(isSpecialProductHandle(phytoSpecificProduct)).toBeTruthy();
    });
    it.skip("doit retourner faux si c'est un produit avec n'a pas de  conditionnement specifique", () => {
      expect(isSpecialProductHandle(hasAnyBruteStockButHasNAnyCcStockProduct)).toBeFalsy();
    });
    it.skip("doit tester si je peux acheter du cc phyto",()=>{
      expect(isBiggerThanLastCondML(phytoSpecificProduct)).toBeFalsy();
    })
    it.skip("doit permettre de gerer la vente par conditionnement pour les produits phyto",()=>{
      expect(handlePhtyoSpecific(hasCondValAndHasAnyCCStockProduct,4)).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 4,
        quantityBrute: 150,
        quantityBruteCVA: 100,
        quantityCCCVA: 246,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: 250,
        condval: 3,
        qttccpvente: 4,
        prixqttccvente: 1500
      })
    });

    it.skip("doit permettre de retirer un cond val si il n'y a plus de cc en stock",()=>{
      expect(handlePhtyoSpecific(hasCondValAndHasNoCCStockProduct,12)).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 100,
        quantityCCCVA: 242,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: 250,
        condval: 2,
        qttccpvente: 4,
        prixqttccvente: 1500
      })
    })
    it.skip("recuperer le reste d'une commande",()=>{
      expect(getRestQuantityCCWhenOrderIsBiggerThanLastQuantityCC(hasCondValAndHasNoCCStockProduct)).toBe(230)
    })
    it.skip("Ne pas retirer un cond val si la quantite de cond val est inferieur à 0,la quantité cc restant est encore suffisant",()=>{
      expect(handlePhtyoSpecific(hasNoCondValAndHasAnyCCStockProduct,12)).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 12,
        quantityBrute: 150,
        quantityBruteCVA: 99,
        quantityCCCVA: 242,
        quantityParProduct: 1,
        prixParCC: 300,
        quantityCC: null,
        condml: 250,
        condval: 3,
        qttccpvente: 4,
        prixqttccvente: 1500
      })
    });
    it.skip('handle commande product',()=>{
      expect(handleMinusProduct(hasAnyProduct,3)).toStrictEqual({
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
        doseRestantEnMg: null,
        qttByCC: 0,
        quantityBrute: 150,
        quantityBruteCVA: 7,
        quantityCCCVA: 100,
        quantityParProduct: 3,
        prixParCC: 300,
        quantityCC: null,
        condml: null,
        condval: null,
        qttccpvente: null,
        prixqttccvente: null
      })
    })
  });
});
