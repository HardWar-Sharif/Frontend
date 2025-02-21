import { Box, Flex, Heading, Stack, Image, Text, BoxProps } from "@chakra-ui/react";


interface Member {
  name: string;
  subtitle: string;
  image: string;
}

interface TeamProps {
  team: string;
  members: Member[];
}

const StaffSection: React.FC<TeamProps> = ({ team, members }) => {
  return (
    <Stack gap={7}>
      <Flex justify="center">
        <Heading size="4xl" fontWeight="700">{team}</Heading>
      </Flex>
      <Flex justify="center" align="center" gap={10} wrap="wrap" mx="10%" alignItems="flex-start">
        {members.map((item, index) => (
          <StaffItem
            key={index}
            image={item.image}
            subtitle={item.subtitle}
            name={item.name}
          />
        ))}
      </Flex>

      <Splash top="40vh" left="-10vw" width="20vw" height="40vh" />
      <Splash top="80vh" right="-10vw" width="15vw" height="30vh" />
      <Splash top="170vh" right="-35vw" width="35vw" height="30vh" />
      <Splash top="260vh" left="-10vw" width="20vw" height="40vh" />
      <Splash top="280vh" right="-10vw" width="15vw" height="30vh" />
      
    </Stack>
  );
}

const StaffItem: React.FC<Member> = ({ name, subtitle, image }) => { 
  const imageSize = {"md": "180px", "base": "90px"};
  return (
    <Box
    width={210}
    backgroundColor="colorPalette.900"
    padding={{"md": "15px", "base": "10px"}}
    borderRadius="xl"
    alignItems="center"
    display="inline-block"
    w={{"md": "210px", "base": "110px"}}
    mx={-2}
    >
      <Image src={image} w={imageSize} h={imageSize} borderRadius="xl" />
      <Heading fontWeight="bold" fontSize={{"md": "md", "base": "small"}} textAlign="center" lineHeight="shorter" my={3} >
        {name}
      </Heading>
      <Text textAlign="start" fontSize={{"md": "sm", "base": "2xs"}} textAlignLast="center" lineHeight="shorter">
        {subtitle}
      </Text>
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
      filter="blur(60px)"
      zIndex="-1"
      overflow="hidden"
      {...props}
    />
  );
};

export default StaffSection;