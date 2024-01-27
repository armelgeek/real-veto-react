import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import Gate from '../../components/Gate';

const NavTree = ({ title, route, scopes = [] }) => {

  const location = useLocation();
  const isActive = location.pathname == route;

  return (
    <Gate scopes={scopes}>
      <li className="nav-item">
        <Link as={NavLink} to={route} className={`text-white nav-link ${isActive ? 'active' : ''}`}>
          <i className="far fa-circle nav-icon"></i>
          <p>{title}</p>
        </Link>
      </li>
    </Gate>
  );
};

export default NavTree;
