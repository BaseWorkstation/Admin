import React from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { withAuth } from "utils/withAuth";
import Stats from "modules/Activities/Stats";

function AccountActivitiesPage() {
  return (
    <Box>
      <Head>
        <title>Workspace activities - Base</title>
      </Head>
      <Stats />
    </Box>
  );
}

export default withAuth(AccountActivitiesPage);
