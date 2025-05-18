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
import { useAuthStore } from "@/stores/auth";
import { useTranslate } from "@tolgee/react";

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
  const setToken = useAuthStore((state) => state.setToken);
  const { mutate } = useLogin();
  const { t } = useTranslate();

  const login = () => {
    mutate(
      {
        email: getValues("email"),
        password: getValues("password"),
      },
      {
        onSuccess: (data) => {
          setToken(data.token);
          navigate(data.is_verified ? "/dashboard" : "/verify");
        },
        onError: () =>
          toaster.create({
            title: "Login Error",
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
              {t("label.login")}
            </Card.Title>
          </Card.Header>
        </Center>
        <Card.Body>
          <Stack w="full" gap={0}>
            <FloatField
              label={t("label.email")}
              formInput={register("email", {
                pattern: /^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/,
              })}
              invalid={!!errors.email}
            />
            {errors.email && (
              <Text fontSize="sm" mt={1} color="red.solid">
                {t("message.invalid", { field: t("label.email") })}
              </Text>
            )}
            <FloatPasswordField
              label={t("label.password")}
              {...register("password", { required: true })}
              invalid={!!errors.password}
            />
            {errors.password && (
              <Text fontSize="sm" mt={1} color="red.solid">
                {t("message.required", { field: t("label.password") })}
              </Text>
            )}
          </Stack>
        </Card.Body>
        <Card.Footer flexDirection="column" alignItems="flex-start">
          <Flex gap={3}>
            <Button variant="solid" size="lg" onClick={handleSubmit(login)}>
              {t("label.login")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              borderWidth={2}
              onClick={() => navigate("/")}
            >
              {t("label.cancel")}
            </Button>
          </Flex>
          <Flex align="center" gap={1}>
            <Text color="red.solid" fontSize="sm">
              {t("question.no_account")}
            </Text>
            <Link fontSize="sm" onClick={() => navigate("/signup")}>
              {t("label.signup")}
            </Link>
          </Flex>
        </Card.Footer>
      </Card.Root>
      <Toaster />
    </>
  );
};

export default LoginForm;
