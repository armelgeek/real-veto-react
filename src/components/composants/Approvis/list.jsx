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

export default function ListApprov() {
  const [deb, setDeb] = useState(new Date());
  const [fin, setFin] = useState(new Date());
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const approvisionnements = useSelector(getData("approvis").value);
  const meta = useSelector(getData("approvis").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(action("approvis").fetch());
  }, []);
  useEffect(() => {
    dispatch(getApprov(deb, fin));
  }, [deb, fin]);
  const getByDate = () => {
    setDeb(refDateDeb.current.value);
    setFin(refDateFin.current.value);
  };
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
                Détail
              </Link>
              <Link
                to={`/editer/facture/${data.row.original?.id}`}
                className="btn btn-warning btn-sm"
              >
                Editer
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
            <div className="d-flex justify-content-end mb-3">
              <div className="ml-2">
                <input
                  type="date"
                  name="datedeb"
                  ref={refDateDeb}
                  placeholder="date debut"
                  className="form-control"
                />
              </div>
              <div className="ml-2">
                <input
                  type="date"
                  name="datefin"
                  ref={refDateFin}
                  placeholder="date fin"
                  className="form-control"
                />
              </div>
              <div className="ml-2">
                <button className="btn btn-green btn-block" onClick={getByDate}>
                  Filter par date
                </button>
              </div>
            </div>{" "}
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
