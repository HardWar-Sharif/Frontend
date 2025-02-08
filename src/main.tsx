import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Landing from "./pages/Landing";

import { ColorModeProvider } from "@/components/ui/color-mode";
import { system } from "./theme";
import { ChakraProvider, LocaleProvider } from "@chakra-ui/react";
import { DevTools, FormatSimple, Tolgee, TolgeeProvider } from "@tolgee/react";
import Fonts from "./fonts";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import NavBar from "./components/ui/NavBar";

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    language: "en",

    // for development
    apiUrl: import.meta.env.VITE_APP_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_APP_TOLGEE_API_KEY,

    // for production
    // staticData: {
    //   ...
    // }
  });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider locale="en">
      <TolgeeProvider tolgee={tolgee}>
        <ChakraProvider value={system}>
          <Fonts />
          <ColorModeProvider>
            <div dir="ltr">
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <NavBar
                          position="fixed"
                          backgroundColor="black"
                          zIndex={3}
                        />
                        <Outlet />
                      </>
                    }
                  >
                    <Route index element={<Landing />} />
                    <Route path="signup" element={<Signup />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </div>
          </ColorModeProvider>
        </ChakraProvider>
      </TolgeeProvider>
    </LocaleProvider>
  </StrictMode>
);
