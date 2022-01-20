import React from "react";
import { MdDashboard, MdSettings } from "react-icons/md";
import { BiCategory, BiCircle, BiListUl } from "react-icons/bi";
import {
  NavItem,
  CollapseMenuItem,
} from "../../utils/admin/Navigation/NavItem";
import {
  CREATEPRODUCT,
  ENTREE,
  PERIME,
  PRODUCTS,
  RUPTURE,
  SORTIE,
  CREDIT,
  CREDITVACCINATEUR,
  PRODUCTBYCATEGORY,
  PRODUCTBYFOURNISSEUR,
  DIRECT,
  BONDESORTIE,
  PARAMETRES,
  NOUVELLEFACTURE,
  LISTAPPROV,
  DEPOTOMAGASIN,
  ADMIN,
  HISTORIQUESORTIECVA,
  ETATSTOCKMAGASIN,
  HISTORIQUEVENTEVENDEURVUEPARADMIN,
} from "../../constants/routes";
function SideBarMenu() {
  return (
    <>
      <NavItem icon={MdDashboard} to={"/"}>
        Journal de sortie
      </NavItem>
      <CollapseMenuItem
        ckey={1}
        title="Approvisionnement"
        icon={BiCategory}
        links={[
          {
            title: "Nouvelle facture",
            path: NOUVELLEFACTURE,
          },
          {
            title: "Historique d'approvisionnement",
            path: LISTAPPROV,
          },
          
        ]}
      />
      <CollapseMenuItem
        ckey={2}
        title="Produits"
        icon={BiListUl}
        links={[
          {
            title: "Tous les produits",
            path: PRODUCTS,
          },
          {
            title: "Ajouter un produit",
            path: CREATEPRODUCT,
          },
          {
            title: "Produit par categorie",
            path: PRODUCTBYCATEGORY,
          },
          {
            title: "Produit par fournisseur",
            path: PRODUCTBYFOURNISSEUR,
          }
          
        ]}
      />
      <CollapseMenuItem
        ckey={3}
        title="Dépot"
        icon={BiListUl}
        links={[
          {
            title: "Historique de sortie",
            path: SORTIE,
          },
          {
            title: "Credit",
            path: CREDIT,
          },
          {
            title: "Vaccinateur",
            path: CREDITVACCINATEUR,
          },
          {
            title: "Bon de sortie",
            path: BONDESORTIE,
          }
          
        ]}
      />
      <CollapseMenuItem
        ckey={4}
        title="Magasin"
        icon={BiListUl}
        links={[
          {
            title: "Depot vers Magasin",
            path: ADMIN,
          },
          {
            title: "Historique de sortie Dépôt vers Magasin",
            path: HISTORIQUESORTIECVA,
          },
          {
            title: "Etat de stock magasin",
            path: ETATSTOCKMAGASIN,
          },
          {
            title: "Historique de vente du magasin",
            path: HISTORIQUEVENTEVENDEURVUEPARADMIN,
          }
          
        ]}
      />
      <CollapseMenuItem
        ckey={4}
        title="Etat des articles"
        icon={BiListUl}
        links={[
          {
            title: "Article perimés",
            path: PERIME,
          },
          {
            title: "Articles en rupture de stock",
            path: RUPTURE,
          }
        ]}
      />
      <NavItem icon={MdSettings} to={PARAMETRES}>
      Parametres
      </NavItem>

    </>
  );
}

export default SideBarMenu;
