import { useLanguageStore } from "@/stores/language";
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
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { keyframes } from "@emotion/react";

const cardWidth = 210;


const StaffBar: React.FC<StackProps> = (props) => {
  const { t } = useTranslate();
  const items = [
    {
      imagePath: "staff/saeed-forati.jpg",
      name: t("name.saeed_forati"),
      title: t("staff.president"),
    },
    {
      imagePath: "staff/amirhossein-souri.jpg",
      name: t("name.amirhossein_souri"),
      title: t("staff.vice_president"),
    },
    {
      imagePath: "staff/mahdi-alinejad.jpg",
      name: t("name.mahdi_alinejad"),
      title: t("staff.scientific_head"),
    },
    {
      imagePath: "staff/amirhossein-shahidi.jpg",
      name: t("name.amirhossein_shahidi"),
      title: t("staff.executive_head"),
    },
    {
      imagePath: "staff/majid-hajilou.jpg",
      name: t("name.majid_hajilou"),
      title: t("staff.sponsor_head"),
    },
    {
      imagePath: "staff/ahmad-mousavi.png",
      name: t("name.ahmad_mousavi"),
      title: t("staff.graphics_head"),
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const { language } = useLanguageStore();

  useEffect(() => {
    const checkOverflow = () => {
      setShouldScroll(cardWidth * items.length > window.innerWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scrollPos = keyframes`
    0% { transform: translateX(0%); }
    100% { transform: translateX(+50%); }
  `;

  const scrollNeg = keyframes`
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  `;

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
        overflow="hidden"
        position="relative"
        justifyContent={shouldScroll ? "flex-start" : "space-around"}
        width="100%"
      >
        <Box
          display="inline-block"
          whiteSpace="nowrap"
          animation={shouldScroll ? `${language == 'fa' ? scrollPos : scrollNeg} 20s linear infinite` : undefined}
        >
          {(shouldScroll ? [...items, ...items] : items).map((item, index) => (
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
          {t("label.view_all")}
          {language == "fa" ? <FiArrowLeft /> : <FiArrowRight />}
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
      borderRadius="3xl"
      alignItems="center"
      display="inline-block"
      mx={2}
      {...props}
    >
      <Image src={imagePath} w="180px" h="180px" rounded="3xl" />
      <Heading fontWeight="bold" fontSize="md" mt={2}>
        {name}
      </Heading>
      <Text textAlign="start" fontSize="sm" textAlignLast="center">
        {title}
      </Text>
    </Box>
  );
};

export default StaffBar;
