import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink,useLocation } from "react-router-dom";

const NavTree= ({ title,route }) => {

  const location = useLocation();
  const isActive = location.pathname == route;

  return (
    <li class="nav-item">
    <Link as={NavLink} to={route} class={`text-white nav-link ${isActive ? 'active':''}`}>
      <i class="far fa-circle nav-icon"></i>
      <p>{title}</p>
    </Link>
  </li>
  );
};

NavTree.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default NavTree;
