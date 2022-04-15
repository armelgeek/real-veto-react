import React from "react";
import PropTypes from "prop-types";
import DataTable from "../../../utils/admin/DataTable";
import { action, getData } from "../../../utils/lib/call";
import { useSelector, useDispatch } from "react-redux";
import Content from "../../../@adminlte/adminlte/Content";
import ContentHeader from "../../../@adminlte/adminlte/Content/ContentHeader";
import ActiveLink from "../../../@adminlte/adminlte/Content/ActiveLink";
import Page from "../../../@adminlte/adminlte/Content/Page";
import { ADD_VACCINATEUR } from "../../../constants/routes";
import { CrudAction } from "../../../utils/admin/Resource/CrudAction";

function Vaccinateurs() {
  const vaccinateurs = useSelector(getData("vaccinateurs").value);
  const meta = useSelector(getData("vaccinateurs").meta);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(action("vaccinateurs").fetch());
  }, []);

  const columns = [
    {
      Header: "Nom",
      accessor: "name",
    },
    {
      Header: "Téléphone",
      accessor: "contact",
    },
    {
      Header: "Actions",
      Cell: (data) => {
        return (
          <CrudAction
            detail={false}
            route={"vaccinateurs"}
            model={"vaccinateurs"}
            modelKey={"name"}
            data={data}
          />
        );
      },
    },
  ];

  return (
    <Content>
      <ContentHeader title="Vaccinateurs">
        <ActiveLink title="Vaccinateurs"></ActiveLink>
      </ContentHeader>
      <Page>
        <DataTable
          data={vaccinateurs.sort((low, high) => high.id - low.id)}
          meta={meta}
          columns={columns}
          addUrl={ADD_VACCINATEUR}
          urlName={"Ajouter un vaccinateur"}
        />
      </Page>
    </Content>
  );
}

export default Vaccinateurs;
