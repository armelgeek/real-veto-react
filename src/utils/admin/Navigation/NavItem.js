import Icon from "@chakra-ui/icon";
import { Flex, Text, chakra } from "@chakra-ui/react";
import { BiCircle } from "react-icons/bi";
import { NavLink, useLocation } from "react-router-dom";
import { CollapseMenu, Item } from "../../context/collapse-menu-item-context";
import NavCollapse from "./NavCollapse";
import NavItemChild from "./NavItemChild";

export const NavItem = (props) => {
  const { icon, bg, to, activeProps, _hover, children, ...rest } = props;
  const location = useLocation();
  const isActive = location.pathname == to;

  return (
    <Flex
      as={to ? NavLink : chakra.div}
      align="center"
      px="2"
      pl="2"
      py="2"
      fontSize="sm"
      mb="1"
      bg={isActive ? "blue.700" : "transparent"}
      color={"whitesmoke"}
      to={to}
      cursor="pointer"
      role="group"
      transition=".15s ease"
      {...activeProps}
      {...rest}
    >
      {icon && <Icon mr="2" boxSize="4" as={icon} />}
      {children}
    </Flex>
  );
};
export const CollapseMenuItem = ({ ckey, title, icon, links }) => {
  return (
    <>
      <CollapseMenu>
        <Item>
          {({ collapse, setCollapse }) => (
            <NavCollapse
              collapse={collapse}
              keyCollapse={ckey}
              title={title}
              setCollapse={setCollapse}
              icon={icon}
              to={links[0].path}
            >
              {links.map((lk) => (
                <NavItemChild
                  collapse={collapse}
                  keyCollapse={ckey}
                  setCollapse={setCollapse}
                  icon={BiCircle}
                  to={lk.path}
                >
                  {lk.title}
                </NavItemChild>
              ))}
            </NavCollapse>
          )}
        </Item>
      </CollapseMenu>
    </>
  );
};
