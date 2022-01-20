import React from "react";
import { useDispatch } from "react-redux";
import FromMagasinItemControl from "./FromMagasinItemControl";
import FromMagasinItemPartial from "./FromMagasinItemPartial";
import { displayMoney,checkHasExistText } from "../../../../utils/functions";
import { ItaNewInputDose } from "./ItaNewInputDose";
import { PhytoConditionnementInput } from "./PhytoConditionnementInput";
import { SovaxInputDose } from "./SovaxInputDose";
const FromMagasinItem = ({ product }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center border   mb-2 p-2">
        <div style={{ width: "45%" }}>
          <p className="text-blue">{product.name}</p>
          <span className="text-lowercase">
            <strong>
              {product.quantityParProduct != 0 &&
                displayMoney(product.prixVente)}
              {product.quantityParProduct == 0 && product.prixParCC != 0 && (
                <>
                  {product.prixqttccvente != null && product.prixqttccvente != 0
                    ? displayMoney(product.prixqttccvente)
                    : displayMoney(product.prixParCC)}
                </>
              )}
              {product.quantityParProduct != 0 &&
                " x " + product.quantityParProduct + " " + product.type}{" "}
              {product.prixqttccvente == null &&
                product.prixqttccvente == 0 && (
                  <>
                    {product.qttByCC != 0 &&
                      (product.quantityParProduct == 0 ? " x " : "+") +
                        product.qttByCC +
                        "ML"}
                  </>
                )}
            </strong>
          </span>
        </div>
        <div className="text-inline text-center">
          <h5 className="mb-1">{product.type}</h5>
          <FromMagasinItemControl product={product} />
        </div>
        {product.type === "FLACON" && (
          <div className="text-inline text-center">
            <h5 className="mb-1">{product.categoryId == 3 ? "DOSE" : "ML"}</h5>
            {checkHasExistText(product.name, "ita new") && (
              <ItaNewInputDose product={product} />
            )}
            {checkHasExistText(product.name, "sovax") && (
              <SovaxInputDose product={product} />
            )}
            {!checkHasExistText(product.name, "ita new") &&
              !checkHasExistText(product.name, "sovax") &&
              !checkHasExistText(product.name, "tikaz") &&
              !checkHasExistText(product.name, "despadac") && (
                <FromMagasinItemPartial product={product} />
              )}
            {checkHasExistText(product.name, "tikaz") ||
              (checkHasExistText(product.name, "despadac") && (
                <PhytoConditionnementInput product={product} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FromMagasinItem;
