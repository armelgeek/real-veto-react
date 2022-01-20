import React,{useState} from "react";
import { GetOne, Data } from "../../../utils/context/data-context";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import Page from "../../../@adminlte/adminlte/Content/Page";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import { useDispatch, useSelector } from "react-redux";
import { action, getData } from "../../../utils/lib/call";
import { useParams } from "react-router-dom";
import EditApprovisionnement from './EditApprovisionnement';
import { Container } from 'react-bootstrap';

export const EditerApprov = () => {
  const { id } = useParams();
  const [regenerate,setRegenerate]=useState(false);
  const dispatch = useDispatch();
  const approv = useSelector(getData("approvis").value);
  React.useEffect(() => {
    dispatch(action("approvis").get(id));
  }, [id]);
  
  return (
    <Content>
      <ContentHeader title="Edition de facture">
        <ActiveLink title="Edition de facture"></ActiveLink>
      </ContentHeader>
      <Page>
      <Container>

      <EditApprovisionnement setRegenerate={setRegenerate} approv={approv[0]} />
      </Container>
      </Page>
    </Content>
  );
};
