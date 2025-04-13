import FloatField from "@/components/ui/FloatField";
import { Button, Flex } from "@chakra-ui/react";

const JoinTeamForm = () => {
  return (
    <Flex direction="column" w="full" gap={4} alignItems="center">
      <FloatField label="Team Code" formInput={null} />
      <Flex>
        <Button>Join</Button>
      </Flex>
    </Flex>
  );
};

export default JoinTeamForm;
