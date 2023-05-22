import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import Gate from '../../components/Gate';

const NavTree = ({ title, route, scopes = [] }) => {

  const location = useLocation();
  const isActive = location.pathname == route;

  return (
    <Gate scopes={scopes}>
      <li class="nav-item">
        <Link as={NavLink} to={route} class={`text-white nav-link ${isActive ? 'active' : ''}`}>
          <i class="far fa-circle nav-icon"></i>
          <p>{title}</p>
        </Link>
      </li>
    </Gate>
  );
};

NavTree.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default NavTree;
