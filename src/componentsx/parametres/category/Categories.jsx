import React from "react";
import PropTypes from "prop-types";
import DataTable from "../../../utils/admin/DataTable";
import { action, getData } from "../../../utils/lib/call";
import { useSelector, useDispatch } from "react-redux";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { ADD_CATEGORIES } from '../../../constants/routes';
import { CrudAction } from "../../../utils/admin/Resource/CrudAction";
import { SCOPES } from "../../../constants/permissions";

function Categories() {
  const categories = useSelector(getData("categories").value);
  const meta = useSelector(getData("categories").meta);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(action("categories").fetch());
  }, []);

  const columns = [
    {
      Header: "Nom",
      accessor: "name",
    },      {
      Header: "Actions",
      Cell: (data) => {
        return (
          
          <CrudAction
            edit={[SCOPES.canEditCategory]}
            detail={[SCOPES.canViewCategory]}
            remove={[SCOPES.canDeleteCategory]}
            route={"categories"}
            model={"categories"}
            modelKey={"name"}
            data={data}
          />
        );
      }}
  
  ];

  return (
    <Content>
      <ContentHeader title="Categories">
        <ActiveLink title="Categories"></ActiveLink>
      </ContentHeader>
      <Page>
        <DataTable
          scopes={[SCOPES.canCreateCategory]}
          data={categories.sort((low, high) => high.id - low.id)}
          meta={meta}
          columns={columns}
          addUrl={ADD_CATEGORIES}
          urlName={"Ajouter une categorie"}
        />
      </Page>
    </Content>
  );
}

export default Categories;
