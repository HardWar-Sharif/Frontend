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

          <Box width={{ base: "100%", md: "30%" }}>
            <Flex
              gap="10px"
              justifyContent={{ base: "center", md: "flex-end" }}
            >
              <Bubble to="" image="Landing/Instagram.svg" />
              <Bubble to="" image="Landing/Linked-in.svg" />
              <Bubble to="" image="Landing/Instagram.svg" />
              <Bubble to="" image="Landing/Linked-in.svg" />
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
    <Link href={to}>
      <Image
        src={image}
        h={image == "hardwar.svg" ? `80px` : `60px`}
        cursor="pointer"
        _hover={{
          opacity: 0.8,
        }}
      />
    </Link>
  );
};

const Bubble = ({ to, image }: { to: string; image: string }) => {
  return (
    <Link href={to}>
      <Image
        src={image}
        h="45px"
        cursor="pointer"
        _hover={{
          opacity: 0.8,
        }}
      />
    </Link>
  );
};

export default Footer;
