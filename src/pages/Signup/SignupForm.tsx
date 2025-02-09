import {
  Button,
  Card,
  Center,
  Collapsible,
  Flex,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import FloatField from "./FloatField";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const navigate = useNavigate();

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
                  variant="surface"
                  borderWidth={2}
                  borderColor="red.emphasized"
                  shadow="none"
                  _hover={{ bgColor: "red.emphasized" }}
                  onClick={() => setShowVerification(true)}
                >
                  Send Code
                </Button>
              </Collapsible.Trigger>
            </Flex>
            <Collapsible.Content mt={3}>
              <FloatField label="Verification Code" marginTop={3} />
            </Collapsible.Content>
          </Collapsible.Root>
          <FloatField label="Password" />
          <FloatField label="Repeat Password" />
        </Stack>
      </Card.Body>
      <Card.Footer flexDirection="column" alignItems="flex-start">
        <Flex gap={3}>
          <Button variant="solid" size="lg">
            Sign Up
          </Button>
          <Button
            variant="outline"
            size="lg"
            borderWidth={2}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Flex>
        <Flex align="center" gap={1}>
          <Text color="red.solid" fontSize="sm">
            Already have an account?
          </Text>
          <Link fontSize="sm">Log in</Link>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default SignupForm;
