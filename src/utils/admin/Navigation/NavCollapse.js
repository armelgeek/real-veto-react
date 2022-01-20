import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { Collapse } from "@chakra-ui/transition";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import NavItemCollapse from "./NavItemCollapse";
import { useHistory } from "react-router-dom";

const NavCollapse = ({
  title,
  icon,
  to,
  collapse,
  setCollapse,
  keyCollapse,
  children,
}) => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.state != undefined || location.state != null) {
      if (keyCollapse == location.state.keyCollapse) {
        setCollapse(location.state.collapse);
      } else {
        setCollapse(false);
      }
    }
  }, [location, keyCollapse]);
  return (
    <>
      <NavItemCollapse
        isActive={collapse}
        icon={icon}
        onClick={() => {
          history.push(to, { collapse: true, keyCollapse: keyCollapse });
          setCollapse(true);
        }}
      >
        {title}
        <Icon
          as={ArrowUpDownIcon}
          ml="auto"
          transform={collapse && "rotate(90deg)"}
        />
      </NavItemCollapse>
      <Collapse in={collapse}>{children}</Collapse>
    </>
  );
};

export default NavCollapse;
