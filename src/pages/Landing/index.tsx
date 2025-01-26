import { Box, BoxProps } from "@chakra-ui/react";
import NavBar from "../../components/ui/NavBar";
import Title from "./title"
import Organizers from "./Organizers";

const Landing = () => {
  return (
    <Box fontFamily="DM Sans" overflow="hidden" maxWidth="100vw" position="relative" clipPath="inset(0 0 0 0)">
      <NavBar position="fixed" backgroundColor="black" zIndex={3}/>
      <Title/>
      <Organizers mt="20vh"/>
      <Splash  top="20vh" left="-15vw" width="50vw" height="50vh"/>
      <Splash  top="70vh" right="0vw" width="50vw" height="70vh" transform="translateX(20vw)"/>
    </Box>
  );
};

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
}


export default Landing;
