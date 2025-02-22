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

const tolgee = Tolgee()
  // .use(DevTools())
  .use(FormatSimple())
  .init({
    language: "en",

    // for development
    // apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
    // apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,

    // for production
    staticData: { en, fa },
  });

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocaleProvider locale="en">
        <TolgeeProvider tolgee={tolgee}>
          <ChakraProvider value={system}>
            <Fonts />
            <ColorModeProvider forcedTheme="dark">
              <div dir="ltr">
                <AppRoutes />
              </div>
            </ColorModeProvider>
          </ChakraProvider>
        </TolgeeProvider>
      </LocaleProvider>
    </QueryClientProvider>
  </StrictMode>
);
