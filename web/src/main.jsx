import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <App />
      </React.Suspense>
    </ChakraProvider>
  </React.StrictMode>
);
