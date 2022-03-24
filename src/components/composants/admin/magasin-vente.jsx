import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { action, getData } from "../../../utils/lib/call";
import { getCommandeCVA } from "../../../store/actions/commandes";
import { displayDate, displayMoney } from "../../../utils/functions";
import Content from "../../../@adminlte/adminlte/Content/index";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";
import DataTable from '../../../utils/admin/DataTable';

export const MagasinVente = () => {
  var start = moment().isoWeekday(1).startOf("week");
  var end = moment().endOf("week");
  const [deb, setDeb] = useState(start);
  const [fin, setFin] = useState(end);
  const refDateDeb = useRef(null);
  const refDateFin = useRef(null);
  const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
  const [dateRange, onChangeDateRange] = useState([start, end]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommandeCVA(deb, fin));
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
      total += el.prixVente * 1;
    });
    return total;
  };
  const quantiteBruteTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.quantityParProduct * 1;
    });
    return total;
  };
  const quantiteCCTotal = (arr) => {
    if (!arr || arr?.length === 0) return 0;
    let total = 0;
    arr.forEach((el) => {
      total += el.qttByCC * 1;
    });
    return total;
  };
  const getDataProduct = () => {
    dispatch(getCommandeCVA(deb, fin));
  };
  
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        Cell: (data) => {
          return (
            <>
              <span >
                {displayDate(data.row.original?.dateCom)}
              </span>
            </>
          );
        },
      },
      {
        Header: "Quantité",
        Cell: (data) => {
          return (
            <>
              <span>
                {quantiteBruteTotal(data.row.original?.contenu)}
              </span>
            </>
          );
        },
        
      },
      {
        Header: "Quantité en ML",
        Cell: (data) => {
          return (
            <>
              <span className="badge badge-primary">
              {quantiteCCTotal(data.row.original?.contenu)}
              </span>
            </>
          );
        },
      },
      {
        Header: "Total",
        Cell: (data) => {
          return <div>{displayMoney(calculateTotal(data.row.original?.contenu))}</div>;
        },
      },{
        Header: "Actions",
        Cell: (data) => {
          return (
            <Link
              className="btn btn-sm  btn-green"
              to={`/magasin/detail/vente/${data.row.original?.id}`}
            >
            Détails
            </Link>
            
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <Content>
        <ContentHeader title="Historique de vente du magasin">
          <ActiveLink title="Historique de vente du magasin"></ActiveLink>
        </ContentHeader>
        <Page>
          <div className="row my-2">
            <div className="col-lg-8">
              <div>
                {deb && fin && (
                  <>
                    <h2>Historique de vente du magasin</h2>
                    <span>
                      Du: {displayDate(deb)} Au {displayDate(fin)}
                    </span>
                  </>
                )}{" "}
              </div>
            </div>
            <div className="col-lg-4 text-right">
              <div>
                <DateRangePicker
                  locale="fr-FR"
                  onChange={onChangeDateRange}
                  value={dateRange}
                />
              </div>
            </div>
          </div>
          <DataTable
          filter={false}
            data={commandes}
            meta={meta}
            columns={columns}
          />
        </Page>
      </Content>
    </>
  );
};
