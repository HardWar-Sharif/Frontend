import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "red",
      fontFamily: "'IRANRounded', sens-serif",
    },
  },
});

export const system = createSystem(defaultConfig, config);
