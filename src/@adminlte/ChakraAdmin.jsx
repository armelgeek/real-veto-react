import {
    chakra,
    Badge,
    Avatar,
    Box,
    Collapse,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    useColorMode,
    Text,
    useColorModeValue,
    useDisclosure,
  } from '@chakra-ui/react';
  import { FaBell, FaClipboardCheck, FaHome, FaRss } from 'react-icons/fa';
  import { BiCircle } from 'react-icons/bi';
  import { AiFillGift } from 'react-icons/ai';
  import { BsGearFill } from 'react-icons/bs';
  import { FiMenu, FiSearch } from 'react-icons/fi';
  import { HiCode, HiCollection } from 'react-icons/hi';
  import {
    MdAccessAlarms,
    MdAddCircleOutline,
    MdCallReceived,
    MdDashboard,
    MdHome,
    MdKeyboardArrowRight,
  } from 'react-icons/md';
  import React from 'react';
  import { AvatarBadge } from '@chakra-ui/avatar';
  import { NavLink, useLocation } from 'react-router-dom';
  import { ColorModeSwitcher } from '../ColorModeSwitcher';
  
  export default function ChakraAdmin({ children }) {
    const sidebar = useDisclosure();
    const integrations = useDisclosure();
    const location = useLocation();
    const { colorMode, toggleColorMode } = useColorMode();
    const NavItem = props => {
      const { icon, bg, to, activeProps, _hover, children, ...rest } = props;
      const isActive = location.pathname == to;
      return (
        <Flex
          as={to ? NavLink : chakra.div}
          align="center"
          mx="2"
          px="2"
          pl="4"
          py="2"
          mb="1"
          bg={isActive ? 'teal.500' : 'transparent'}
          color={isActive && 'whiteAlpha.800'}
          fontWeight="normal"
          to={to}
          cursor="pointer"
          role="group"
          borderRadius="md"
          fontWeight="semibold"
          transition=".15s ease"
          {...activeProps}
          {...rest}
        >
          {icon && <Icon mr="1" boxSize="6" as={icon} />}
          {children}
        </Flex>
      );
    };
    const NavItemChild = props => {
      const { icon, bg, to, activeProps, _hover, children, ...rest } = props;
      const isActive = location.pathname == to;
      return (
        <Flex
          as={to ? NavLink : chakra.div}
          align="center"
          mx="2"
          px="1"
          mb="1"
          pl="4"
          py="2"
          bg={isActive ? 'teal.500' : 'transparent'}
          color={isActive && 'whiteAlpha.800'}
          fontWeight="normal"
          to={to}
          cursor="pointer"
          role="group"
          borderRadius="md"
          fontWeight="semibold"
          transition=".15s ease"
          {...activeProps}
          {...rest}
        >
          {icon && <Icon mr="2" boxSize="4" as={icon} />}
          {children}
        </Flex>
      );
    };
  
    const SidebarContent = props => (
      <Box
        boxShadow="sm"
        as="nav"
        pos="fixed"
        bg={useColorModeValue('whitesmoke', 'brand.500')}
        // color={useColorModeValue("brand.500", "white")}
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        borderRightWidth="1px"
        w="60"
        {...props}
      >
        <Flex px="4" borderBottomWidth="1px" h="14" align="center">
          <Text fontSize="xl" ml="2" fontWeight="semibold">
            ADMINIS<chakra.span color="teal.500">TRATION</chakra.span>
          </Text>
        </Flex>
        <Flex p="6" bg={'teal.500'} flexDir="row" mb={3} borderBottomWidth="1px">
          <Avatar
            size="md"
            name="Oshigaki Kisame"
            src="https://avatars.githubusercontent.com/u/30869823?v=4"
          />
          <Box ml={3}>
            <Text 
            fontSize="md" 
            color={"white"}
            mb={0} 
            fontWeight="semibold">
              Armel wanes
            </Text>
            <Badge variant="subtle">ADMIN</Badge>
          </Box>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="sm"
          color={useColorModeValue('gray.500', 'white')}
          aria-label="Main Navigation"
        >
          <NavItem icon={MdDashboard} to="/">
            Tableau de bord
          </NavItem>
          <NavItem icon={MdAccessAlarms} onClick={integrations.onToggle}>
            Articles
            <Icon
              as={MdKeyboardArrowRight}
              ml="auto"
              transform={integrations.isOpen && 'rotate(90deg)'}
            />
          </NavItem>
          <Collapse in={integrations.isOpen}>
            <NavItemChild to={'/article'} icon={BiCircle}>
              Shopify
            </NavItemChild>
            <NavItemChild icon={BiCircle}>Slack</NavItemChild>
            <NavItemChild icon={BiCircle}>Slack</NavItemChild>
          </Collapse>
        </Flex>
      </Box>
    );
    return (
      <Box as="section" minH="100vh">
        <SidebarContent display={{ base: 'none', md: 'unset' }} />
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
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
          <Flex
            as="header"
            align="center"
            justify="flex-end"
            w="full"
            px="4"
            borderBottomWidth="1px"
            h="14"
          >
            <IconButton
              aria-label="Menu"
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={sidebar.onOpen}
              icon={<FiMenu />}
              size="sm"
            />
            <Flex align="center" justifyContent="flex-end">
              <Avatar
                ml="4"
                size="sm"
                name="anubra266"
                src="https://avatars.githubusercontent.com/u/30869823?v=4"
                cursor="pointer"
              />
  
              <ColorModeSwitcher />
            </Flex>
          </Flex>
          <Box as="main" pos="relative">
            {children}
          </Box>
          <Box pos="absolute" bottom={3} right={3} mr="1" px="4">
            Copyright © {new Date().getFullYear()} . Tous les droits réservés. 💖
            Miray Geek
          </Box>
        </Box>
      </Box>
    );
  }