import {
  Button,
  Card,
  Center,
  Flex,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import FloatField from "../../components/ui/FloatField";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FloatPasswordField } from "../../components/ui/FloatPasswordField";
import { useSignup } from "../../hooks/signup";
import { toaster, Toaster } from "@/components/ui/toaster";
import { validateConfirmPassword } from "@/utils/validations";
import { useAuthStore } from "@/stores/auth";

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignupFormValues>({ mode: "onSubmit" });
  const setToken = useAuthStore((state) => state.setToken);
  const { mutate, isPending } = useSignup();

  const signup = () => {
    mutate(
      {
        email: getValues("email"),
        password: getValues("password"),
      },
      {
        onSuccess: (data) => {
          setToken(data.token);
          navigate("/dashboard");
        },
        onError: () =>
          toaster.create({
            title: "Signup Error",
            type: "error",
          }),
      }
    );
  };

  return (
    <>
      <Card.Root
        size="lg"
        w={{ base: "90vw", sm: "70vw", md: "55vw", lg: "35vw" }}
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
            <FloatField
              label="Email"
              formInput={register("email", {
                pattern: {
                  value: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email is invalid.",
                },
                required: "Email is required.",
              })}
              invalid={!!errors.email}
            />
            {errors.email && (
              <Text fontSize="sm" mt={1} color="red.solid">
                {errors.email.message}
              </Text>
            )}
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
                validate: (value) =>
                  validateConfirmPassword(value, getValues("password")),
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
            <Button variant="solid" size="lg" onClick={handleSubmit(signup)}>
              {isPending && <Spinner size="sm" />} Sign Up
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
      <Toaster />
    </>
  );
};

export default SignupForm;
