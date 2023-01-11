import PropType from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ROLE_ADMIN, ROLE_VENDEUR } from "../constants/roles";
import useScrollTop from "../hooks/useScrollTop";
const VendeurRoute = ({ isAuth, role, component: Component, ...rest }) => {
  useScrollTop();
  return (
    <Route
      {...rest}
      component={(props) => {
          return (<Component {...props} />);
        }
      }
    />
  );
};
const mapStateToProps = ({ auth }) => ({
  isAuth: auth?.isLoggedIn,
  role: auth?.user?.role || "",
});

VendeurRoute.defaultProps = {
  isAuth: false,
  role: ROLE_VENDEUR,
};

VendeurRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired,
  rest: PropType.any,
};

export default connect(mapStateToProps)(VendeurRoute);
