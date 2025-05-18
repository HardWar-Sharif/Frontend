import FloatField from "@/components/ui/FloatField";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useGetDiscountAmount } from "@/hooks/discount-amount";
import { Button, Flex, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

interface DicsountValue {
  discountCode: string;
}

const PaymentForm = () => {
  const { mutate } = useGetDiscountAmount();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<DicsountValue>({ mode: "onSubmit" });
  const { t } = useTranslate();
  const [amount, setAmount] = useState<number>(300000);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const pay = () => {
    mutate(searchParams.get("discount_code") || "", {
      onSuccess: (response) => {
        window.location.href = `https://payment.zarinpal.com/pg/StartPay/${response.data.authority}`;
      },
    });
  };

  const applyDiscount = () => {
    mutate(getValues("discountCode"), {
      onSuccess: (response) => {
        reset();
        if (response?.discount_amount != 0) {
          reset();
          setAmount(
            amount - Math.floor(parseInt(response.discount_amount) / 10)
          );
          navigate(`${pathname}?discount_code=${getValues("discountCode")}`);
        } else toaster.create({ title: "Code not found", type: "error" });
      },
    });
  };

  return (
    <>
      <SimpleGrid w="full" gap={4} columns={{ base: 1, md: 2 }}>
        <GridItem>
          <FloatField
            marginTop={0}
            label={t("label.discount_code")}
            formInput={register("discountCode", {
              pattern: {
                value: /^[a-zA-Z\-\d]+$/,
                message: t("message.invalid", {
                  field: t("label.discount_code"),
                }),
              },
            })}
            invalid={!!errors.discountCode}
          />
          {errors.discountCode && (
            <Text fontSize="sm" mt={1} color="red.solid">
              {errors.discountCode.message}
            </Text>
          )}
          <Button
            mt={2}
            w="full"
            size={{ base: "md", md: "lg" }}
            variant="outline"
            borderWidth={2}
            borderColor="red.emphasized"
            _hover={{ backgroundColor: "red.emphasized" }}
            onClick={handleSubmit(applyDiscount)}
          >
            {t("label.apply_discount")}
          </Button>
        </GridItem>
        <GridItem>
          <Button
            w="full"
            size={{ base: "md", md: "lg" }}
            variant="solid"
            borderWidth={2}
            borderColor="red.emphasized"
            _hover={{ backgroundColor: "red.emphasized" }}
            onClick={handleSubmit(pay)}
          >
            {t("label.pay")}
          </Button>
          <Flex justifyContent="center" alignItems="center" w="full" mt={5}>
            <Text>{`${t("label.price")}: ${amount} ${t("label.tomans")}`}</Text>
          </Flex>
        </GridItem>
      </SimpleGrid>
      <Toaster />
    </>
  );
};

export default PaymentForm;
