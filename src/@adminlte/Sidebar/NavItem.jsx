import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import NavTree from "./NavTree";

const NavItem = ({ children, title }) => {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };
  return (
    <li
      as={NavLink}
      class={`nav-item ${isActive ? "menu-is-opening" : null} menu-open`}
    >
      <a href="#"  class="nav-link">
        <i class="nav-icon fas fa-tachometer-alt"></i>
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
  );
};


export default NavItem;
