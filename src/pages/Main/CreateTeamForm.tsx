import FloatField from "@/components/ui/FloatField";
import { Button, Flex } from "@chakra-ui/react";

const CreateTeamForm = () => {
  return (
    <Flex direction="column" w="full" gap={4} alignItems="center">
      <FloatField label="Team Name" formInput={null} />
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
        <Button>Create</Button>
      </Flex>
    </Flex>
  );
};

export default CreateTeamForm;
