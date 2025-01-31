import { Text, Heading, Flex, Stack, Image, StackProps, HeadingProps } from "@chakra-ui/react";
import Timer from "./Timer";

const Title: React.FC<StackProps> = (props) => {
  return (
    <Flex justify={{base: "flex-end", md: "space-between"}} align="center" flexWrap="wrap">
      <Stack gap={30} width={{ base: "100%", md: "60%" }} padding="calc(100px + 10%) 10%" justifySelf="flex-start" {...props}>
        <HardWarTitle id="about"/>
        <Description />
        <Info />
        <Timer />
      </Stack>
      <Flex justify="flex-end" width={{ base: "100%", md: "40%" }} height="100%" alignSelf="flex-end" mt={{ base: 6, md: 0 }}>
        <Image src="Landing/Arduino.svg" />
      </Flex>
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

export default Title;