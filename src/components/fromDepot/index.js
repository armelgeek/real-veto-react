import React from "react";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../@adminlte/adminlte/Content/Page";
import Content from "../../@adminlte/adminlte/Content";
import Products from "./product";
const BonDepot = () => {
  return (
    <Content>
      <ContentHeader title="Bon de sortie du dépot">
        <ActiveLink title="Bon de sortie du dépot"></ActiveLink>
      </ContentHeader>

      <Page>
        <div>
          <button disabled={true} className="btn btn-green btn-xs ml-3 mb-2">
            Ajouter
          </button>{" "}
          : <span>Le produit n'a pas de stock disponible</span>
          <button className="btn btn-green btn-xs ml-3 mb-2">
            Mettre à jour
          </button>{" "}
          : <span>Mettre à jour la liste des produits</span>
        </div>
        <select disabled={true} className="  ml-3 bg-white py-2 input-xs">
          <option>Comptant</option>
        </select>{" "}
        : <span>Choix du mode sortie ( Comptant,credit,vaccinateur)</span>
        <Products />
      </Page>
    </Content>
  );
};

export default BonDepot;
