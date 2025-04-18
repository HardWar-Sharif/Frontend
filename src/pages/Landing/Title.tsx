import {
  Text,
  Heading,
  Flex,
  Stack,
  Image,
  StackProps,
  HeadingProps,
} from "@chakra-ui/react";
import Timer from "./Timer";
import { useTranslate } from "@tolgee/react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Title: React.FC<StackProps> = (props) => {
  return (
    <Flex
      justify={{ base: "center", md: "space-between" }}
      align="center"
      flexWrap="wrap"
      id="hardwar"
    >
      <Stack
        gap={30}
        width={{ base: "100%", md: "60%" }}
        padding="10% 10%"
        justifySelf="flex-start"
        {...props}
      >
        <HardWarTitle />
        <Description />
        <Info />
        <Timer />
      </Stack>
      <Flex
        justify="center"
        width={{ base: "100%", md: "40%" }}
        height="100%"
        alignSelf="center"
        mt={{base: 5, md: 48}}
      >
        <Image src="Landing/Raspberry_Pi.svg" width="90%" />
      </Flex>
    </Flex>
  );
};

const HardWarTitle: React.FC<HeadingProps> = (props) => {
  const { t } = useTranslate();
  return (
    <Heading
      as="h1"
      size="7xl"
      textShadow="0 0 5px #ff0000ff, 0 0 10px #ff0000a0, 0 0 20px #ff000060"
      color="white"
      fontWeight="700"
      {...props}
    >
      {t("title.hardwar")}
    </Heading>
  );
};

const Description: React.FC<HeadingProps> = (props) => {
  const { t } = useTranslate();
  return (
    <Heading as="h3" size="xl" color="white" {...props} textAlign="justify">
      {t("landing.intro")}
    </Heading>
  );
};

const Info: React.FC<StackProps> = (props) => {
  const { t } = useTranslate();
  return (
    <Stack {...props}>
      <Flex justify="flex-start" align="center" gap={2}>
        <FaMapMarkerAlt />
        <Text color="gray.300" fontSize="1.1em">
          {t("landing.location")}
        </Text>
      </Flex>

      <Flex justify="flex-start" align="center" gap={2}>
        <FaCalendarAlt />
        <Text color="gray.300" fontSize="1.1em">
          {t("landing.date")}
        </Text>
      </Flex>
    </Stack>
  );
};

export default Title;
