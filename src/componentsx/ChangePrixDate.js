import React, { useEffect,useState,useCallback,useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ActiveLink from "../@adminlte/adminlte/Content/ActiveLink";
import Content from "../@adminlte/adminlte/Content";
import ContentHeader from "../@adminlte/adminlte/Content/ContentHeader";
import Page from "../@adminlte/adminlte/Content/Page";
import { getTdbCommandeByProduct } from "../store/actions/commandes";
import { action, getData } from "../utils/lib/call";
import { displayDate } from "../utils/functions";
import DatePickerDateSection from './DatePickerDateSection';
import EditToFromMag from './composants/vendeur/fromMagasin/EditFromMag';
import { useParams } from 'react-router-dom';
const ChangePrixDate = () => {
	const [dates,setDates] = useState([]);
	const selectedListRef = useRef([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
   const commandes = useSelector(getData("commandes").value);
  const meta = useSelector(getData("commandes").meta);
	const onChange = useCallback(
      (v) => {
        if (selectedListRef.current.length) {
          let index = selectedListRef.current.indexOf(v);
          if (index != -1) {
            selectedListRef.current.splice(index, 1);
          } else {
            selectedListRef.current.push(v);
          }
        } else {
          selectedListRef.current.push(v);
        }
        setDates([...selectedListRef.current]);
        
      },
      [selectedListRef],
    );
    useEffect(() => {
      dispatch(getTdbCommandeByProduct('vente-cva', null, null, id));
    }, []);
    return (
    <Content>
	      <ContentHeader title="Changer le prix">
	        <ActiveLink title="Changer le prix"></ActiveLink>
	      </ContentHeader>
	      <Page>
        {meta.isFetching && <p>Chargement en cours  ...</p>}
        {commandes.length >0 && commandes.map((c,i)=> <div key={i}>
            <p>{displayDate(c.date)}</p>
            <EditToFromMag
              data={data}
              setData={setData}
              index={i}
              commandes={c.contenu}
            />
        </div>)} 

	       {/** <DatePickerDateSection dates={dates} data={commandes} id={id} onChange={onChange}/>**/}
	      </Page>
    </Content>
    );
};


export default ChangePrixDate;
