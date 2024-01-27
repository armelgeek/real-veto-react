import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import _ from "lodash";
import update from "react-addons-update";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import Content from "../@adminlte/adminlte/Content";
import { setSearchByDate } from "../store/actions/search/search";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
import { getTdbCommandeByProducts } from "../store/actions/commandes";
import { action, getData } from "../utils/lib/call";
import { displayDate } from "../utils/functions";
import DatePickerDateSection from "./DatePickerDateSection";
import PriceContainer from "./Price/PriceContainer";
import EditToFromMag from "./composants/vendeur/fromMagasin/EditFromMag";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Cycle from "../utils/cycle";
import JsonEditor, { SchemaTypes } from "./jsonEditor";
import { toast } from "react-toastify";
const schema = {
  dateCom: SchemaTypes.string({ disabled: true }),
  contenu: SchemaTypes.arrayOf({
    name: SchemaTypes.string({
      disabled: true,
    }),
    prixVente: SchemaTypes.number({
      numeric: true,
    }),
    prixParCC: SchemaTypes.number({
      numeric: true,
    }),
    prixqttccvente: SchemaTypes.number({
      numeric: true,
    }),
  })(),
};
const ChangePrixDate = () => {
  const history = useHistory();
  const search = useSelector((state) => state.searchbydate);
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [rangeDate, setRangeDate] = useState([]);
  const [rangeMonth, setRangeMonth] = useState([]);
  let [startofDate, setStartofDate] = useState(start);
  let [endDate, setEndDate] = useState(end);
  const [dateRange, onChangeDateRange] = useState([search.deb, search.fin]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const products = useSelector(getData("products").value);
  useEffect(() => {
    dispatch(action("products").get(id));
  }, []);
  useEffect(() => {
    if (dateRange !== null) {
      if (dateRange[0]) {
        setStartofDate(moment(dateRange[0]));
      }
      if (dateRange[1]) {
        setEndDate(moment(dateRange[1]));
      }
    } else {
      setStartofDate(start);
      setEndDate(end);
    }
  }, [dateRange]);
  const handleNextWeek = () => {
    onChangeDateRange([
      startofDate.clone().add(1, "week"),
      endDate.clone().add(1, "week"),
    ]);
  };
  const handlePreviousWeek = () => {
    onChangeDateRange([
      startofDate.clone().subtract(1, "week"),
      endDate.clone().subtract(1, "week"),
    ]);
  };

  useEffect(() => {
    if (dateRange !== null) {
      if (dateRange[0]) {
        dispatch(setSearchByDate(dateRange[0], dateRange[1]));
      }
    }
  }, [dateRange]);
  useEffect(() => {
    if (startofDate && endDate) {
      console.log("get vente");
      dispatch(getTdbCommandeByProducts("vente-cva", startofDate, endDate, id));
    }
  }, [startofDate, endDate]);

  const onChange = useCallback((value) => {
    console.log("changed", value);
    dispatch(action("commandes").setItems(value));
  }, []);
  const updateCommandeOnServer = () => {
    dispatch(
      action("commandes").updateData(
        {
          commandes,
        },
        "update-many-commandes"
      )
    );
    toast("Modification des prix appliqués !!!", { autoClose: 5000 });
  };

  console.log("render change", commandes);
  return (
    <Content>
      <ContentHeader
        title={`Historique de commande  ${
          products[0]?.name ? products[0]?.name : ""
        }`}
      >
        <ActiveLink
          title={`Historique de commande ${
            products[0]?.name ? products[0]?.name : ""
          }`}
        ></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <div>
              {startofDate && endDate && (
                <>
                  <h2 className="text-uppercase my-1">
                    Commande de "{products[0]?.name ? products[0]?.name : ""}"
                  </h2>
                  <span>
                    Du: {displayDate(startofDate)} Au {displayDate(endDate)}
                  </span>
                </>
              )}{" "}
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="btn btn-default btn-sm"
                style={{
                  marginRight: 10,
                }}
                onClick={handlePreviousWeek}
              >
                {"<"}
              </div>
              <div>
                <DateRangePicker
                  locale="fr-FR"
                  onChange={onChangeDateRange}
                  value={dateRange}
                />
              </div>
              <div
                className="btn btn-default btn-sm mr-3"
                style={{
                  marginLeft: 10,
                }}
                onClick={handleNextWeek}
              >
                {">"}
              </div>
              <button
                className="btn bg-thead text-white mb-1 btn-sm"
                onClick={updateCommandeOnServer}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
        {commandes.length > 0 ? (
          <JsonEditor object={commandes} onChange={onChange} type={schema} />
        ) : (
          <div className="alert bg-thead text-white mt-2 text-center">
            {" "}
            Aucune resultat trouvé{" "}
          </div>
        )}
      </Page>
    </Content>
  );
};

export default ChangePrixDate;
