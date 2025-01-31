import { Box, Text, Flex, Stack } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import useTimer from "../../components/ui/timer";

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

export default Timer;