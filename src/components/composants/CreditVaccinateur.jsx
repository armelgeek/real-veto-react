import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../utils/lib/call";
import { getCredit, getCreditVaccinateur, setPayerCommande } from "../../store/actions/commandes";
import { Link } from "react-router-dom";
import moment from "moment";
import Content from "../../@adminlte/adminlte/Content";
import ActiveLink from "../../@adminlte/adminlte/Content/ActiveLink";
import ContentHeader from "../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../@adminlte/adminlte/Content/Page";

import { displayDate, displayMoney } from "../../utils/functions";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/DateRangePicker";
import DataTable from '../../utils/admin/DataTable';
import DeleteFromDepot from "../fromDepot/DeleteFromDepot";
import { SCOPES } from "../../constants/permissions";
import Gate from '../Gate';
function CreditVaccinateur(props) {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const dispatch = useDispatch();

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
  const calculateTotal = (arr,type) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += (type != "vente-depot-vaccinateur"  ? el.prixVente: el.prixVaccinateur) * el.quantityParProductDepot;
    });
    return total;
  };
  const quantiteBruteTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityParProductDepot * 1;
    });
    return total;
  };
  const quantiteCCTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.qttByCCDepot * 1;
    });
    return total;
  };
  useEffect(() => {
    dispatch(getCreditVaccinateur(deb, fin));
  }, [deb, fin]);
  const columns = React.useMemo(
    () => [
      {
        Header: "Date du credit",
        Cell: (data) => {
          return <>{displayDate(data.row.original?.dateCom)}</>;
        },
      },
      {
        Header: "Produits",

        Cell: (data) => {
          return (
            <div style={{ width: "100px" }}>
              {data.row.original?.contenu?.map((d) => (
                <span>
                  {d.name}
                  {","}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        Header: "Status",
        Cell: (data) => {
          return (
            <div>
              {data.row.original?.status == true ? (
                <h3 className="badge badge-success">payé</h3>
              ) : (
                <h3 className="badge badge-danger">non payé</h3>
              )}
            </div>
          );
        },
      },
      {
        Header: "Nom du vaccinateur",
        accessor: "vaccinateur.name",
      },
      {
        Header: "Contact du vaccinateur",
        accessor: "vaccinateur.contact",
      },

      {
        Header: "Quantité",
        Cell: (data) => {
          return (
            <div>
              {quantiteBruteTotal(data.row.original?.contenu)}
            </div>
          );
        },
      },
      {
        Header: "Total",
        Cell: (data) => {
          return (
            <div>
              {displayMoney(calculateTotal(data.row.original?.contenu,data.row.original?.type))}
            </div>
          );
        },
      },
      {
        Header: "Actions",
        Cell: (data) => {
          return (
            <>
              <Gate scopes={[SCOPES.canShowDetailVaccinateurCreditDepot]}>
                <Link
                  to={`/detail/${data.row.original?.id}`}
                  className="btn btn-green btn-sm mr-2"
                >
                  Détails
                </Link>
              </Gate>
              <Gate scopes={[SCOPES.canShowDetailVaccinateurCreditDepot]}>
                <Link
                  to={`/editer/commande/${data.row.original?.id}`}
                  className="btn btn-warning btn-sm mr-2"
                >
                  Editer
                </Link>
              </Gate>
              <Gate scopes={[SCOPES.canShowDeleteVaccinateurCreditDepot]}>
                <DeleteFromDepot model="fromdepots" entity={data.row.original} /> </Gate>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <Content>
      <ContentHeader title="Crédit  pour les vaccinateurs">
        <ActiveLink title="Crédit  pour les vaccinateurs"></ActiveLink>
      </ContentHeader>
      <Page>
        <div className="row">
          <div className="col-lg-6">
            <div>
              <h3 className="text-uppercase">Credit pour les vaccinateurs</h3>
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
          data={commandes.sort((low, high) => high.id - low.id)}
          meta={meta}
          columns={columns}
        //  addUrl={NOUVELLEFACTURE}
        //  urlName={"Ajouter un facture"}
        />
      </Page>
    </Content>
  );
}

export default CreditVaccinateur;
