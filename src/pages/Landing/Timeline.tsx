import { useLanguageStore } from "@/stores/language";
import { Flex, Box, Image, Heading, FlexProps } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import React from "react";

const TimelineItem = ({
  imagePath,
  title,
  date,
  isLast,
}: {
  imagePath: string;
  title: string;
  date: string;
  text: string;
  isLast: boolean;
  }) => {
  const { language } = useLanguageStore();
  
  return (
    <Flex>
      <Box position="relative" width="100px" mr={4} display="flex">
        {!isLast && (
          <Box
            position="absolute"
            top="0"
            bottom="0"
            left={language == "fa" ? "0" : "50%"}
            right={language == "fa" ? "50%" : "0"}
            width="1px"
            height="100%"
            bgColor="gray.500"
          />
        )}
        <Box
          width="47px"
          position="absolute"
          top="0%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
          display="flex"
        >
          <Image
            src={imagePath}
            boxSize="47px"
            borderRadius="full"
            bgColor="colorPalette.1000"
            alt="Timeline icon"
          />
        </Box>
      </Box>

      <Box flex={1} mb={8} transform="translate(-30px, -20px)">
        <Heading size="3xl" color="colorPalette.500" fontWeight="bold">
          {title}
        </Heading>
        <Heading size="xl" color="gray.600" fontWeight="bold">
          {date}
        </Heading>
        {/* <Text fontSize="xl" color="colorPalette.700">{text}</Text> */}
      </Box>
    </Flex>
  );
};

const Timeline: React.FC<FlexProps> = (props) => {
  const { t } = useTranslate();
  const items = [
    {
      imagePath: "Landing/Timeline-icon.svg",
      title: t("title.opening"),
      date: t("landing.opening.time"),
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?",
    },
    {
      imagePath: "Landing/Timeline-icon.svg",
      title: t("title.first_day"),
      date: t("landing.first_day.time"),
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?",
    },
    {
      imagePath: "Landing/Timeline-icon.svg",
      title: t("title.second_day"),
      date: t("landing.second_day.time"),
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?",
    },
    {
      imagePath: "Landing/Timeline-icon.svg",
      title: t("title.closing"),
      date: t("landing.closing.time"),
      text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?",
    },
  ];

  return (
    <Flex
      justify={{ base: "flex-end", md: "center" }}
      align="center"
      flexWrap="wrap"
      mt="100px"
      {...props}
    >
      <Box width={{ base: "100%", md: "50%" }}>
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            imagePath={item.imagePath}
            title={item.title}
            date={item.date}
            text={item.text}
            isLast={index === items.length - 1}
          />
        ))}
      </Box>
      <Flex
        width={{ base: "60%", md: "30%" }}
        height="100%"
        alignSelf="center"
        justify="center"
        mt={{ base: 6, md: 0 }}
      >
        <Image src="Landing/Raspberry.svg" alignSelf="center" width="70%" />
      </Flex>
    </Flex>
  );
};

export default Timeline;
