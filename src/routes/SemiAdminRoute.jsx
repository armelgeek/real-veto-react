/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { ADMIN_DASHBOARD, SIGNIN } from "../constants/routes";
import PropType from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ROLE_ADMIN, ROLE_SEMI_ADMIN } from "../constants/roles";
import useScrollTop from "../hooks/useScrollTop";

const SemiAdminRoute = ({ isAuth, role, component: Component, ...rest }) => {
  useScrollTop();
  return (
    <Route
      {...rest}
      component={(props) => {
        if (isAuth && role === ROLE_SEMI_ADMIN) {
          return (
            <main className="content">
              <div>
                <h3>Semi admin</h3>
                <Component {...props} />
              </div>
            </main>
          );
        }

        /*   if (isAuth && role === ROLE_ADMIN) {
          return <Redirect to={ADMIN_DASHBOARD} />;
        }
*/
        return (
          <Redirect
            to={{
              pathname: SIGNIN,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

SemiAdminRoute.defaultProps = {
  isAuth: false,
  role: ROLE_SEMI_ADMIN,
};

SemiAdminRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  rest: PropType.any,
};

const mapStateToProps = ({ auth }) => ({
  isAuth: auth?.isLoggedIn,
  role: auth?.user?.role || "",
});

export default connect(mapStateToProps)(SemiAdminRoute);
