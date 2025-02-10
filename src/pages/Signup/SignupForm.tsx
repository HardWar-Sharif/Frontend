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
import FloatField from "../../components/ui/FloatField";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FloatPasswordField } from "../../components/ui/FloatPasswordField";
import { useSignup } from "../../hooks/signup";

interface EmailValues {
  email: string;
}

interface SignupFormValues {
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register: registerEmail,
    handleSubmit: handleEmail,
    formState: { errors: emailErrors },
    getValues: getEmail,
  } = useForm<EmailValues>({ mode: "onSubmit" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });
  const { mutate } = useSignup();

  const sendCodeOrEdit = () => {
    if (!codeSent) {
      if (!emailErrors.email) {
        setShowVerification(true);
        setCodeSent(true);
      }
    } else {
      setShowVerification(false);
      setCodeSent(false);
    }
  };

  const validateVerificationCode = (value: string) => {
    return value == "1234";
  };
  const validateConfirmPassword = (value: string) => {
    return value == getValues("password");
  };

  const signup = () => {
    mutate(
      {
        email: getEmail("email"),
        password: getValues("password"),
      },
      {
        onSuccess: () => console.log("success"),
        onError: () => console.log("error"),
      }
    );
  };

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
        <Stack w="full" gap={0}>
          <Collapsible.Root open={showVerification} unmountOnExit>
            <Flex gap={4} align="end">
              <FloatField
                label="Email"
                formInput={registerEmail("email", {
                  pattern: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
                  required: true,
                })}
                invalid={!!emailErrors.email}
                disabled={codeSent}
              />
              <Collapsible.Trigger>
                <Button
                  size="lg"
                  variant="surface"
                  borderWidth={2}
                  borderColor="red.emphasized"
                  shadow="none"
                  _hover={{ bgColor: "red.emphasized" }}
                  onClick={handleEmail(sendCodeOrEdit)}
                >
                  {!codeSent ? "Send Code" : "Edit Email"}
                </Button>
              </Collapsible.Trigger>
            </Flex>
            {emailErrors.email && (
              <Text fontSize="sm" mt={1} color="red.solid">
                {emailErrors.email.type == "required"
                  ? "Email is required."
                  : "Email is invalid."}
              </Text>
            )}
            <Collapsible.Content mt={3}>
              <FloatField
                label="Verification Code"
                formInput={register("verificationCode", {
                  validate: validateVerificationCode,
                })}
                invalid={!!errors.verificationCode}
                marginTop={3}
              />
              {errors.verificationCode && (
                <Text fontSize="sm" mt={1} color="red.solid">
                  Verification Code is incorrect.
                </Text>
              )}
            </Collapsible.Content>
          </Collapsible.Root>
          <FloatPasswordField
            label="Password"
            {...register("password", { required: true })}
            invalid={!!errors.password}
          />
          {errors.password && (
            <Text fontSize="sm" mt={1} color="red.solid">
              Password is required.
            </Text>
          )}
          <FloatPasswordField
            label="Confirm Password"
            {...register("confirmPassword", {
              validate: validateConfirmPassword,
            })}
            invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <Text fontSize="sm" mt={1} color="red.solid">
              Password Confirmation does not match.
            </Text>
          )}
        </Stack>
      </Card.Body>
      <Card.Footer flexDirection="column" alignItems="flex-start">
        <Flex gap={3}>
          <Button
            variant="solid"
            size="lg"
            onClick={handleSubmit(signup)}
            disabled={!codeSent}
          >
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
          <Link fontSize="sm" onClick={() => navigate("/login")}>
            Log in
          </Link>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};

export default SignupForm;
