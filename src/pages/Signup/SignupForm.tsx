import {
  Button,
  Card,
  Center,
  Collapsible,
  Flex,
  Stack,
} from "@chakra-ui/react";
import FloatField from "./FloatField";
import { useState } from "react";

const SignupForm = () => {
  const [showVerification, setShowVerification] = useState<boolean>(false);

  return (
    <Card.Root
      size="lg"
      w="35vw"
      minW="500px"
      mb="5vh"
      borderColor="red.emphasized"
      bgColor="bg"
      shadow="0 0 60px var(--shadow-color)"
      shadowColor="red.subtle"
    >
      <Center>
        <Card.Header>
          <Card.Title
            fontSize={36}
            color="red.solid"
            textShadow="0 0 20px var(--shadow-color)"
            shadowColor="red.solid"
          >
            Signup
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>
        <Stack gap="4" w="full">
          <Collapsible.Root open={showVerification} unmountOnExit>
            <Flex gap={4} align="end">
              <FloatField label="Email" />
              <Collapsible.Trigger>
                <Button
                  size="lg"
                  variant="subtle"
                  onClick={() => setShowVerification(true)}
                >
                  Send Code
                </Button>
              </Collapsible.Trigger>
            </Flex>
            <Collapsible.Content mt={3}>
              <FloatField label="Email Verification" marginTop={3} />
            </Collapsible.Content>
          </Collapsible.Root>
          <FloatField label="Password" />
          <FloatField label="Repeat Password" />
        </Stack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end" gap={3}>
        <Button variant="outline" size="lg">
          Cancel
        </Button>
        <Button variant="solid" size="lg">
          Sign Up
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default SignupForm;
