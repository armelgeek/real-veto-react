import { NumberToLetter } from "convertir-nombre-lettre";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { calculateTotal, displayMoney } from "../utils/functions";
import DataTable from "../utils/admin/DataTable";
import { isSpecialProductHandle } from "../store/functions/function";
const wait = async () => new Promise((resolve) => setTimeout(resolve, 1000));

const TabViewStatistic = ({
  activeCategory,
  setActiveCategory,
  commandes,
  children,
}) => {

  const handleTabClick = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="mt-3">
      <div className="tab-header">
        <TabHeader
          commandes={commandes}
          activeTab={activeCategory}
          onTabClick={handleTabClick}
        />
      </div>
    </div>
  );
};

const TabHeader = ({ commandes, activeTab, onTabClick }) => {
  const [current, setCurrent] = useState([]);
  const [title, setTitle] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [total, setTotal] = useState(0);

  const columns = React.useMemo(
    () => [
      {
        Header: "Produit",
        accessor: "name",
      },
      ,
      {
        Header: "Litre",
        accessor: "qttbylitre",
      },
      {
        Header: "Quantité",
        accessor: "quantityParProduct",
      },
      {
        Header: "ML",
        accessor: "qttByCC",
      },

      {
        Header: "Total",
        Cell: (data) => {
          return (
            <p>
              {displayMoney(
                isSpecialProductHandle(data.row.original)
                  ? data.row.original?.prixqttccvente *
                      data.row.original?.quantityParProduct *
                      data.row.original?.qttccpvente +
                      data.row.original?.prixlitre *
                        data.row.original?.qttbylitre
                  : data.row.original?.prixVente *
                      data.row.original?.quantityParProduct +
                      data.row.original?.prixParCC * data.row.original?.qttByCC
              )}
            </p>
          );
        },
      },
    ],
    []
  );
  useEffect(() => {
    if (commandes.length > 0) {
      setCurrent(commandes[activeTab].commandes);
      setTitle(commandes[activeTab].category);
      let montant = 0;
      for (let i = 0; i < commandes.length; i++) {
        const element = commandes[i];
      }
      setTotal(montant);
    }
  }, [commandes]);

  return (
    <div className="row">
      <div className="col-4">
        {/**<h5 className=" text-lg text-gray my-1">
          Total: {displayMoney(total)}
        </h5>**/}
        {commandes.map((c, index) => (
          <div
            key={index}
            onClick={() => {
              setTitle(c.category);
              setCurrent(c.commandes);
              onTabClick(index);
              setIsFetching(true);
              wait().then((v) => setIsFetching(false));
            }}
            className={`description-block pl-3 border  border-success p-2 border-right d-flex flex-column align-items-start justify-content-center info-box ${
              index === activeTab ? "bg-highlight" : ""
            }`}
          >
            <span className="btn btn-success btn-sm text-uppercase my-2">
              {c.category}
            </span>
            <h5 className=" text-xl text-gray my-1">
              {displayMoney(c.prixTotal * 1)}
            </h5>
            <p className="text-green">
              {NumberToLetter(c.prixTotal * 1)} Ariary
            </p>
          </div>
        ))}
      </div>
      <div className="col-8">
        <DataTable
          filter={false}
          tip={`Liste des commandes : ${title}`}
          data={current.sort((low, high) => high.id - low.id)}
          meta={{
            isFetching: isFetching,
          }}
          columns={columns}
          //  addUrl={NOUVELLEFACTURE}
          //  urlName={"Ajouter un facture"}
        />
      </div>
    </div>
  );
};

export default TabViewStatistic;
