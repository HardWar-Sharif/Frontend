import { useGetPurchases } from "@/hooks/purchases";
import { useLanguageStore } from "@/stores/language";
import { formatNumber } from "@/utils/number-locale";
import { Card, CardBody, Flex, Skeleton, Text, Center } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";

const Purchased = () => {
  const { data: purchases, isLoading: purchasesLoading } = useGetPurchases();
  const language = useLanguageStore((state) => state.language);
  const { t } = useTranslate();

  const purchasedComponents = purchasesLoading ? (
    <Skeleton height="250px" />
  ) : (
    !!purchases.length && (
      <Flex direction="column">
        {purchases
          .sort(
            (a: PurchasedComponent, b: PurchasedComponent) =>
              new Date(a.purchased_at).getTime() -
              new Date(b.purchased_at).getTime()
          )
          .map((purchase: PurchasedComponent) => (
            <Card.Root
              key={purchase.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              bg="black"
              size="sm"
              borderColor="red.muted"
              mb={2}
            >
              <CardBody
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Flex justifyContent="space-between" alignItems="" w="full">
                  <Text fontSize="lg">{purchase.component.name}</Text>
                  <Text fontSize="md">
                    {t("label.count")}:{" "}
                    {formatNumber(purchase.quantity, language)}
                  </Text>
                </Flex>
              </CardBody>
            </Card.Root>
          ))}
      </Flex>
    )
  );

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
            {t("label.purchased")}
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>{purchasedComponents}</Card.Body>
    </Card.Root>
  );
};

export default Purchased;
