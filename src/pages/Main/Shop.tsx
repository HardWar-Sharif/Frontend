import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";

import { useGetComponents } from "@/hooks/components";
import { toaster } from "@/components/ui/toaster.tsx";
import { usePurchaseComponent } from "@/hooks/purchase";
import { useEffect } from "react";

const Shop = () => {
  const { data: components, refetch } = useGetComponents();
  const { mutate } = usePurchaseComponent();

  useEffect(() => {
    const intervalId = setTimeout(() => {
      refetch();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const buy = (component_id: number) => {
    mutate(
      {
        component_id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          refetch();
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

  const ShopItems = components ? (
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
            <Text fontSize="md">Count: {component.count}</Text>
            <Text fontSize="md">Cost: {component.credit_cost}</Text>
            <Button
              colorScheme="red"
              onClick={() => buy(component.id)}
              size="sm"
              variant="subtle"
            >
              Buy
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
        <Card.Header>
          <Card.Title
            fontSize={36}
            color="red.solid"
            textShadow="0 0 20px var(--shadow-color)"
            shadowColor="red.solid"
          >
            Shop
          </Card.Title>
        </Card.Header>
      </Center>
      <Card.Body>{ShopItems}</Card.Body>
    </Card.Root>
  );
};

export default Shop;
