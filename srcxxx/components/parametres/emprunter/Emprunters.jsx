import React from "react";
import PropTypes from "prop-types";
import DataTable from "../../../utils/admin/DataTable";
import { action, getData } from "../../../utils/lib/call";
import { useSelector, useDispatch } from "react-redux";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { ADD_EMPRUNTEUR, ADD_VACCINATEUR } from "../../../constants/routes";
import { CrudAction } from "../../../utils/admin/Resource/CrudAction";
import { SCOPES } from "../../../constants/permissions";
function Emprunters() {
  const emprunteurs = useSelector(getData("emprunters").value);
  const meta = useSelector(getData("emprunters").meta);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(action("emprunters").fetch());
  }, []);

  const columns = [
    {
      Header: "Nom",
      accessor: "name",
    },{
      Header: "Téléphone",
      accessor: "contact",
    },
    {
      Header: "Actions",
      Cell: (data) => {
        return (
          <CrudAction
            edit={[SCOPES.canEditEmprunter]}
            detail={[SCOPES.canViewEmprunter]}
            remove={[SCOPES.canDeleteEmprunter]}
            route={"emprunters"}
            model={"emprunters"}
            modelKey={"name"}
            data={data}
          />
        );
      },
    },
  ];

  return (
    <Content>
      <ContentHeader title="Démandeurs de crédit">
        <ActiveLink title="Démandeurs de crédit"></ActiveLink>
      </ContentHeader>
      <Page>
        <DataTable
          scopes={[SCOPES.canCreateEmprunter]}
          data={emprunteurs.sort((low, high) => high.id - low.id)}
          meta={meta}
          columns={columns}
          addUrl={ADD_EMPRUNTEUR}
          urlName={"Ajouter une personne"}
        />
      </Page>
    </Content>
  );
}

export default Emprunters;
