import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ListenLocationChangeWrapper } from "./components/wrapper/ListenLocationChangeWrapper";
import { ProtectedRoutesWrapper } from "./components/wrapper/ProtectedRoutesWrapper";
import { Home } from "./pages/Index";
import { Login } from "./pages/login/Index";
import { Register } from "./pages/register";
import ResponseForm from "./pages/response/Index";

export const router = createBrowserRouter([
  {
    element: <ListenLocationChangeWrapper />,
    /* ------------------------ LISTEN TO LOCATION CHANGE ----------------------- */
    children: [
      {
        element: <ProtectedRoutesWrapper />,
        /* -------------------------- AUTHORISED USER ONLY -------------------------- */
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
        ],
        /* -------------------------- AUTHORISED USER ONLY -------------------------- */
      },
      {
        path: "/response/:slug",
        element: <ResponseForm />,
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
    /* ------------------------ LISTEN TO LOCATION CHANGE ----------------------- */
  },
]);
