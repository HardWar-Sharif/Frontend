import {
  Heading,
  Text,
  Stack,
  StackProps,
  Flex,
  Image,
  Grid,
  Box,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";

const About: React.FC<StackProps> = (props) => {
  const { t } = useTranslate();

  const items = [
    {
      imagePath: "Landing/Participant.svg",
      title: t("title.competition"),
      text: t("landing.competition"),
    },
    {
      imagePath: "Landing/Participant.svg",
      title: t("title.workshop"),
      text: t("landing.workshop"),
    },
    {
      imagePath: "Landing/Participant.svg",
      title: t("title.prize"),
      text: t("landing.prize"),
    },
    {
      imagePath: "Landing/Participant.svg",
      title: t("title.resume"),
      text: t("landing.resume"),
    },
  ];

  return (
    <Stack width="100%" textAlign="center" gap={4} {...props}>
      <Heading size="4xl" fontWeight="bold">
        {t("title.about_hardwar")}
      </Heading>
      <Text fontSize="lg" padding="0 10%">
        {t("landing.about_hardwar")}
      </Text>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        templateRows={{ base: "repeat(4, 1fr)", md: "repeat(2, 1fr)" }}
        gap={4}
        width="100%"
        padding="0 15%"
        placeItems="center"
      >
        {items.map((item, index) => (
          <AboutItem
            key={index}
            imagePath={item.imagePath}
            title={item.title}
            text={item.text}
          />
        ))}
      </Grid>
    </Stack>
  );
};

const AboutItem = ({
  imagePath,
  title,
  text,
}: {
  imagePath: string;
  title: string;
  text: string;
}) => {
  return (
    <Box
      width={{ base: "70vw", md: "35vw" }}
      backgroundColor="colorPalette.900"
      padding="10% 5%"
      borderRadius="30px"
    >
      <Flex gap={6}>
        <Image src={imagePath} w="50px" h="50px" />
        <Stack align="start" gap={6} pe={8}>
          <Heading fontWeight="bold" fontSize="xl">
            {title}
          </Heading>
          <Text textAlign="justify" fontSize="md" opacity="0.8">
            {text}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
