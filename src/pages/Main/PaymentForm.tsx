import FloatField from "@/components/ui/FloatField";
import { toaster, Toaster } from "@/components/ui/toaster";
import { useGetDiscountAmount } from "@/hooks/discount-amount";
import { usePay } from "@/hooks/pay";
import { useLanguageStore } from "@/stores/language";
import { formatPrice } from "@/utils/price";
import {
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

interface DicsountValue {
  discountCode: string;
}

const PaymentForm = () => {
  const { mutate: discountMutate, isPending: discountPending } =
    useGetDiscountAmount();
  const { mutate: payMutate, isPending: payPending } = usePay();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<DicsountValue>({ mode: "onSubmit" });
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [amountLoading, setAmountLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(400000);
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    if ((searchParams.get("discount_code") || "") != "")
      applyDiscount(searchParams.get("discount_code")!);
    else setAmountLoading(false);
  }, []);

  const pay = () => {
    payMutate(searchParams.get("discount_code") || "", {
      onSuccess: (response) => {
        window.location.href = `https://payment.zarinpal.com/pg/StartPay/${response.data.authority}`;
      },
      onError: () => {
        toaster.create({ title: "An error occured", type: "error" });
      },
    });
  };

  const applyDiscount = (discountCode: string, fromForm: boolean = false) => {
    discountMutate(discountCode, {
      onSuccess: (response) => {
        setAmountLoading(false);
        setAmount(400000 - Math.floor(parseInt(response.discount_amount) / 10));
        navigate(`${pathname}?discount_code=${discountCode}`);
        if (fromForm)
          toaster.create({ title: "Discount Code Applied", type: "success" });
      },
      onError: () => {
        toaster.create({ title: "Code not found", type: "error" });
      },
    });
    reset({ discountCode: "" });
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
            onClick={handleSubmit(() =>
              applyDiscount(getValues("discountCode"), true)
            )}
          >
            {discountPending && <Spinner size="sm" />}{" "}
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
            // disabled={!(searchParams.get("discount_code") || "").startsWith("extra")}
          >
            {payPending && <Spinner size="sm" />} {t("label.pay")}
            {/* {(searchParams.get("discount_code") || "").startsWith("extra")
              ? t("label.pay")
              : t("label.full")} */}
          </Button>
          <Flex justifyContent="center" alignItems="center" w="full" mt={5}>
            {amountLoading ? (
              <Skeleton height="40px" />
            ) : (
              <Text>{`${t("label.price")}: ${formatPrice(amount, language)} ${t(
                "label.tomans"
              )}`}</Text>
            )}
          </Flex>
        </GridItem>
      </SimpleGrid>
      <Toaster />
    </>
  );
};

export default PaymentForm;
