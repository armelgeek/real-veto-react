
import Icon from "@chakra-ui/icon";
import { Flex } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import { useLocation, useHistory } from "react-router";

const NavItemChild = (props) => {
  const {
    icon,
    bg,
    to,
    activeProps,
    setCollapse,
    collapse,
    _hover,
    keyCollapse,
    children,
    ...rest
  } = props;

  const location = useLocation();

  const history = useHistory();
  const isActive = location.pathname == to;
  return (
    <Flex
      align="center"
      px="1"
      pl="3"
      py="2"
      fontSize="2sm"
      bg={isActive ? "gray.800" : "gray.900"}
      color={"whitesmoke"}
      fontWeight="normal"
      cursor="pointer"
      role="group"
      {...activeProps}
      {...rest}
      onClick={() => {
        history.push(to, { collapse: collapse, keyCollapse: keyCollapse });
      }}
    >
      {icon && <Icon mr="3" boxSize="3" as={icon} />}

      <chakra.span fontSize={12} color={isActive ? "whitesmoke" : "gray.100"}>
        {children}
      </chakra.span>
    </Flex>
  );
};
export default NavItemChild;
