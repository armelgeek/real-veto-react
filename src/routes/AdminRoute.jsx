import PropType from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import ChakraAdmin from "../utils/admin/ChakraAdmin";
import { ROLE_ADMIN, ROLE_VENDEUR } from "../constants/roles";
import SideBarMenu from "../components/admin/SideBarMenu";
import AdminLTE from "../@adminlte/AdminLTE";
import useScrollTop from "../hooks/useScrollTop";
const AdminRoute = ({ isAuth, role, component: Component, ...rest }) => {
  useScrollTop();
  return (
    <Route
      {...rest}
      component={(props) => {
          return (
            <AdminLTE  title={"CBV AMBALAVAO"}>
              <Component {...props} />
            </AdminLTE>
          );
      }}
    />
  );
};
/**
const mapStateToProps = ({ users }) => ({
  isAuth: users.authenticated,
});**/
const mapStateToProps = ({ auth }) => ({
  isAuth: auth?.isLoggedIn,
  role: auth?.user?.role || "",
});

AdminRoute.defaultProps = {
  isAuth: false,
  role: ROLE_VENDEUR,
};

AdminRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired,
  rest: PropType.any,
};

export default connect(mapStateToProps)(AdminRoute);
