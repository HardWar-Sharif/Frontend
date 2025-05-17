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

const Dashboard = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: payment, isLoading: paymentLoading } = useHasPaid();
  const { data: team, isLoading: teamLoading } = useGetMyTeam();
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
                )}: ${
                  profile?.is_completed
                    ? `${profile.first_name} ${profile.last_name}`
                    : "???"
                }`}</Text>
                <Text color="red.300" fontSize={{ base: "md", md: "xl" }}>{`${t(
                  "label.team_name"
                )}: ${team?.status == 200 ? team.data.name : "???"}`}</Text>
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
              // <Card.Root
              //   px={6}
              //   py={4}
              //   size="lg"
              //   mb={4}
              //   borderColor="red.emphasized"
              //   borderWidth={2}
              // >
              //   <Flex justifyContent="flex-start" alignItems="center" gap={2}>
              //     <Text color="red.500" fontSize={{ base: "md", md: "xl" }}>
              //       <FaRegCircleCheck />
              //     </Text>
              //     <Text color="red.300" fontSize={{ base: "md", md: "xl" }}>
              //       {t("message.has_paid")}
              //     </Text>
              //   </Flex>

              // </Card.Root>
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
          // <Flex direction="column">
          //   {alertText(`${t("label.email")}: ${profile.email}`)}
          //   {profile.is_completed
          //     ? alertText(
          //         `${t("label.name")}: ${profile.first_name} ${
          //           profile.last_name
          //         }`
          //       )
          //     : alertText(
          //         t("message.not_completed"),
          //         t("label.complete"),
          //         "/profile"
          //       )}
          //   {/* {data?.has_paid
          //     ? alertText(t("message.has_paid"))
          //     : alertText(t("message.not_paid"))} */}
          //   <Button onClick={pay}>Pay</Button>
          // </Flex>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default Dashboard;
