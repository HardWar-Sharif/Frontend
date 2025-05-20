import {
  Heading,
  Text,
  Stack,
  StackProps,
  Image,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";

const Organizers: React.FC<StackProps> = (props) => {
  const { t } = useTranslate();
  return (
    <Stack width="100%" textAlign="center" gap={4} {...props} mt={8}>
      <Heading size="4xl">{t("title.organizers")}</Heading>
      <Text fontSize="lg" padding="0 10%">
        {t("landing.organizers")}
      </Text>
      <Logos />
    </Stack>
  );
};

const Logos = () => {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 4 }}
      justifyItems="center"
      alignSelf="center"
      width={{ base: "100vw", lg: "80vw" }}
      gap={8}
    >
      <Logo name="SUT" />
      <Logo name="SSC" />
      <Logo name="Fanap" />
      <Logo name="Nad" />
    </SimpleGrid>
  );
};

const Logo = ({ name }: { name: "SSC" | "SUT" | "Nad" | "Fanap" }) => {
  const website = {
    SUT: "https://www.sharif.ir/",
    SSC: "https://ssc.ce.sharif.edu/",
    Nad: "https://naadsecure.ir/",
    Fanap: "https://www.fanaptech.ir/",
  };

  return (
    <Link href={website[name]} _focus={{ outline: "none" }}>
      <Image
        src={"Landing/" + name + "-logo.svg"}
        opacity={0.8}
        _hover={{
          opacity: 1,
        }}
        cursor="pointer"
        transition="filter 0.1s ease"
        h={{ base: 12, sm: 16 }}
      />
    </Link>
  );
};

export default Organizers;
