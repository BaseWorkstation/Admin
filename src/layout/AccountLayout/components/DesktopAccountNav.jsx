import { HStack, Icon, Show, Stack, Text } from "@chakra-ui/react";
import { Logo } from "components/Logo";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { IoHeadsetOutline, IoHeadsetSharp } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { accountMenuOptions } from "utils/constants";

export default function DesktopAccountNav() {
  const { asPath } = useRouter();

  const onSupportPath = asPath === "/account/support";

  return (
    <Show above="lg">
      <Stack
        pos="fixed"
        h="100vh"
        flexShrink={0}
        justify="space-between"
        bg="white"
        w={224}
        pb={20}
        pt={8}
        px={10}
      >
        <Stack spacing={87}>
          <Logo w={68} />
          <Stack spacing={43}>
            {accountMenuOptions
              .slice(0, 4)
              .map(({ name, href, lineIcon, filledIcon }) => {
                const isSelected = asPath === href;
                return (
                  <Link key={href} href={href}>
                    <HStack cursor="pointer" spacing={6}>
                      <Icon
                        fontSize={22}
                        as={isSelected ? filledIcon : lineIcon}
                        color={isSelected ? "primary.500" : "blue.800"}
                      />
                      <Text
                        color={isSelected ? "primary.500" : "blue.800"}
                        fontWeight={isSelected ? 500 : 400}
                      >
                        {name}
                      </Text>
                    </HStack>
                  </Link>
                );
              })}
          </Stack>
        </Stack>

        <Stack spacing={8}>
          <HStack
            onClick={() => Router.push("/login")}
            cursor="pointer"
            spacing={6}
          >
            <Icon fontSize={22} as={RiLogoutCircleLine} color="blue.800" />
            <Text color="blue.800">Logout</Text>
          </HStack>
        </Stack>
      </Stack>
    </Show>
  );
}
