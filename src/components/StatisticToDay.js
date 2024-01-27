import React, { useState, useEffect, useContext, useImperativeHandle } from "react";
import { displayDate, displayMoney } from "../utils/functions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../utils/lib/call";
import { getCommandeByCategories } from "../store/actions/commandes";
import { SocketContext } from "../context/SocketContext";
import { Link } from "react-router-dom";
import { STATISTIC_DETAIL } from "../constants/routes";
import NumberFormat from "react-number-format";
import { NumberToLetter } from "convertir-nombre-lettre";
import TabView from "./TabView";
import TabViewStatistic from "./TabViewStatistic";
const TabStatistic = ({ activeCategory,setActiveCategory,commandes }) => {
 return (
    <TabViewStatistic activeCategory={activeCategory} setActiveCategory={setActiveCategory} commandes={commandes}>
    </TabViewStatistic>
  );
};
const StatisticToDay = ({ isHome = true }) => {
  const [currentDate, setCurrentDate] = useState(moment());
  const socket = useContext(SocketContext);
  const formatRelativeDate = (date) => {
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const twoDaysAgo = moment().subtract(2, "day").startOf("day");

    if (date.isSame(today, "d")) {
      return "Aujourd'hui";
    } else if (date.isSame(yesterday, "d")) {
      return "Hier";
    } else if (date.isSame(twoDaysAgo, "d")) {
      return "Avant-hier";
    } else {
      return `Il y a ${moment().diff(date, "days")} jours`;
    }
  };
  const commandes = useSelector(getData("commandestat").value);
  const meta = useSelector(getData("commandestat").meta);
  const [activeCategory,setActiveCategory] = useState(0);
  const dispatch = useDispatch();
  const handlePreviousDay = () => {
    const previousDay = currentDate.clone().subtract(1, "day");
    setCurrentDate(previousDay);
  };
  const handleNextDay = () => {
    const nextDay = currentDate.clone().add(1, "day");
    setCurrentDate(nextDay);
  };
  useEffect(() => {
    dispatch(getCommandeByCategories(currentDate));
  }, [currentDate]);

  useEffect(() => {
    socket.on("refresh-data", () => {
      dispatch(getCommandeByCategories(currentDate));
      const audio = new Audio("song/notif.wav"); // Remplacez le chemin par celui de votre fichier audio
      audio.volume = 0.2; // Réglage du volume à 50% (la moitié du volume maximal)

      audio.play();
    });

    return () => {
      socket.off("refresh-data");
    };
  }, [socket]);
  return (
    <div className="mt-3 p-3 border">
      <div className="d-flex justify-content-between align-items-center">
      <div  className="d-flex  align-items-center">
        <h3 className="text-md text-uppercase">Recette journaliere</h3>
      </div>
        <div className="d-flex  align-items-center">
        <button
            className="btn btn-default btn-sm"
            style={{
              marginRight: 10,
            }}
            onClick={handlePreviousDay}
          >
            {"<"}
          </button>
          <div>
            <h3 className="text-capitalize text-md">
              {formatRelativeDate(currentDate)} ( {displayDate(currentDate)} )
            </h3>
          </div>
          <button
            className="btn btn-default btn-sm"
            style={{
              marginLeft: 10,
            }}
            onClick={handleNextDay}
            disabled={currentDate.isSame(moment(), "day")}
          >
            {">"}
          </button>
        </div>
      </div>
      {isHome ? (
        <div className="row">
          {commandes?.map((c) => (
            <div className="col-sm-4 col-xs-6">
              <div className="description-block pl-3 p-2 d-flex flex-column align-items-start justify-content-center info-box">
                <span className="btn bg-dark btn-sm text-uppercase my-2">
                  {c.category}
                </span>
                <h5 className=" text-xl text-gray my-1">
                  {displayMoney(c.prixTotal * 1)}
                </h5>
                <p className="text-green">
                  {NumberToLetter(c.prixTotal * 1)} Ariary
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TabStatistic activeCategory={activeCategory} setActiveCategory={setActiveCategory} commandes={commandes} />
      )}
    </div>
  );
};
export default StatisticToDay;
