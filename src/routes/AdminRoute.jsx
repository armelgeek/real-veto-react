import PropType from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ROLE_ADMIN, ROLE_VENDEUR } from "../constants/roles";
import AdminLTE from "../@adminlte/AdminLTE";
import useScrollTop from "../hooks/useScrollTop";
import TargetChoice from "../TargetChoice";
const AdminRoute = ({ isAuth, role, component: Component, ...rest }) => {
  useScrollTop();
  return (
    <Route
      {...rest}
      component={(props) => {
      //  const selectedOption = localStorage.getItem("selectedOption");

        //if (_.isUndefined(selectedOption)) {
          return (
            <AdminLTE title={"CBV AMBALAVAO"}>
              <Component {...props} />
            </AdminLTE>
          );
        /**} else {
          return <TargetChoice {...props} />;
        } */
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
