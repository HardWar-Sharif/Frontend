import { Box, Flex } from "@chakra-ui/react";
import VerificationPin from "./VerificationPin";

const Verification = () => {
  return (
    <Box
      overflow="hidden"
      maxWidth="100vw"
      position="relative"
      clipPath="inset(0 0 0 0)"
    >
      <Flex justify="center" align="center" mt="40vh">
        <VerificationPin />
      </Flex>
    </Box>
  );
};

export default Verification;
