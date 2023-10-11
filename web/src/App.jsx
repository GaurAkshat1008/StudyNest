import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./component/NavBar.jsx";
import CreateRoom from "./pages/CreateRoom.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Room from "./pages/room/Room.jsx";
import { useAuth as authLoader } from "./utils/useAuth.js";
import Index from "./pages/Index.jsx";
import Video from "./pages/call/Video.jsx";
import Test from "./pages/test.jsx";

function App() {
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
    {
      loader: authLoader,
      path: "/video",
      element: (
        <>
          <Navbar /> <Video />
        </>
      ),
    },
    {
      loader: authLoader,
      path: "/",
      element: (
        <>
          <Navbar /> <Index />
        </>
      ),
    },
    {
      path: "/test",
      element: <Test />
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
