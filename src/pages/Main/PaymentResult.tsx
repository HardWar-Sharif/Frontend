import { useGetDiscountAmount } from "@/hooks/discount-amount";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const PaymentResult = () => {
  const { mutate } = useGetDiscountAmount();
  const { search } = useLocation();
  const [success, setSuccess] = useState(null);
  const searchParams = new URLSearchParams(search);
  const { t } = useTranslate();

  useEffect(() => {
    mutate(searchParams.get("authority") || "", {
      onSuccess: (data) => {
        setSuccess(data.has_paid);
      },
    });
  }, []);

  if (success == null) return null;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      pt={56}
      direction="column"
      gap={8}
    >
      <Image
        src={success ? "success.svg" : "fail.svg"}
        w={{ base: "175px", sm: "250px" }}
      />
      <Text fontSize="2xl" color={success ? "green" : "red"}>
        {success ? t("label.success_pay") : t("label.fail_pay")}
      </Text>
      <Button variant="surface" borderColor="red.emphasized">
        {t("label.back_to_dashboard")}
      </Button>
    </Flex>
  );
};

export default PaymentResult;
