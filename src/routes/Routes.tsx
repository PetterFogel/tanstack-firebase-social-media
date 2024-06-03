import { HomePage } from "@/_private/pages";
import { createBrowserRouter } from "react-router-dom";
import { SignInPage, SignUpPage } from "@/_public/pages";
import PrivateLayout from "@/_private/PrivateLayout";
import PublicLayout from "@/_public/PublicLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
    ],
  },
]);
