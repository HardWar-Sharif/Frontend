import FloatField from "@/components/ui/FloatField";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useJoinTeam } from "@/hooks/join-team";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
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
  const { t } = useTranslate();

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
    <>
      <Flex direction="column" w="full" gap={4} alignItems="center">
        <FloatField
          label={t("label.team_code")}
          formInput={register("teamCode", {
            required: true,
          })}
          invalid={!!errors.teamCode}
        />
        {errors.teamCode && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {t("message.required", {
              field: t("label.team_code"),
            })}
          </Text>
        )}
        <Flex>
          <Button onClick={handleSubmit(join)}>
            {isPending && <Spinner size="sm" />} {t("label.join")}
          </Button>
        </Flex>
      </Flex>
      <Toaster />
    </>
  );
};

export default JoinTeamForm;
