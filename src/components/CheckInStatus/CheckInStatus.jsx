import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function CheckInStatus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentCheckIn, loading } = useSelector((state) => state.spaces);

  if (!currentCheckIn) return null;

  return (
    <>
      <Modal isCentered size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent border="2px solid" borderColor="gray.500" px={0}>
          <ModalBody px={0} pt={10} pb={20}>
            <VStack px={4} pb={4}>
              <Text
                color="blue.800"
                fontWeight="bold"
                fontSize={20}
                textAlign="center"
              >
                You're about to checkout from Venia Business Hub
              </Text>
            </VStack>
            <Divider borderColor="gray.400" />
            <VStack px={4} pt={10} spacing={12}>
              <Heading fontSize={48} color="primary.500" fontWeight={500}>
                01:00:35
              </Heading>

              <Link href="/check-out">
                <Button
                  w={250}
                  h={57}
                  rounded={20}
                  colorScheme="default"
                  bg="red.300"
                >
                  Yes. Check out
                </Button>
              </Link>

              <Button
                onClick={onClose}
                rounded={20}
                variant="link"
                colorScheme="default"
              >
                No, i'm still working
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <HStack
        pos="fixed"
        bottom={28}
        zIndex={20}
        left={0}
        w="full"
        justify="center"
      >
        <Flex w="fit-content">
          <Button
            onClick={onOpen}
            w={250}
            h={57}
            colorScheme="default"
            bg="red.300"
          >
            01:00:35 &nbsp; Check out
          </Button>
        </Flex>
      </HStack>
    </>
  );
}