import { Box, Text } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import NavBar from "../../components/ui/NavBar"

const Landing = () => {
  const { t } = useTranslate();

  //Temparory. Only for testing the navbar.
  return <Box><NavBar fontFamily="DM Sans" position="fixed" backgroundColor="black"/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><Box id="contact" pt="60px"> {/* Contact Section */}
  <Text fontSize="2xl">Contact Section</Text>
</Box><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></Box>
};

export default Landing;
