import {
  Alert,
  Card,
  Center,
  GridItem,
  // Image,
  Separator,
  SimpleGrid,
} from "@chakra-ui/react";
import CreateTeamForm from "./CreateTeamForm";
import JoinTeamForm from "./JoinTeamForm";

const Team = () => {
  return (
    <Card.Root
      size="lg"
      overflowY="scroll"
      scrollbar={{ md: "hidden" }}
      h={{ base: "72vh", md: "60vh" }}
      mb={{ base: "100px", md: "5vh" }}
      borderColor="red.emphasized"
      bgColor="bg"
      shadow="0 0 60px var(--shadow-color)"
      shadowColor="red.subtle"
      borderWidth={2}
    >
      <Center>
        <Card.Header>
          <Card.Title
            fontSize={36}
            color="red.solid"
            textShadow="0 0 20px var(--shadow-color)"
            shadowColor="red.solid"
          >
            Team Up
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>
        <Alert.Root status="warning">
          <Alert.Indicator />
          <Alert.Title>
            Currently, you don't have a team. create your own team or join one.
          </Alert.Title>
        </Alert.Root>
        <img src="/src/assets/images/no-team.svg" alt="no team" style={{height: "200px"}} />
        <SimpleGrid w="full" h="full" columns={25} justifyItems="center" mt={4}>
          <GridItem colSpan={12} w="full">
            <CreateTeamForm />
          </GridItem>
          <GridItem colStart={13}>
            <Separator orientation="vertical" borderColor="red.emphasized" />
          </GridItem>
          <GridItem colSpan={12} w="full">
            <JoinTeamForm />
          </GridItem>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export default Team;
