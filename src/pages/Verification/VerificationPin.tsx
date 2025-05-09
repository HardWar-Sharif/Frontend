import { Toaster, toaster } from "@/components/ui/toaster";
import { useSendCode } from "@/hooks/send-code";
import { useVerify } from "@/hooks/verify";
import { verificationTimer } from "@/utils/verification-timer";
import {
  Button,
  Field,
  Flex,
  PinInput,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const inputStyles = {
  color: "red.fg",
  borderColor: "red.focusRing",
  fontSize: "2xl",
};

interface VerificationPinValues {
  verificationCode: number;
}

const VerificationPin = () => {
  const [timer, setTimer] = useState<number>(120);
  const [isCounting, setIsCounting] = useState<boolean>(true);
  const { mutate: codeMutate, isPending: codePending } = useSendCode();
  const { mutate: verifyMutate } = useVerify();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<VerificationPinValues>({ mode: "onSubmit" });

  useEffect(() => {
    let intervalId: number;
    if (isCounting) {
      intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(intervalId);
            setIsCounting(false);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isCounting]);

  const sendCode = () => {
    codeMutate(undefined, {
      onSuccess: () => {
        setTimer(120);
        setIsCounting(true);
        toaster.create({ title: "Code sent successfully", type: "success" });
      },
      onError: (data) => {
        toaster.create({ title: data.message, type: "error" });
      },
    });
  };

  const verify = () => {
    verifyMutate(
      {
        verification_code: String(getValues("verificationCode")),
      },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
        onError: (err) => {
          toaster.create({ title: err.message, type: "error" });
        },
      }
    );
  };

  return (
    <>
      <Stack gap={4} mb={1}>
        <Field.Root>
          <Controller
            control={control}
            name="verificationCode"
            rules={{ required: true }}
            render={({ field }) => (
              <PinInput.Root
                size="2xl"
                onValueChange={({ value }) => {
                  if (!value.some((digit) => digit == ""))
                    field.onChange(Number(value.join("")));
                }}
              >
                <PinInput.HiddenInput />
                <PinInput.Control>
                  <Flex gap={4}>
                    <PinInput.Input index={0} {...inputStyles} />
                    <PinInput.Input index={1} {...inputStyles} />
                    <PinInput.Input index={2} {...inputStyles} />
                    <PinInput.Input index={3} {...inputStyles} />
                    <PinInput.Input index={4} {...inputStyles} />
                  </Flex>
                </PinInput.Control>
              </PinInput.Root>
            )}
          />
        </Field.Root>
        {errors.verificationCode && (
          <Text fontSize="sm" mt={1} color="red.solid">
            Enter the code completely.
          </Text>
        )}
        <Flex justifyContent="end" gap={2}>
          <Button
            size="sm"
            variant="surface"
            disabled={timer > 0}
            onClick={sendCode}
          >
            {codePending && <Spinner size="sm" />}{" "}
            {timer <= 0 ? "Resend Code" : verificationTimer(timer)}
          </Button>
          <Button size="sm" variant="surface" onClick={handleSubmit(verify)}>
            Verify
          </Button>
        </Flex>
      </Stack>
      <Toaster />
    </>
  );
};

export default VerificationPin;
