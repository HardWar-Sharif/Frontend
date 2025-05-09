import {
    Button,
    Card, CardBody, CardFooter, CardHeader,
    Center,
    Image,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";

import { useGetShopItems } from "@/hooks/shop.ts";
import {toaster} from "@/components/ui/toaster.tsx";
import {shopPurchase} from "@/hooks/shopPurchase.ts";
import {useForm} from "react-hook-form";

interface ShopPurchaseValues {
    itemId: string;
}
const Shop = () => {
    const { data: shopItems } = useGetShopItems();
    const {
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ShopPurchaseValues>({ mode: "onSubmit" });
    const { mutate } = shopPurchase();
    const buy = () => {
        mutate(
            {
                itemId: getValues("itemId"),
            },
            {
                onSuccess: () => {
                    toaster.create({
                        title: "purchase successful",
                        type: "success",
                    })
                },
                onError: () =>
                    toaster.create({
                        title: "Login Error",
                        type: "error",
                    }),
            }
        );
    }

    const NoTeam = (
        <SimpleGrid
            w="full"
            h="full"
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            gap={2}
            p={4}
        >
            {shopItems?.data.map((item) => (
                <Card.Root
                    key={item.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    shadow="md"
                    bg="black"
                >
                    <CardHeader>
                        <Text fontSize="xl" fontWeight="bold" textAlign="center">
                            {item.name}
                        </Text>
                    </CardHeader>
                    <CardBody display="flex" justifyContent="center">
                        <Image
                            src={item.image}
                            alt={item.name}
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
                        <Text fontSize="md">Cost: {item.cost}</Text>
                        <Button colorScheme="red" onClick={() => handleBuy(item.id)}>
                            Buy
                        </Button>
                    </CardFooter>
                </Card.Root>
            ))}
        </SimpleGrid>
    );

    const handleBuy = (itemId: string) => {
        handleSubmit(buy)
    };

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
            <Card.Body>{NoTeam}</Card.Body>
        </Card.Root>
    );
};

export default Shop;
