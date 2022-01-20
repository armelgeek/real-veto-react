/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ROLE_VENDEUR } from "../constants/roles";
import { SIGNIN, SIGNUP } from "../constants/routes";
import AdminLTE from "../@adminlte/AdminLTE";
const PublicRoute = ({ isAuth, role, component: Component, path, ...rest }) => (
  <Route
    {...rest}
    // eslint-disable-next-line consistent-return
    render={(props) => {
      // eslint-disable-next-line react/prop-types
      const { from } = props.location.state || { from: { pathname: "/" } };

      /* if (isAuth && role === ROLE_ADMIN) {
        return <Redirect to={ADMIN_DASHBOARD} />;
      }
      if(isAuth && role === ROLE_BOUTIK){
        return <Redirect to={BOUTIK_DASHBOARD}/>
      }*/

      if (
        isAuth &&
        role === ROLE_VENDEUR &&
        (path === SIGNIN || path === SIGNUP)
      ) {
        return <Redirect to={from} />;
      }

      return (
        <div>
          <AdminLTE title={"CBV AMBALAVAO"}>
          <Component {...props} />
          </AdminLTE>
        </div>
      );
    }}
  />
);

PublicRoute.defaultProps = {
  isAuth: false,
  role: ROLE_VENDEUR,
  path: "/",
};

const mapStateToProps = ({ auth }) => ({
  isAuth: auth?.isLoggedIn,
  role: auth?.user?.role || "",
});

export default connect(mapStateToProps)(PublicRoute);
