import { useHasPaid } from "@/hooks/has-paid";
import { Button, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentResult = () => {
  const { mutate } = useHasPaid();
  const { search } = useLocation();
  const [success, setSuccess] = useState<string>("unknown");
  const searchParams = new URLSearchParams(search);
  const { t } = useTranslate();
  const navigate = useNavigate();

  useEffect(() => {
    mutate(searchParams.get("Authority") || "", {
      onSuccess: (data) => {
        setSuccess(data.has_paid ? "success" : "failed");
      },
    });
  }, []);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      pt={56}
      direction="column"
      gap={8}
    >
      {success == "unknown" ? (
        <Skeleton height="250px" />
      ) : (
        <>
          <Image
            src={success == "success" ? "success.svg" : "fail.svg"}
            w={{ base: "175px", sm: "250px" }}
          />
          <Text fontSize="2xl" color={success == "success" ? "green" : "red"}>
            {success == "success"
              ? t("label.success_pay")
              : t("label.fail_pay")}
          </Text>
          <Button
            variant="surface"
            borderColor="red.emphasized"
            onClick={() => navigate("/dashboard")}
          >
            {t("label.back_to_dashboard")}
          </Button>
        </>
      )}
    </Flex>
  );
};

export default PaymentResult;
