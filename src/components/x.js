import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import Content from "../@adminlte/adminlte/Content";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
import { getTdbCommande } from "../store/actions/commandes";
import { action, getData } from "../utils/lib/call";
import { displayDate } from "../utils/functions";
import DatePickerDateSection from './DatePickerDateSection';
import PriceContainer from './Price/PriceContainer';
import EditToFromMag from './composants/vendeur/fromMagasin/EditFromMag';
import { useParams } from 'react-router-dom';
import Cycle from '../utils/cycle';

const ChangePrixDate = () => {
  const [index, setIndex] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const commandes = useSelector(getData("commandes").value);
  const [data, setData] = useState(commandes);
  const meta = useSelector(getData("commandes").meta);

  const next = () => {
    if (index < data.length - 1) {
      console.log('ici')
      setIndex((i) => i += 1);
    };
  };

  const previous = () => {
    if (index > 0) {
      setIndex((i) => i -= 1);
    };
  };
  const update = (index, key, value) => {
    let temp_state = [...data];
    temp_state[index] = { ...temp_state[index], [key]: value };
    setData(temp_state);
  };
  useEffect(() => {
    dispatch(getTdbCommande('vente-cva', "2023-01-07T22:00:00.000Z", "2023-01-21T21:59:59.999Z", id));
  }, []);

  console.log('command', commandes);
  return (
    <Content>
      <ContentHeader title="Changer le prix">
        <ActiveLink title="Changer le prix"></ActiveLink>
      </ContentHeader>
      <Page>
        {meta.isFetching && <p>Chargement en cours  ...</p>}
        {/**<p>{JSON.stringify(data[index])}</p>**/}
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        >
          <div>
            <h3 className="text-blue">#{id}</h3>
          </div>
          <div>
            <p>{index + 1} / {data.length}</p>
          </div>
        </div>
        <EditToFromMag commandes={data[index].contenu} id={data[index].id} />
        <button className="btn btn-green btn-sm mr-2" style={{
          marginRight: "15px"
        }} onClick={previous}>{"<< Précedent "}</button>
        <button className="btn btn-green btn-sm mr-2" style={{
          marginRight: "15px"
        }} onClick={next} >{"Suivant >>"}</button>
        {/**<div className="d-flex flex-row justify-content-space-between">
          <div>
          {data.length >0 && data.map((c,i)=> <div key={i}>
            <PriceContainer c={c} update={update}  date={displayDate(c.date)} i={i}/>
            </div>
            )} 
          </div>
          <div>
            {JSON.stringify(data)}
          </div>
        </div>**/}
        {/** <DatePickerDateSection dates={dates} data={commandes} id={id} onChange={onChange}/>**/}
      </Page>
    </Content>
  );
};


export default ChangePrixDate;
