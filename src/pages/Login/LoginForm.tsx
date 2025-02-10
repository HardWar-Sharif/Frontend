import {
  Button,
  Card,
  Center,
  Flex,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import FloatField from "../../components/ui/FloatField";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FloatPasswordField } from "../../components/ui/FloatPasswordField";
import { useLogin } from "../../hooks/login";
import { toaster, Toaster } from "@/components/ui/toaster";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormValues>({ mode: "onSubmit" });
  const { mutate } = useLogin();

  const login = () => {
    mutate(
      {
        email: getValues("email"),
        password: getValues("password"),
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("AuthToken", `auth ${data.token}`)
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
              Login
            </Card.Title>
          </Card.Header>
        </Center>
        <Card.Body>
          <Stack w="full" gap={0}>
            <FloatField
              label="Email"
              formInput={register("email", {
                pattern: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
              })}
              invalid={!!errors.email}
            />
            {errors.email && (
              <Text fontSize="sm" mt={1} color="red.solid">
                Email is invalid.
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
          </Stack>
        </Card.Body>
        <Card.Footer flexDirection="column" alignItems="flex-start">
          <Flex gap={3}>
            <Button variant="solid" size="lg" onClick={handleSubmit(login)}>
              Login
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
              Don't have an account?
            </Text>
            <Link fontSize="sm" onClick={() => navigate("/signup")}>
              Signup
            </Link>
          </Flex>
        </Card.Footer>
      </Card.Root>
      <Toaster />
    </>
  );
};

export default LoginForm;
