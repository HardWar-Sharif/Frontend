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
import { useState } from "react";
import { formatNumber } from "@/utils/number-locale";
import { useLanguageStore } from "@/stores/language";
import { useGetMyTeam } from "@/hooks/my-team";

const Shop = () => {
  const {
    data: components,
    refetch: refetchComponents,
    isLoading: componentsLoading,
  } = useGetComponents();
  const { mutate, isPending } = usePurchaseComponent();
  const { data: team, isLoading } = useGetMyTeam();
  const [currentComponent, setCurrentComponent] = useState<number>(-1);
  const language = useLanguageStore((state) => state.language);
  const { t } = useTranslate();

  const buy = (component_id: number) => {
    setCurrentComponent(component_id);
    mutate(
      {
        component_id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          refetchComponents();
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
      {components
        .sort((a: Component, b: Component) => a.id - b.id)
        .map((component: Component) => (
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
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xl" fontWeight="bold" textAlign="center">
                  {component.name}
                </Text>
              </Flex>
            </CardHeader>
            <CardBody
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
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
                {t("label.count")}: {formatNumber(component.count, language)}
              </Text>
              <Text fontSize="md">
                {t("label.cost")}:{" "}
                {formatNumber(component.credit_cost, language)}
              </Text>
              <Button
                colorScheme="red"
                onClick={() => buy(component.id)}
                size="sm"
                variant="subtle"
                disabled={component.count <= 0}
              >
                {isPending && currentComponent == component.id && (
                  <Spinner size="sm" />
                )}{" "}
                {t("label.buy")}
              </Button>
            </CardFooter>
          </Card.Root>
        ))}
    </SimpleGrid>
  ) : (
    <Skeleton height="250px" />
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
        <Card.Header w="full" px={12}>
          <Card.Title
            fontSize={36}
            color="red.solid"
            textShadow="0 0 20px var(--shadow-color)"
            shadowColor="red.solid"
            w="full"
          >
            <Flex justifyContent="space-between" alignItems="center" w="full">
              <Text>{t("label.shop")}</Text>
              {team?.data ? (
                <Text fontSize={20}>
                  {t("label.current_credit")}:{" "}
                  {formatNumber(team.data.credit, language)}
                </Text>
              ) : (
                <Skeleton height="20px" />
              )}
            </Flex>
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>{shopComponents}</Card.Body>
    </Card.Root>
  );
};

export default Shop;
