import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ColorModeProvider } from "./components/ui/color-mode";
import { system } from "./theme";
import { ChakraProvider, LocaleProvider } from "@chakra-ui/react";
import { FormatSimple, Tolgee, TolgeeProvider } from "@tolgee/react";
import Fonts from "./fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import en from "./locales/en.json";
import fa from "./locales/fa.json";
import AppRoutes from "./routes";
import { useLanguageStore } from "./stores/language";

const queryClient = new QueryClient();

const App = () => {
  const language = useLanguageStore((state) => state.language);

  const tolgee = Tolgee().use(FormatSimple()).init({
    language,
    staticData: { en, fa },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider locale={language}>
        <TolgeeProvider tolgee={tolgee}>
          <ChakraProvider value={system}>
            <Fonts />
            <ColorModeProvider forcedTheme="dark">
              <div dir={language == "fa" ? "rtl" : "ltr"}>
                <AppRoutes />
              </div>
            </ColorModeProvider>
          </ChakraProvider>
        </TolgeeProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
