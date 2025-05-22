import { useGetProfile } from "@/hooks/get-profile";
import { useGetMyTeam } from "@/hooks/my-team";
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
import PaymentForm from "./PaymentForm";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: team, isLoading: teamLoading } = useGetMyTeam();
  const language = useLanguageStore((state) => state.language);
  const [step, setStep] = useState<number>(0);
  const { t } = useTranslate();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profileLoading) {
      if (profile?.has_team) setStep(3);
      else if (profile?.has_paid) setStep(2);
      else if (profile?.is_completed) setStep(1);
      else setStep(0);
    }
  }, [profile]);

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
        {profileLoading || teamLoading ? (
          <Skeleton height="300px" />
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
            <Button onClick={() => navigate("/questions")} mb={4}>
              {t("label.questions")}
            </Button>
            <Card.Root
              px={6}
              py={4}
              size="lg"
              mb={6}
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
                {profile.has_team && (
                  <Text
                    color="red.300"
                    fontSize={{ base: "md", md: "xl" }}
                  >{`${t("label.team_name")}: ${team?.data.name}`}</Text>
                )}
              </Flex>
            </Card.Root>
            {!profile?.is_completed ? (
              <Alert.Root
                borderWidth={2}
                borderColor="red.solid"
                status="success"
                variant="surface"
                size={{ base: "md", md: "lg" }}
                colorPalette="red"
              >
                <Alert.Indicator />
                <Alert.Title>{t("message.before_pay")}</Alert.Title>
              </Alert.Root>
            ) : profile?.has_paid ? (
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
              <PaymentForm />
            )}
          </>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default Dashboard;
