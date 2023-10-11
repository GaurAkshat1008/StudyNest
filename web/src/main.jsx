import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import theme from "./theme.jsx";
import { SocketProvider } from "./context/socket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <React.Suspense
        fallback={
          <Flex justify={"center"}>
            <Spinner size={"xl"} />
          </Flex>
        }
      >
        <SocketProvider>
          <App />
        </SocketProvider>
      </React.Suspense>
    </ChakraProvider>
  </React.StrictMode>
);