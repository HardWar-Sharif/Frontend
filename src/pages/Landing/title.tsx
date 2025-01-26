import { Box, Text, Heading, Flex, Stack, Image, StackProps, HeadingProps } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import useTimer from "../../components/ui/timer";

const Title: React.FC<StackProps> = (props) => {
  return (
    <Flex justify="space-between" align="center" flexWrap="wrap">
      <Stack gap={30} width={{ base: "100%", md: "60%" }} padding="calc(100px + 10%) 10%" {...props}>
        <HardWarTitle id="about"/>
        <Description />
        <Info />
        <Timer />
      </Stack>
      <Box width={{ base: "100%", md: "auto" }} height="100%" alignSelf="flex-end" mt={{ base: 6, md: 0 }}>
        <Image src="Landing/Arduino.svg" />
      </Box>
    </Flex>
    
  );
}

const HardWarTitle: React.FC<HeadingProps> = (props) => {
  return (
    <Heading
      as="h1"
      size="7xl"
      textShadow="0 0 5px #ff0000ff, 0 0 10px #ff0000a0, 0 0 20px #ff000060"
      color="white"
      fontWeight="700"
      {...props}
    >
      HardWar
    </Heading>
  );
}

const Description: React.FC<HeadingProps> = (props) => {
  return (
    <Heading
      as="h3"
      size="xl"
      color="white"
      {...props}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo nostrum perferendis nihil. Aut illo tenetur, quas ipsa provident, non iusto vero excepturi nostrum necessitatibus porro ad omnis consectetur eveniet officiis.
    </Heading>
  );
}

const Info: React.FC<StackProps> = (props) => {
  return (
    <Stack {...props}>
      <Flex
        justify="flex-start"
        align="center"
        gap={2}
      >
        <Image src="Landing/Location.svg" w="14px" margin="2px"/>
        <Text color="gray.300" fontSize="1.1em">
          Sharif University of Technology - Tehran, Iran
        </Text>
      </Flex>

      <Flex
        justify="flex-start"
        align="center"
        gap={2}
      >
        <Image src="Landing/Calendar.svg" w="18px" margin="0px"/>
        <Text color="gray.300" fontSize="1.1em">
          Apr 6th, 2023 -Apr 9th, 2023
        </Text>
      </Flex>
    </Stack>
  );
}

const Timer = () => {
  return (
    <Flex justify="space-between" align="center" dir="ltr">
      <TimeComponent type="day"/>
      <Text fontFamily="SevenSegment" fontSize="6xl" color="colorPalette.500">:</Text>
      <TimeComponent type="hour"/>
      <Text fontFamily="SevenSegment" fontSize="6xl" color="colorPalette.500">:</Text>
      <TimeComponent type="min"/>
      <Text fontFamily="SevenSegment" fontSize="6xl" color="colorPalette.500">:</Text>
      <TimeComponent type="sec"/>
    </Flex>
  );
}

const TimeComponent = ({type}: {type: "day" | "hour" | "min" | "sec"}) => {
  const timer = useTimer();
  const numConvertor = {
    "day": timer.days.toString().padStart(2, '0'),
    "hour": timer.hours.toString().padStart(2, '0'),
    "min": timer.minutes.toString().padStart(2, '0'),
    "sec": timer.seconds.toString().padStart(2, '0')
  };
  const textConvertor = {
    "day": "timer.days",
    "hour": "timer.hours",
    "min": "timer.minutes",
    "sec": "timer.seconds"
  };

  const num = numConvertor[type];
  const text = textConvertor[type];
  const { t } = useTranslate();

  return (
    <Stack align="center">
      <SevenSegmentText text={num} />
      <Text mt={-8} fontSize="small" fontWeight="lighter">
        {t(text)}
      </Text>
    </Stack>
  );
}

const SevenSegmentText = ({ text }: { text: string }) => {
  return (
    <Stack padding={0}>
      <Box
        fontSize="5xl"
        fontFamily="SevenSegment, monospace"
        color="colorPalette.700"
        position="absolute"
        zIndex={1}
        opacity={0.5}
      >
        <MonospaceSevenSegmentText text="88" />
      </Box>
      <Box 
        fontFamily="SevenSegment, monospace"
        fontSize="5xl"
        zIndex={2}
        color="colorPalette.500"
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
      fontSize="7xl"
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

export default Title;