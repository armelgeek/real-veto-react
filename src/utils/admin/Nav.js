import React from "react";
import PropTypes from "prop-types";
import { Flex, Box, Text, Heading,Divider } from "@chakra-ui/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  chakra,
} from "@chakra-ui/react";
import {  InfoIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import {useDisclosure} from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
function GuideModal({isOpen,onOpen,onClose,title,guide,tip}){
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <chakra.small size="sm" color="gray.400">
            Guide d'utilisation
          </chakra.small>
          <Heading textTransform="uppercase" color="blue.700" size="md">
            {title}
          </Heading>
          <Divider my={2}/>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            width={"100%"}
          >
            <Heading size="md" my={2}>
              {tip}
            </Heading>
            {guide}

          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
function Nav({ title,tip="", list, guide, to,backTo, icon,...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Flex
        p={3}
        mb={2}
        borderBottom={"1px"}
        borderColor="blue.700"
        bg="white"
        boxShadow="lg"
        alignItems="center"
        justifyContent={guide ? "space-between":"flex-end"}
      >
        {guide && <Button size="sm" onClick={onOpen} color="white" on aria-label="Cliquer ici pour avoir plus d'information sur la page">  <InfoIcon mr={1} color={"white"} fontSize="12px"  /> Guide d'utilisation </Button>}
        <GuideModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} title={title} tip={tip} guide={guide}/>
        <Box>
          <Breadcrumb spacing="8px">
           {/** {to != "/" && ( */}
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink as={NavLink} to={to}>
                    Accueil {" > "}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem ml={1} isCurrentPage>
                  <BreadcrumbLink href="#">{title}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            {/**)} */}
          </Breadcrumb>
        </Box>
      </Flex>
      <Flex px={4} mr={2} 
        mt={4} {...props} flexDir="column" justifyContent="flex-start">
        {backTo &&
        <Box mt={3}>
          <Button py={2} mx={1} as={NavLink} colorScheme="facebook" size="sm" color="white" to={backTo}>
           {"<<"} Revenir en arriere
          </Button>
        </Box>}
        {list && 
        <Box  mt={4} mb={1} >
          <Heading size="md" textTransform="uppercase"  color={"blue.700"}>
            {title || "Titre de la page"}
          </Heading>

        </Box>
        }
      </Flex>
    </>
  );
}

export default Nav;
