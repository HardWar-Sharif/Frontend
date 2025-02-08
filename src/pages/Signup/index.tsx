import { Box, Flex } from "@chakra-ui/react";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <Box
      fontFamily="DM Sans"
      overflow="hidden"
      maxWidth="100vw"
      position="relative"
      clipPath="inset(0 0 0 0)"
    >
      <Flex justify="center" align="center" mt="25vh">
        <SignupForm />
      </Flex>
    </Box>
  );
};

export default Signup;
