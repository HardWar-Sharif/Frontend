import FloatField from "@/components/ui/FloatField";
import { toaster } from "@/components/ui/toaster";
import { useJoinTeam } from "@/hooks/join-team";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface JoinTeamFormProps {
  refetch: () => void;
}

interface JoinTeamValues {
  teamCode: string;
}

const JoinTeamForm = ({ refetch }: JoinTeamFormProps) => {
  const { mutate, isPending } = useJoinTeam();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<JoinTeamValues>({ mode: "onSubmit" });

  const join = () => {
    mutate(getValues("teamCode"), {
      onSuccess: () => {
        refetch();
      },
      onError: () =>
        toaster.create({
          title: "Team Creation Error",
          type: "error",
        }),
    });
  };

  return (
    <Flex direction="column" w="full" gap={4} alignItems="center">
      <FloatField
        label="Team Code"
        formInput={register("teamCode", {
          required: true,
        })}
        invalid={!!errors.teamCode}
      />
      {errors.teamCode && (
        <Text fontSize="sm" mt={1} color="red.solid">
          Team Code is required.
        </Text>
      )}
      <Flex>
        <Button onClick={handleSubmit(join)}>
          {isPending && <Spinner size="sm" />} Join
        </Button>
      </Flex>
    </Flex>
  );
};

export default JoinTeamForm;
