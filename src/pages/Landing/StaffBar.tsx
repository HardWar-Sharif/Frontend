import {
  Heading,
  Text,
  Stack,
  StackProps,
  Flex,
  Image,
  Box,
  BoxProps,
  Button,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";
import { useRef, useEffect, useState } from "react";

const cardWidth = 210;

const StaffBar: React.FC<StackProps> = (props) => {
  const { t } = useTranslate();
  const items = [
    {
      imagePath: "staff/example-staff.png",
      name: "Saeed Forati",
      title: "Presidentttttttt",
    },
    {
      imagePath: "staff/example-staff.png",
      name: "Saeed Forati",
      title: "President",
    },
    {
      imagePath: "staff/example-staff.png",
      name: "Saeed Forati",
      title: "President",
    },
    {
      imagePath: "staff/example-staff.png",
      name: "Saeed Forati",
      title: "President",
    },
    {
      imagePath: "staff/example-staff.png",
      name: "Saeed Forati",
      title: "President",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      setShouldScroll(cardWidth * items.length > window.innerWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  useEffect(() => {
    if (!shouldScroll) return;

    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.4;

    const scroll = () => {
      if (container) {
        scrollAmount += scrollSpeed;
        container.scrollLeft = scrollAmount;

        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(scroll, 10);

    return () => clearInterval(interval);
  }, [shouldScroll]);

  return (
    <Stack width="100%" textAlign="center" gap={4} {...props}>
      <Heading size="4xl" fontWeight="bold">
        {t("title.staff")}
      </Heading>
      <Text fontSize="lg" padding="0 10%">
        {t("landing.staff")}
      </Text>
      <Flex
        ref={containerRef}
        gap={4}
        justify="space-around"
        overflow="hidden"
        position="relative"
        width="100%"
        whiteSpace="nowrap"
      >
        <Box
          ref={itemsRef}
          display="inline-block"
          animation="scroll 10s linear infinite"
          css={{
            "@keyframes scroll": {
              "0%": { transform: "translateX(100%)" },
              "100%": { transform: "translateX(-100%)" },
            },
          }}
        >
          {shouldScroll
            ? [...items, ...items].map((item, index) => (
                <StaffItem
                  key={index}
                  imagePath={item.imagePath}
                  title={item.title}
                  name={item.name}
                />
              ))
            : items.map((item, index) => (
                <StaffItem
                  key={index}
                  imagePath={item.imagePath}
                  title={item.title}
                  name={item.name}
                />
              ))}
        </Box>
      </Flex>

      <Flex justify="space-around">
        <Button size="xl" borderRadius="full" fontWeight="bold" fontSize="sm">
          {t("label.view_all") }
          <Image height="1em" src="Landing/Right-arrow.svg" />
        </Button>
      </Flex>
    </Stack>
  );
};

const StaffItem: React.FC<
  { imagePath: string; title: string; name: string } & BoxProps
> = ({ imagePath, title, name, ...props }) => {
  return (
    <Box
      width={cardWidth}
      backgroundColor="colorPalette.900"
      padding="15px"
      borderRadius="xl"
      alignItems="center"
      display="inline-block"
      mx={2}
      {...props}
    >
      <Image src={imagePath} w="180px" h="180px" />
      <Heading fontWeight="bold" fontSize="md">
        {name}
      </Heading>
      <Text textAlign="start" fontSize="sm" textAlignLast="center">
        {title}
      </Text>
    </Box>
  );
};

export default StaffBar;
