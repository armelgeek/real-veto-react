import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import NavTree from "./NavTree";
import Gate from '../../components/Gate';

const NavItem = ({ children, title, scopes = [] }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Gate scopes={scopes}>
      <li
        as={NavLink}
        className={`nav-item ${isActive ? "menu-is-opening" : null} menu-open`}
      >
        <a href="#" className="nav-link">
          <i className="nav-icon fas fa-tachometer-alt"></i>
          <p>
            {title}
            <i className={`right fas fa-angle-left`}></i>
          </p>
        </a>
        <ul
          className="nav nav-treeview"
          style={{ display: `block` }}
        >
          {children}
        </ul>
      </li>
    </Gate>
  );
};


export default NavItem;
