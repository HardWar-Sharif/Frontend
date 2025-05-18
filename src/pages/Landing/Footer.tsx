import {
  Flex,
  Stack,
  Image,
  StackProps,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { ReactNode } from "react";
import {
  RiTelegram2Fill,
  RiLinkedinFill,
  RiInstagramLine,
  RiGoogleFill,
} from "react-icons/ri";

const Footer: React.FC<StackProps> = (props) => {
  const { t } = useTranslate();
  return (
    <Flex backgroundColor="colorPalette.900" padding="10px 7%" {...props}>
      <Stack width="100%" gap={4}>
        <Flex justify="space-between" align="center" flexWrap="wrap">
          <Box width={{ base: "100%", md: "70%" }}>
            <Flex gap={6} justifyContent={{ base: "center", md: "flex-start" }}>
              <Logo to="" image="hardwar.svg" />
              <Logo to="" image="Landing/SUT-logo.svg" />
              <Logo to="" image="Landing/SSC-logo.svg" />
            </Flex>
          </Box>

          <Box width={{ base: "100%", md: "30%" }} mt={{ base: 4, md: 0 }}>
            <Flex
              gap="10px"
              justifyContent={{ base: "center", md: "flex-end" }}
            >
              <Bubble
                to="https://t.me/hardwar_sharif"
                image={<RiTelegram2Fill />}
              />
              <Bubble
                to="https://instagram.com/hardwar_sharif"
                image={<RiInstagramLine />}
              />
              <Bubble
                to="mailto:hardwarsharif@gmail.com"
                image={<RiGoogleFill />}
              />
              <Bubble
                to="https://linkedin.com/company/hardwar"
                image={<RiLinkedinFill />}
              />
            </Flex>
          </Box>
        </Flex>

        <Box height="1px" width="100%" backgroundColor="colorPalette.500" />

        <Flex justify="space-around">
          <Text fontSize="sm">© {t("description.copyright")}</Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

const Logo = ({ to, image }: { to: string; image: string }) => {
  return (
    <Link href={to} _focus={{ boxShadow: "none", outline: "none" }}>
      <Image
        src={image}
        h="60px"
        cursor="pointer"
        _hover={{
          opacity: 0.8,
        }}
      />
    </Link>
  );
};

const Bubble = ({ to, image }: { to: string; image: ReactNode }) => {
  return (
    <Link href={to} _focus={{ boxShadow: "none", outline: "none" }}>
      <Box
        color="gray.300"
        _hover={{ opacity: "0.8" }}
        borderColor="gray.300"
        borderWidth={1}
        rounded="full"
        p={2}
        fontSize="2xl"
        _focus={{ boxShadow: "none", outline: "none" }}
      >
        {image}
      </Box>
    </Link>
  );
};

export default Footer;
