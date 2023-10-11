import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import theme from "./theme.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/NavBar.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Room from "./pages/room/Room.jsx";
import { useAuth as authLoader } from "./utils/useAuth.js";
import Index from "./pages/Index.jsx";
// import Video from "./pages/call/Video.jsx";
// import Test from "./pages/test.jsx";
// import { SocketProvider } from "./context/socket.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    loader: authLoader,
    path: "/dashboard",
    element: (
      <>
        <Navbar /> <Dashboard />{" "}
      </>
    ),
  },
  {
    loader: authLoader,
    path: "/createroom",
    element: (
      <>
        <Navbar /> <CreateRoom />{" "}
      </>
    ),
  },
  {
    loader: authLoader,
    path: "/room/:id",
    element: (
      <>
        <Navbar /> <Room />{" "}
      </>
    ),
  },
  // {
  //   loader: authLoader,
  //   path: "/video",
  //   element: (
  //     <>
  //       <Navbar /> <Video />
  //     </>
  //   ),
  // },
  {
    loader: authLoader,
    path: "/",
    element: (
      <>
        <Navbar /> <Index />
      </>
    ),
  },
]);

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
        {/* <SocketProvider> */}
        <RouterProvider router={router} />
        {/* </SocketProvider> */}
      </React.Suspense>
    </ChakraProvider>
  </React.StrictMode>
);
