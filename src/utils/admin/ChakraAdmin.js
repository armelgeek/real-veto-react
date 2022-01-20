import {
  chakra,
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,AvatarBadge
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import {  FiMenu } from "react-icons/fi";
import Icon from "@chakra-ui/icon";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
//import { logout } from "../../../store/actions/user";
import { useDispatch } from "react-redux";
export default function ChakraAdmin({ children,title,mini, sidemenu }) {
  const sidebar = useDisclosure();
  const dispatch = useDispatch();
  const SidebarContent = (props) => (
    <Box
      data-tour="step-1"
      boxShadow="sm"
      as="nav"
      pos="fixed"
      bg={useColorModeValue("gray.700", "brand.500")}
      // color={useColorModeValue("brand.500", "white")}
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      w="52"
      {...props}
    >
      <Flex
        px="4"
        h="10"
        position="relative"
        bg={useColorModeValue("gray.700", "dark")}
        align="center"
        boxShadow="lg"
      >
        <Text fontSize="md" ml="2" fontWeight="semibold">
          <chakra.span color="white" textTransform="uppercase">{title || "ADMINIS"}</chakra.span>
          <chakra.span color="blue.500" textTransform="uppercase">{mini || "TRATION"}</chakra.span>
        </Text>
      </Flex>
      <Flex
        mt={5}
        direction="column"
        as="nav"
        fontSize="sm"
        color={"white"}
        aria-label="Main Navigation"
      >
        {sidemenu}
      </Flex>
      
    </Box>
  );
  return (
    <Box as="section" minH="100vh" boxShadow="md">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Flex align="center" justifyContent="flex-start">
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement="left"
        >
          <DrawerOverlay />
          <DrawerContent>
            <SidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
      </Flex>
      <Box ml={{ base: 0, md: 52 }} transition=".3s ease">
        <Flex
          bg={useColorModeValue("gray.700", "dark")}
          as="header"
          boxShadow="lg"
          align="center"
          justify="flex-end"
          w="full"
          px="4"
          h="10"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
          <Flex align="center" justifyContent="flex-end">
            <Box cursor="pointer">
              <Menu>
                <MenuButton as={Box} colorScheme="pink">
                  <Avatar
                    name="anubra266"
                    src="https://avatars.githubusercontent.com/u/30869823?s=460&u=7fee47eb223768507a386694806007e3a248dad4&v=4"
                    size="xs"
                  >
                    <AvatarBadge boxSize="1.25em" bg="green.500" />
                  </Avatar>
                  <Icon mx={1} as={IoIosArrowDown} />
                </MenuButton>
                <MenuList>
                  <MenuItem color={"gray.800"}>Utilisateur</MenuItem>
                  <MenuItem
                    color={"gray.800"}
                 /*   onClick={() => {
                      dispatch(logout());
                    }}*/
                  >
                    Deconnexion
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </Flex>
        <Box as="main" pos="relative">
          {children}
        </Box>
        <Box
          pos="fixed"
          bg="gray.700"
          color="white"
          bottom={3}
          right={3}
          mt="2"
          px="4"
        >
          Copyright © 2021 . Tous les droits réservés. 💖 Miray Geek
        </Box>
      </Box>
    </Box>
  );
}
