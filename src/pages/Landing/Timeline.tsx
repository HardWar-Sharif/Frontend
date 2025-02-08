import { Flex, Box, Text, Image, Heading, FlexProps } from '@chakra-ui/react';
import React from 'react';

const TimelineItem = ({ imagePath, title, date, text, isLast }: {imagePath: string, title: string, date: string, text: string, isLast: boolean}) => {
  return (
    <Flex>
      <Box position="relative" width="100px" mr={4} display="flex">
        {!isLast && (
          <Box
            position="absolute"
            top="0"
            bottom="0"
            left="50%"
            right="0"
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
        <Heading size="3xl" color="colorPalette.500" fontWeight="bold">{title}</Heading>
        <Heading size="xl" color="gray.600" fontWeight="bold">{date}</Heading>

        <Text fontSize="xl" color="colorPalette.700">{text}</Text>
      </Box>
    </Flex>
  );
};

const Timeline:React.FC<FlexProps> = (props) => {
  const items = [
    {
      imagePath: 'Landing/Timeline-icon.svg',
      title: 'Test',
      date: 'May 23rd, 2025',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
    {
      imagePath: 'Landing/Timeline-icon.svg',
      title: 'Test',
      date: 'May 23rd, 2025',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
    {
      imagePath: 'Landing/Timeline-icon.svg',
      title: 'Test',
      date: 'May 23rd, 2025',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
    {
      imagePath: 'Landing/Timeline-icon.svg',
      title: 'Test',
      date: 'May 23rd, 2025',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
  ];

  return (
    <Flex justify={{base: "flex-end", md: "space-between"}} align="top" flexWrap="wrap" mt="100px" {...props}>
      <Box padding="50px 0 0 12%" width={{ base: "100%", md: "50%" }}>
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
      <Flex width={{ base: "100%", md: "50%" }} height="100%" padding="50px 10%" alignSelf="center" justify="center" mt={{ base: 6, md: 0 }}>
        <Image src="Landing/Raspberry.svg" alignSelf="center" />
      </Flex>
    </Flex>
    
  );
};
  
export default Timeline;