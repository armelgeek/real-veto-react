import PropType from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ROLE_ADMIN, ROLE_VENDEUR } from "../constants/roles";
const VendeurRoute = ({ isAuth, role, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
        <>
          <div className="">
            <div>
              <Component {...props} />
            </div>
          </div>
        </>
    }
  />
);

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
