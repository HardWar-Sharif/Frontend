import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router";

const MainPage = () => {
  return (
    <Box
      fontFamily="DM Sans"
      overflow="hidden"
      maxWidth="100vw"
      position="relative"
      clipPath="inset(0 0 0 0)"
    >
      <Flex justify="center" align="center" mt="25vh">
        <Outlet />
      </Flex>
    </Box>
  );
};

export default MainPage;
