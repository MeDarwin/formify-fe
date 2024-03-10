import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ListenLocationChangeWrapper } from "./components/ListenLocationChangeWrapper";
import { Home } from "./pages/Index";
import { Login } from "./pages/login/Index";
import { Register } from "./pages/register";

export const router = createBrowserRouter([
  {
    element: <ListenLocationChangeWrapper />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
