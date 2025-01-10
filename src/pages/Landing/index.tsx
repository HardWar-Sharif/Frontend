import { Button } from "@chakra-ui/react";
import { useTranslate } from "@tolgee/react";

const Landing = () => {
  const { t } = useTranslate();

  return <Button>{t("title.hardwar")}</Button>;
};

export default Landing;
