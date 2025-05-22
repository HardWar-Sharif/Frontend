import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Image,
  SimpleGrid,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { useGetComponents } from "@/hooks/components";
import { toaster } from "@/components/ui/toaster.tsx";
import { usePurchaseComponent } from "@/hooks/purchase";
import { useTranslate } from "@tolgee/react";
import { useGetPurchases } from "@/hooks/purchases";

const Shop = () => {
  const {
    data: components,
    refetch: refetchComponents,
    isLoading: componentsLoading,
  } = useGetComponents();
  const {
    data: purchases,
    refetch: refetchPurchases,
    isLoading: purchasesLoading,
  } = useGetPurchases();
  const { mutate, isPending } = usePurchaseComponent();
  const { t } = useTranslate();

  const buy = (component_id: number) => {
    mutate(
      {
        component_id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          refetchComponents();
          refetchPurchases();
          toaster.create({
            title: "Purchase successful",
            type: "success",
          });
        },
        onError: () =>
          toaster.create({
            title: "Purchase failed",
            type: "error",
          }),
      }
    );
  };

  const shopComponents = !componentsLoading ? (
    <SimpleGrid
      w="full"
      h="full"
      columns={{ base: 1, md: 2, xl: 3 }}
      gap={2}
      p={4}
    >
      {components.map((component: Component) => (
        <Card.Root
          key={component.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
          bg="black"
          size="sm"
          borderColor="red.muted"
        >
          <CardHeader>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {component.name}
            </Text>
          </CardHeader>
          <CardBody display="flex" justifyContent="center" alignItems="center">
            <Image
              borderRadius={5}
              src={component.image_url}
              alt={component.name}
              boxSize="120px"
              objectFit="cover"
            />
          </CardBody>
          <CardFooter
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Text fontSize="md">
              {t("label.count")}: {component.count}
            </Text>
            <Text fontSize="md">
              {t("label.cost")}: {component.credit_cost}
            </Text>
            <Button
              colorScheme="red"
              onClick={() => buy(component.id)}
              size="sm"
              variant="subtle"
            >
              {isPending && <Spinner size="sm" />} {t("label.buy")}
            </Button>
          </CardFooter>
        </Card.Root>
      ))}
    </SimpleGrid>
  ) : (
    <Skeleton height="250px" />
  );

  const purchasedComponents = purchasesLoading ? (
    <Skeleton height="250px" />
  ) : (
    !!purchases.length && (
      <Flex direction="column">
        <Text>Purchased Components</Text>
        <SimpleGrid
          w="full"
          h="full"
          columns={{ base: 1, md: 2, xl: 3 }}
          gap={2}
          p={4}
        >
          {purchases.map((purchase: Component) => (
            <Card.Root
              key={purchase.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              bg="black"
              size="sm"
              borderColor="red.muted"
            >
              <CardHeader>
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                  {purchase.name}
                </Text>
              </CardHeader>
              <CardBody
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  borderRadius={5}
                  src={purchase.image_url}
                  alt={purchase.name}
                  boxSize="120px"
                  objectFit="cover"
                />
              </CardBody>
              <CardFooter
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                <Text fontSize="md">
                  {t("label.count")}: {purchase.count}
                </Text>
                <Text fontSize="md">
                  {t("label.cost")}: {purchase.credit_cost}
                </Text>
              </CardFooter>
            </Card.Root>
          ))}
        </SimpleGrid>
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
            {t("label.shop")}
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>
        <Flex direction="column">
          {shopComponents}
          {purchasedComponents}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

export default Shop;
