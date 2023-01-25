import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import NoWorkspaceView from "components/NoWorkspaceView/NoWorkspaceView";
import Spinner from "components/Spinner/Spinner";
import Moment from "react-moment";
import { separateWithComma } from "utils/helpers";
import "moment-timezone";

export default function GeneralStats({ statsLoading, stats, workstationId }) {
  if (statsLoading)
    return (
      <HStack pt={4} justify="center">
        <Spinner />
      </HStack>
    );

  const totalCounts = [
    { name: "All Workstations", value: stats?.workstations },
    { name: "All Teams", value: stats?.teams },
    { name: "All Users", value: stats?.users?.registered },
  ];

  return (
    <Stack spacing={8} pt={4}>
      <Stack pt={8} direction={["column", "column", "row"]}>
        {stats &&
          !workstationId &&
          totalCounts.map(({ name, value }) => (
            <Stack
              border="1px solid"
              w="full"
              flexShrink={0}
              maxW={["full", "full", 60]}
              p={4}
              shadow="md"
              spacing={1}
              rounded={4}
              borderColor="gray.200"
            >
              <Text color="gray.500">{name}</Text>
              <HStack justify="space-between">
                <Heading fontSize="5xl">{value?.all}</Heading>
              </HStack>
            </Stack>
          ))}
      </Stack>
      <Stack direction={["column", "column", "row"]}>
        <Stack
          border="1px solid"
          w="full"
          pt={4}
          shadow="md"
          rounded={4}
          borderColor="gray.200"
        >
          <Stack px={4} spacing={1}>
            <Text color="gray.500">Paid Visits</Text>
            <HStack justify="space-between">
              <Heading fontSize="5xl">
                {stats?.visits.paid}
                <Box as="span" color="gray.500" fontSize="3xl">
                  {" "}
                  / {stats?.visits.all}
                </Box>
              </Heading>

              <Badge colorScheme="green" rounded="full" px={2}>
                {(stats?.visits.paid / stats?.visits.all).toFixed(2) * 100}%
              </Badge>
            </HStack>
          </Stack>

          <Box pt={1} w="full">
            <Box
              w={`${
                (stats?.visits.paid / stats?.visits.all).toFixed(2) * 100
              }%`}
              h={1}
              bg="primary.500"
            />
          </Box>
        </Stack>
        <Stack
          border="1px solid"
          w="full"
          p={4}
          shadow="md"
          spacing={1}
          rounded={4}
          borderColor="gray.200"
        >
          <Text color="gray.500">Ongoing Check-ins</Text>
          <HStack justify="space-between">
            <Heading fontSize="5xl">
              {stats?.visits.all - stats?.visits.checked_out}
            </Heading>
          </HStack>
        </Stack>
      </Stack>
      <Stack direction={["column", "column", "row"]}>
        <Stack
          border="1px solid"
          w="full"
          maxW={["full"]}
          p={4}
          shadow="md"
          spacing={1}
          rounded={4}
          borderColor="gray.200"
        >
          <Text color="gray.500">Total Revenue Generated</Text>
          <HStack justify="space-between">
            <Heading fontSize="5xl">
              N{separateWithComma(stats?.revenue?.generated.total)}
            </Heading>
          </HStack>
        </Stack>

        <Stack
          border="1px solid"
          w="full"
          maxW={["full"]}
          p={4}
          shadow="md"
          spacing={1}
          rounded={4}
          borderColor="gray.200"
        >
          <Text color="gray.500">Base Share / Workstation Share</Text>
          <HStack justify="space-between">
            <Heading fontSize="5xl">
              N{" "}
              {separateWithComma(
                Number(stats?.revenue?.generated.base_share).toFixed(0)
              )}
              /
              {separateWithComma(
                Number(stats?.revenue?.generated.workstation_share).toFixed(0)
              )}
            </Heading>
          </HStack>
        </Stack>
      </Stack>
      <Stack
        border="1px solid"
        w="full"
        maxW={["full"]}
        p={4}
        shadow="md"
        spacing={1}
        rounded={4}
        borderColor="gray.200"
      >
        <Text color="gray.500">Base Share Paid / Workstation Share Paid</Text>
        <HStack justify="space-between">
          <Heading fontSize="5xl">
            N
            {separateWithComma(
              Number(stats?.revenue?.paid.base_share).toFixed(0)
            )}
            /
            {separateWithComma(
              Number(stats?.revenue?.paid.workstation_share).toFixed(0)
            )}
          </Heading>
        </HStack>
      </Stack>
    </Stack>
  );
}
