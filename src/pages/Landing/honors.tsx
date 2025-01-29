import { Heading, Text, Stack, StackProps, Flex, Image, Grid, Box } from "@chakra-ui/react";

const Honors: React.FC<StackProps> = (props) => {
  const items = [
    {
      imagePath: 'Landing/Participant.svg',
      title: 'PARTICIPANTS',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
    {
      imagePath: 'Landing/Participant.svg',
      title: 'PARTICIPANTS',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
    {
      imagePath: 'Landing/Participant.svg',
      title: 'PARTICIPANTS',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
    {
      imagePath: 'Landing/Participant.svg',
      title: 'PARTICIPANTS',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, hic quis? Voluptate quibusdam temporibus odio eos consectetur quae, ipsam id voluptatum sunt in recusandae facilis laborum neque pariatur iure molestias?',
    },
  ];

  return (
    <Stack width="100%" textAlign="center" gap={4} {...props}>
      <Heading size="4xl" fontWeight="bold">
        Statistics and Honors
      </Heading>
      <Text fontSize="lg" padding="0 10%">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse eveniet eum debitis voluptates nam. 
      </Text>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        templateRows={{ base: 'repeat(4, 1fr)', md: 'repeat(2, 1fr)' }} 
        gap={4}
        width="100%"
        padding="0 15%"
        placeItems="center"
      >
        {items.map((item, index) => (
          <HonorItem
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

const HonorItem = ({ imagePath, title, text }: { imagePath: string, title: string, text: string }) => {
  return (
    <Box
    width={{base: "70vw", md: "35vw"}}
    backgroundColor="colorPalette.900"
    padding="10% 5%"
    borderRadius="30px"
    >
      <Flex gap={6}>
        <Image src={imagePath} w="50px" h="50px" />
        <Stack align="start" gap={6}>
          <Heading fontWeight="bold" fontSize="lg" >
            {title}
          </Heading>
          <Text textAlign="start" fontSize="lg">
            {text}
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Honors;