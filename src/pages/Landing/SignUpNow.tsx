import {
  Heading,
  Flex,
  Stack,
  Image,
  StackProps,
  HeadingProps,
  useToken,
  Button,
} from "@chakra-ui/react";
import Timer from "./Timer";
import { useTranslate } from "@tolgee/react";
import { useNavigate } from "react-router";

const SignUpNow: React.FC<StackProps> = (props) => {
  const stripColor = useToken("colors", "colorPalette.900");
  const { t } = useTranslate();
  const navigate = useNavigate();

  return (
    <Flex
      justify="space-around"
      align="center"
      flexWrap="wrap"
      background={`linear-gradient(to bottom, transparent 28%, ${stripColor} 28%, ${stripColor} 72%, transparent 72%)`}
    >
      <Stack
        gap={30}
        width={{ base: "100%", md: "40%" }}
        padding="calc(100px + 10%) 5%"
        height="100%"
        justifySelf={"flex-start"}
        {...props}
      >
        <Title id="about" />
        <Timer />
        <Flex justify="space-around">
          <Button
            rounded="full"
            height={{base: "43px", md: "56px"}}
            width={{base: "98px", md: "125px"}}
            fontSize="md"
            fontWeight="bold"
            borderWidth="2px"
            onClick={() => navigate("/signup")}
            disabled
          >
            {t("label.signup")}
          </Button>
        </Flex>
      </Stack>
      <Flex
        justify="space-around"
        width={{ base: "100%", md: "50%" }}
        height="100%"
        mt={{ base: 6, md: 0 }}
        display={{ base: "none", md: "flex" }}
      >
        <Image src="Landing/Arduino-full.svg" />
      </Flex>
    </Flex>
  );
};

const Title: React.FC<HeadingProps> = (props) => {
  const { t } = useTranslate();
  return (
    <Heading
      as="h1"
      size={{ base: "4xl", md: "6xl" }}
      textShadow="0 0 5px #ff0000ff, 0 0 10px #ff0000a0, 0 0 20px #ff000060"
      color="white"
      fontWeight="700"
      whiteSpace="nowrap"
      zIndex={2}
      textAlign={{ base: "center", md: "left" }} // ← add this
      {...props}
    >
      {t("title.signup")}
    </Heading>
  );
};

export default SignUpNow;
