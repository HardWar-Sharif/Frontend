import { Box, Flex, Heading, Stack, Image, Text, BoxProps } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";


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
  const { t } = useTranslate();
  return (
    <Stack gap={7}>
      <Flex justify="center">
        <Heading size="4xl" fontWeight="700" textAlign="center" padding={4}>{t('staff.team.' + team)}</Heading>
      </Flex>
      <Flex
        wrap="wrap"
        justify="center"
        gap={{base: "15px", md: "30px"}}
        mx={{base: "4%", md: "10%"}}
        align="stretch"
        id="lol"
      >
        {members.map((item, index) => (
          <Box key={index} flex={{base: "0 1 110px", md: "0 1 210px"}} display="flex" marginY={2}>
            <StaffItem
              image={item.image}
              subtitle={item.subtitle}
              name={item.name}
            />
          </Box>
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
  const { t } = useTranslate();
  const imageSize = {"md": "180px", "base": "90px"};
  return (
    <Box
      width={{ base: `110px`, md: "210px" }}
      backgroundColor="colorPalette.900"
      padding={{ md: "15px", base: "10px" }}
      borderRadius="xl"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      height="100%"
    >
      <Image src={image} w={imageSize} h={imageSize} borderRadius="xl" />
      <Heading
        fontWeight="bold"
        fontSize={{ md: "md", base: "small" }}
        textAlign="center"
        lineHeight="shorter"
        my={3}
      >
        {t("staff.name." + name)}
      </Heading>
      <Text
        fontSize={{ md: "sm", base: "2xs" }}
        textAlign="center"
        lineHeight="shorter"
      >
        {subtitle ? t("staff." + subtitle) : ""}
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