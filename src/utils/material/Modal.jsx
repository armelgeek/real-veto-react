import React from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
function Modal({ title, addText, size, children,footer, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button size="xs" colorScheme="facebook" onClick={onOpen}>
        {addText}
      </Button>
      <ChakraModal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading textTransform="uppercase" color="blue.700" size={"md"}>
              {title}
            </Heading>
            <Divider my={2} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width={"100%"}>{children}</Box>
          </ModalBody>
          <ModalFooter>
            {footer}
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}

export default Modal;
