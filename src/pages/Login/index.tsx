import { Box, Flex } from "@chakra-ui/react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Box
      fontFamily="DM Sans"
      overflow="hidden"
      maxWidth="100vw"
      position="relative"
      clipPath="inset(0 0 0 0)"
    >
      <Flex justify="center" align="center" mt="25vh">
        <LoginForm />
      </Flex>
    </Box>
  );
};

export default Login;
