import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import PageLoadingAnimation from "components/PageLoadingAnimation/PageLoadingAnimation";
import Spinner from "components/Spinner/Spinner";
import AccountLayout from "layout/AccountLayout/AccountLayout";
import "moment-timezone";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";
import { AiOutlineCalendar } from "react-icons/ai";
import Moment from "react-moment";
import GeneralStats from "./components/GeneralStats";
import useStatsHook from "./useStatsHook";

export default function Stats() {
  const {
    startDay,
    setStartDay,
    endDay,
    setEndDay,
    statsLoading,
    generalStats,
  } = useStatsHook();

  return (
    <AccountLayout>
      <Stack
        border="1px solid"
        bg="white"
        borderColor="gray.200"
        rounded={16}
        minH="lg"
        p={[5, 5, 8]}
      >
        <Box pos="relative">
          <HStack
            pos="absolute"
            spacing={2}
            right={[0, 0, 10]}
            left={[0, "auto"]}
          >
            <Menu isLazy placement="bottom-end" gutter={4}>
              {({ onClose }) => (
                <>
                  <MenuButton as={HStack} cursor="pointer">
                    <HStack>
                      <Icon
                        color="primary.500"
                        size="sm"
                        variant="default"
                        as={AiOutlineCalendar}
                        fontSize="lg"
                      />
                      <Text fontWeight={500} fontSize="sm">
                        <Moment format="MMMM D, YYYY ">{startDay}</Moment>
                      </Text>
                    </HStack>
                  </MenuButton>
                  <MenuList p={4}>
                    <DayPicker
                      onDayClick={(day) => {
                        setStartDay(day);
                        onClose();
                      }}
                      startDays={startDay}
                      formatDate={formatDate}
                      parseDate={parseDate}
                      disabledDays={{ after: new Date() }}
                      hideOnDayClick={true}
                    />
                  </MenuList>
                </>
              )}
            </Menu>

            <Text>-</Text>

            <Menu isLazy placement="bottom-end" gutter={4}>
              {({ onClose }) => (
                <>
                  <MenuButton as={HStack} cursor="pointer">
                    <HStack>
                      <Text fontWeight={500} fontSize="sm">
                        <Moment format="MMMM D, YYYY ">{endDay}</Moment>
                      </Text>
                    </HStack>
                  </MenuButton>
                  <MenuList p={4}>
                    <DayPicker
                      onDayClick={(day) => {
                        setEndDay(day);
                        onClose();
                      }}
                      startDays={endDay}
                      formatDate={formatDate}
                      parseDate={parseDate}
                      disabledDays={{ after: new Date() }}
                      hideOnDayClick={true}
                    />
                  </MenuList>
                </>
              )}
            </Menu>
          </HStack>
        </Box>

        <GeneralStats stats={generalStats} statsLoading={statsLoading} />
      </Stack>
    </AccountLayout>
  );
}
