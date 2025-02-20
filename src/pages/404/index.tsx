import { Box, BoxProps, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      fontFamily="DM Sans"
      overflow="hidden"
      maxWidth="100vw"
      minHeight="100vh"
      position="relative"
      clipPath="inset(0 0 0 0)"
    >
      <Stack justify="center" align="center" m="15vh 5vw 5vh 5vw" gap={10}>
        <SevenSegmentText text="404" />
        <Heading fontSize="4xl" mt={-20}>Page Not Found</Heading>
        <Text fontSize="lg">The page you're looking for cannot be found.</Text>
        <Flex justify="space-between" gap={5}>
          {/* This button should go to profile when already logged in */}
          <Button
            rounded="full" 
            height="64px" 
            width="194px" 
            fontSize="lg" 
            fontWeight="bold" 
            borderWidth="2px"
            color="white"
            onClick={() => navigate("/login")}
            variant='outline' borderColor="colorPalette.600"
          >
            SIGN IN
          </Button>
          <Button
            rounded="full" 
            height="64px" 
            width="194px" 
            fontSize="lg" 
            fontWeight="bold" 
            borderWidth="2px"
            color="white"
            onClick={() => navigate("/")}
          >
            HOME PAGE
          </Button>
        </Flex>
      </Stack>

      <Splash
        top="40vh"
        right="20vw"
        width="55vw"
        height="80vh"
      />
    </Box>
  );
};

const SevenSegmentText = ({ text }: { text: string }) => {
  return (
    <Stack padding={0}>
      <Box
        fontSize="9xl"
        fontFamily="SevenSegment, monospace"
        color="colorPalette.700"
        position="absolute"
        zIndex={1}
        opacity={0.5}
      >
        <MonospaceSevenSegmentText text="888" />
      </Box>
      <Box 
        fontFamily="SevenSegment, monospace"
        fontSize="9xl"
        zIndex={2}
        color="colorPalette.600"
      >
        <MonospaceSevenSegmentText text={text} />
      </Box>
    </Stack>
  );
}

const MonospaceSevenSegmentText = ({ text }: { text: string }) => {
  return (
    <Box
      fontFamily="SevenSegment"
      fontSize="1.5em"
      whiteSpace="pre"
    >
      {text.split("").map((char, index) => (
        <MonospaceCharacter key={index}>{char}</MonospaceCharacter>
      ))}
    </Box>
  );
}

const MonospaceCharacter = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="inline-block" width="1ch" textAlign="right" height="fit-content">
      {children}
    </Box>
  );
}

const Splash: React.FC<BoxProps> = (props) => {
  return (
    <Box
      position="absolute"
      borderRadius="50%"
      bg="colorPalette.900"
      opacity="0.7"
      filter="blur(70px)"
      zIndex="-1"
      overflow="hidden"
      {...props}
    />
  );
};

export default NotFound;
