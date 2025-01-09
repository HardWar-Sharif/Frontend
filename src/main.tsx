import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Landing from "./pages/Landing";

import { ColorModeProvider } from "@/components/ui/color-mode";
import { system } from "./theme";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <Landing />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>
);
