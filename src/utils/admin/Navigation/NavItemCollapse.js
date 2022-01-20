import Icon from "@chakra-ui/icon";
import { Flex, chakra } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavItemCollapse = (props) => {
  const { icon, bg, isActive, to, activeProps, _hover, children, ...rest } = props;

  return (
    <Flex
      as={to ? NavLink : chakra.div}
      align="center"
      px="2"
      pl="2"
      py="2"
      fontSize="sm"
      bg={ isActive ? "blue.700" :"transparent"}
      color={ "whitesmoke"}
      to={to}
      cursor="pointer"
      role="group"
      {...activeProps}
      {...rest}
    
    >
      {icon && <Icon mr="2" boxSize="4" as={icon} />}
      {children}
    </Flex>
  );
};
export default NavItemCollapse;
