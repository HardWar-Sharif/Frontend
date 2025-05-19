import FloatField from "@/components/ui/FloatField";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useCreateTeam } from "@/hooks/create-team";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useForm } from "react-hook-form";

interface CreateTeamFormProps {
  refetch: () => void;
}

interface CreateTeamValues {
  teamName: string;
}

const CreateTeamForm = ({ refetch }: CreateTeamFormProps) => {
  const { mutate, isPending } = useCreateTeam();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CreateTeamValues>({ mode: "onSubmit" });
  const { t } = useTranslate();

  const create = () => {
    mutate(
      {
        name: getValues("teamName"),
      },
      {
        onSuccess: (data) => {
          console.log("success", data);
          refetch();
        },
        onError: () =>
          toaster.create({
            title: "Team Creation Error",
            type: "error",
          }),
      }
    );
  };

  return (
    <>
      <Flex direction="column" w="full" gap={4} alignItems="center">
        <FloatField
          label={t("label.team_name")}
          formInput={register("teamName", {
            required: true,
          })}
          invalid={!!errors.teamName}
        />
        {errors.teamName && (
          <Text fontSize="sm" mt={1} color="red.solid">
            {t("message.required", {
              field: t("label.team_name"),
            })}
          </Text>
        )}
        {/* <FileUpload.Root gap="1" maxWidth="300px">
        <FileUpload.HiddenInput />
        <FileUpload.Label>Upload file</FileUpload.Label>
        <Input asChild>
          <FileUpload.Trigger>
            <FileUpload.FileText />
          </FileUpload.Trigger>
        </Input>
      </FileUpload.Root> */}
        <Flex>
          <Button onClick={handleSubmit(create)}>
            {isPending && <Spinner size="sm" />} {t("label.create")}
          </Button>
        </Flex>
      </Flex>
      <Toaster />
    </>
  );
};

export default CreateTeamForm;
