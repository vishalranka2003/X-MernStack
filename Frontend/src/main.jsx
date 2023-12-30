import { RecoilRoot } from 'recoil';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      color: mode("shreya.800", "whiteAlpha.900")(props),
      bg: mode("shreya.100", "#101010")(props),
    },
  }),
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: "true",
};

const colors = {
  shreya: {
    light: "#616161",
    dark: "#1e1e1e",
  },
};
const theme = extendTheme({ config, styles, colors });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode="{theme.config.initialColorMode}"></ColorModeScript>
        <App />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
);
