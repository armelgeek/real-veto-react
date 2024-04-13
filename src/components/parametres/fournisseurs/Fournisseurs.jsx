import React from "react";
import PropTypes from "prop-types";
import DataTable from "../../../utils/admin/DataTable";
import { action, getData } from "../../../utils/lib/call";
import { useSelector, useDispatch } from "react-redux";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { ADD_FOURNISSEUR } from '../../../constants/routes';
import { CrudAction } from "../../../utils/admin/Resource/CrudAction";
import { SCOPES } from "../../../constants/permissions";
function Fournisseurs() {
  const fournisseurs = useSelector(getData("fournisseurs").value);
  const meta = useSelector(getData("fournisseurs").meta);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(action("fournisseurs").fetch());
  }, []);

  const columns = [
    {
      Header: "Nom",
      accessor: "name",
    }, {
      Header: "Actions",
      Cell: (data) => {
        return (

          <CrudAction
            edit={[SCOPES.canEditFournisseurs]}
            detail={[SCOPES.canViewFournisseurs]}
            remove={[SCOPES.canDeleteFournisseurs]}
            route={"fournisseurs"}
            model={"fournisseurs"}
            modelKey={"name"}
            data={data}
          />
        );
      }
    }

  ];

  return (
    <Content>
      <ContentHeader title="Fournisseurs">
        <ActiveLink title="Fournisseurs"></ActiveLink>
      </ContentHeader>
      <Page>
        <DataTable
          scopes={[SCOPES.canCreateFournisseurs]}
          data={fournisseurs.sort((low, high) => high.id - low.id)}
          meta={meta}
          columns={columns}
          addUrl={ADD_FOURNISSEUR}
          urlName={"Ajouter un fournisseur"}
        />
      </Page>
    </Content>
  );
}

Fournisseurs.propTypes = {};

export default Fournisseurs;
