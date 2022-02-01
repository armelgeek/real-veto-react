import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { action, getData } from "../../../utils/lib/call";
import moment from "moment";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { getApprov } from "../../../store/actions/approv";
import { displayDate, displayMoney } from "../../../utils/functions";
import DataTable from "../../../utils/admin/DataTable";
import { NOUVELLEFACTURE } from "../../../constants/routes";
import DateRangePicker  from '@wojtekmaj/react-daterange-picker';

export default function ListApprov() {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const approvisionnements = useSelector(getData("approvis").value);
  const meta = useSelector(getData("approvis").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("approvis").fetch());
  }, []);
  useEffect(() => {
    if (dateRange !== null) {
      if (dateRange[0]) {
        setDeb(dateRange[0]);
      }
      if (dateRange[1]) {
        setFin(dateRange[1]);
      }
    } else {
      setDeb(start);
      setFin(end);
    }
  }, [dateRange]);
  useEffect(() => {
    dispatch(getApprov(deb, fin));
  }, [deb, fin]);
  const getDataa=()=>{
    dispatch(getApprov(deb, fin));
  }
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Date du facture",
        Cell: (data) => {
          return (
            <>
              <span className="badge badge-primary">
                {displayDate(data.row.original?.dateApprov)}
              </span>
            </>
          );
        },
      },
      {
        Header: "Date echeance",
        Cell: (data) => {
          return (
            <>
              <span className="badge badge-warning">
                {displayDate(data.row.original?.dateEcheance)}
              </span>
            </>
          );
        },
      },
      {
        Header: "Mode de paiement",
        accessor: "typePaye",
      },
      {
        Header: "Total",
        Cell: (data) => {
          return <div>{displayMoney(data.row.original?.total)}</div>;
        },
      },
      {
        Header: "Actions",
        Cell: (data) => {
          return (
            <>
              <Link
                to={`/approvis/detail/${data.row.original?.id}`}
                className="btn btn-green btn-sm mr-2"
              >
                Détails
              </Link>
              <Link
                to={`/editer/facture/${data.row.original?.id}`}
                className="btn btn-warning btn-sm mr-2"
              >
                Editer
              </Link>
              <Link
                to={`/editer/facture/${data.row.original?.id}`}
                className="btn btn-danger  btn-sm"
              >
                Supprimer
              </Link>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <Content>
      <ContentHeader title="Factures">
        <ActiveLink title="Factures"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="text-uppercase">Factures</h3>
              <p>{`${displayDate(deb)} ->  ${displayDate(fin)}`}</p>
            </div>
          </div>
          <div className="col-lg-6 text-right">
          <DateRangePicker
              locale="fr-FR"
              onChange={onChangeDateRange}
              value={dateRange}
            />
            <button
              className="ml-3 btn btn-primary btn-sm"
              onClick={getDataa}
            >
              Filtrer
            </button>
          </div>{" "}
        </div>

        <DataTable
          data={approvisionnements}
          meta={meta}
          columns={columns}
          addUrl={NOUVELLEFACTURE}
          urlName={"Ajouter un facture"}
        />
      </Page>
    </Content>
  );
}
