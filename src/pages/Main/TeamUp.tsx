import {
  Alert,
  Button,
  Card,
  Center,
  Flex,
  GridItem,
  Separator,
  SimpleGrid,
  Spinner,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import CreateTeamForm from "./CreateTeamForm";
import JoinTeamForm from "./JoinTeamForm";
import { useGetMyTeam } from "@/hooks/my-team";
import { useLeaveTeam } from "@/hooks/leave-team";
import { toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCopyOutline } from "react-icons/io5";

const Team = () => {
  const [isLeaveLoading, setIsLeaveLoading] = useState<boolean>(false);
  const { data: team, refetch } = useGetMyTeam();
  const { mutate } = useLeaveTeam();
  const clipboard = useClipboard({ value: team?.data?.code });

  const leaveTeam = () => {
    setIsLeaveLoading(true);
    mutate(undefined, {
      onSuccess: () => {
        refetch();
        setIsLeaveLoading(false);
      },
      onError: () => {
        toaster.create({
          title: "Leave Team Error",
          type: "error",
        });
        setIsLeaveLoading(false);
      },
    });
  };

  const NoTeam = (
    <>
      <Alert.Root status="warning" mb={4}>
        <Alert.Indicator />
        <Alert.Title>
          Currently, you don't have a team. create your own team or join one.
        </Alert.Title>
      </Alert.Root>
      <SimpleGrid
        w="full"
        h="full"
        columns={24}
        justifyItems="center"
        alignItems="center"
      >
        <GridItem
          colSpan={{ base: 24, md: 12 }}
          w="full"
          justifyItems="center"
          mb={{ base: 4, md: 0 }}
        >
          <img
            src="/team/no-team.svg"
            alt="no team"
            style={{ height: "230px" }}
          />
        </GridItem>
        <GridItem colSpan={{ base: 24, md: 12 }} w="full">
          <CreateTeamForm refetch={refetch} />
          <Separator borderColor="red.emphasized" my={4} />
          <JoinTeamForm refetch={refetch} />
        </GridItem>
      </SimpleGrid>
    </>
  );

  const hasTeam = (
    <>
      <SimpleGrid
        w="full"
        h="full"
        columns={24}
        justifyItems="center"
        mt={2}
        alignItems="center"
      >
        <GridItem
          colSpan={{ base: 24, md: 12 }}
          w="full"
          justifyItems="center"
          mb={{ base: 4, md: 0 }}
        >
          <img src="/team/team.svg" alt="team" style={{ height: "230px" }} />
        </GridItem>
        <GridItem colSpan={{ base: 24, md: 12 }} w="full">
          {team?.data && (
            <Alert.Root status="info" p={2} mb={2} alignItems="center">
              <Alert.Indicator />
              <Alert.Title width="full">
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>Code: {team.data.code}</Text>
                  <Button
                    onClick={clipboard.copy}
                    variant="outline"
                    size="xs"
                    borderWidth={2}
                  >
                    {clipboard.copied ? (
                      <IoCheckmarkOutline />
                    ) : (
                      <IoCopyOutline />
                    )}
                  </Button>
                </Flex>
              </Alert.Title>
            </Alert.Root>
          )}
          {team?.data &&
            team.data?.members_details.map((member: TeamMember) => (
              <Card.Root
                p={2}
                size="lg"
                mb={2}
                borderColor="red.emphasized"
                borderWidth={2}
              >
                <Flex direction="column">
                  <Text color="red.500">{`${member.first_name} ${member.last_name}`}</Text>
                  <Text color="red.300">{member.email}</Text>
                </Flex>
              </Card.Root>
            ))}
          <Flex justifyContent="end">
            <Button variant="outline" borderWidth={2} onClick={leaveTeam}>
              {isLeaveLoading && <Spinner size="sm" />} Leave Team
            </Button>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </>
  );

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
            {team?.status == 204 ? "Team Up" : team?.data.name}
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>{team?.status == 204 ? NoTeam : hasTeam}</Card.Body>
    </Card.Root>
  );
};

export default Team;
