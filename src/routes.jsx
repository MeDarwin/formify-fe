import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/login/Index";
import { Home } from "./pages/Index";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
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
]);
