import React, { useState, useRef, useEffect } from "react";
import Content from "../../../../@adminlte/adminlte/Content";
import ActiveLink from "../../../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../../@adminlte/adminlte/Content/Page";
import { action, getData } from "../../../../utils/lib/call";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCVA } from "../../../../store/actions/commandes";
import { displayDate, displayMoney } from "../../../../utils/functions";
import { Link } from "react-router-dom";
import DeleteToMagasin from "./DeleteToMagasin";
import moment from "moment";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import DataTable from "../../../../utils/admin/DataTable";
const isModified = (contenu) => {
  for (let i = 0; i < contenu.length; ++i) {
    if (contenu[i].correction > 0) {
      return true;
    } else return false;
  }
};
export const HistoriqueSortieCva = () => {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);

  const [dateRange, onChangeDateRange] = useState([start, end]);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCVA(deb, fin));
  }, [deb, fin]);

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
  const calculateTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.prixVente * el.quantityParProduct * 1;
    });
    return total;
  };
  const quantiteBruteTotal = (arr) => {
    let total = 0;
    arr?.forEach((el) => {
      total += el.quantityParProduct * 1;
    });
    return total;
  };
  const quantiteCCTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityCC;
    });
    return total;
  };

  const columns = [
    {
      Header: "Date",
      Cell: (data) => {
        return <div>{displayDate(data.row.original?.dateCom)}</div>;
      },
    },
    {
      Header: "Produits",
      Cell: (data) => {
        return (
          <div style={{ width: "350px" }}>
            {data.row.original?.isdeleted == true && (
              <>
                <div className="badge badge-danger">Supprimé</div>
                <div className="text text-danger">
                  Date de suppression :{" "}
                  {displayDate(data.row.original?.deletedat)}
                </div>
              </>
            )}
            {data.row.original?.isdeleted == null && (<p>
              {isModified(data.row.original?.contenu) && (
                <div className="badge badge-warning">Modifié</div>
              )}
            </p>)}
            {data.row.original?.contenu?.map((d) => (
              <span>
                <span
                  style={{
                    background:"white",
                    color: data.row.original?.isdeleted == true ? "red":"inherit",
                    padding: 2,
                  }}
                >
                  {d.name}
                </span>
                <span   style={{
                  color: data.row.original?.isdeleted == true ? "red":"inherit"
                }}> {" || "}</span>
              </span>
            ))}
          </div>
        );
      },
    },
    {
      Header: "Qté",
      Cell: (data) => {
        return <div>{quantiteBruteTotal(data.row.original?.contenu)}</div>;
      },
    },
    {
      Header: "Total",
      Cell: (data) => {
        return (
          <div>{displayMoney(calculateTotal(data.row.original?.contenu))}</div>
        );
      },
    },
    {
      Header: "Actions",
      Cell: (data) => {
        const isDisabled = data.row.original?.isdeleted==true ? true: false;
        return (
          <>
            <Link
              to={`/depot/to/magasin/detail/${data.row.original?.id}`}
              className={`btn btn-green btn-sm mr-2`}
              disabled={isDisabled}
            >
              Détails
            </Link>
            <Link
              to={`/depot/to/magasin/edit/${data.row.original?.id}`}
              className={`btn btn-warning btn-sm mr-2`}
              disabled={isDisabled}
            >
              Editer
            </Link>
            <DeleteToMagasin model="tomagasins" isDisabled={isDisabled} entity={data.row.original} />
          </>
        );
      },
    },
  ];

  return (
    <Content>
      <ContentHeader title="Historique sortie vers Magasin">
        <ActiveLink title="Historique sortie vers Magasin"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="text-uppercase">
                Historique de sortie vers Magasin
              </h3>
              <p>{`${displayDate(deb)} ->  ${displayDate(fin)}`}</p>
            </div>
          </div>
          <div className="col-lg-6 text-right">
            <DateRangePicker
              locale="fr-FR"
              onChange={onChangeDateRange}
              value={dateRange}
            />
          </div>{" "}
        </div>
        <DataTable
          filter={false}
          data={commandes.sort((low, high) => high.id - low.id)}
          meta={meta}
          columns={columns}
          //  addUrl={NOUVELLEFACTURE}
          //  urlName={"Ajouter un facture"}
        />
      </Page>{" "}
    </Content>
  );
};
