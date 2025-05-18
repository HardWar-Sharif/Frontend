import { useGetProfile } from "@/hooks/get-profile";
import { useHasPaid } from "@/hooks/has-paid";
import { useGetMyTeam } from "@/hooks/my-team";
import { usePay } from "@/hooks/pay";
import {
  Alert,
  Text,
  Card,
  Center,
  Flex,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { StepsRoot, StepsList, StepsItem } from "@/components/ui/steps";
import { useTranslate } from "@tolgee/react";
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/stores/language";
import { getFullName } from "@/utils/full-name";

const Dashboard = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: payment, isLoading: paymentLoading } = useHasPaid();
  const { data: team, isLoading: teamLoading } = useGetMyTeam();
  const language = useLanguageStore((state) => state.language);
  const { mutate } = usePay();
  const [step, setStep] = useState<number>(0);
  const { t } = useTranslate();

  const pay = () => {
    mutate(
      {
        discount_code: "",
      },
      {
        onSuccess: (response) => {
          window.location.href = `https://payment.zarinpal.com/pg/StartPay/${response.data.authority}`;
        },
      }
    );
  };

  useEffect(() => {
    if (!profileLoading && !paymentLoading && !teamLoading) {
      if (team?.status == 200) setStep(3);
      else if (payment?.has_paid) setStep(2);
      else if (profile?.is_completed) setStep(1);
      else setStep(0);
    }
  }, [profile, payment, team]);

  return (
    <Card.Root
      size="lg"
      overflowY="scroll"
      scrollbar={{ md: "hidden" }}
      h={{ base: "72vh", md: "60vh" }}
      mb={{ base: "100px", md: "5vh" }}
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
            {t("label.dashboard")}
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>
        {profileLoading || paymentLoading || teamLoading ? (
          <Skeleton height="200px" />
        ) : (
          <>
            <StepsRoot
              step={step}
              count={3}
              mb={4}
              size={{ base: "sm", md: "md" }}
            >
              <StepsList>
                <StepsItem index={0} title={t("label.profile2")} />
                <StepsItem index={1} title={t("label.pay")} />
                <StepsItem index={2} title={t("label.team")} />
              </StepsList>
            </StepsRoot>
            <Card.Root
              px={6}
              py={4}
              size="lg"
              mb={4}
              borderColor="red.emphasized"
              borderWidth={2}
            >
              <Flex direction="column" gap={2}>
                <Text color="red.500" fontSize={{ base: "md", md: "xl" }}>{`${t(
                  "label.email"
                )}: ${profile.email}`}</Text>
                <Text color="red.300" fontSize={{ base: "md", md: "xl" }}>{`${t(
                  "label.name"
                )}: ${getFullName(
                  language,
                  profile,
                  profile.is_completed
                )}`}</Text>
                <Text color="red.300" fontSize={{ base: "md", md: "xl" }}>{`${t(
                  "label.team_name"
                )}: ${
                  team?.status == 200
                    ? team.data.name
                    : language == "en"
                    ? "???"
                    : "؟؟؟"
                }`}</Text>
              </Flex>
            </Card.Root>
            {payment?.has_paid ? (
              <Alert.Root
                borderWidth={2}
                borderColor="red.solid"
                status="success"
                variant="surface"
                size={{ base: "md", md: "lg" }}
                colorPalette="red"
              >
                <Alert.Indicator />
                <Alert.Title>{t("message.has_paid")}</Alert.Title>
              </Alert.Root>
            ) : (
              <Button
                size={{ base: "md", md: "lg" }}
                variant="outline"
                borderWidth={2}
                borderColor="red.emphasized"
                _hover={{ backgroundColor: "red.emphasized" }}
                onClick={pay}
              >
                {t("label.pay")}
              </Button>
            )}
          </>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default Dashboard;
