import { createBrowserRouter } from "react-router-dom";
import { SignInPage, SignUpPage } from "@/_public/pages";
import PrivateLayout from "@/_private/PrivateLayout";
import PrivateRoute from "@/_private/PrivateRoute";
import PublicLayout from "@/_public/PublicLayout";
import {
  BookDetailsPage,
  ExplorePage,
  ProfilePage,
  HomePage,
} from "@/_private/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "profile/:id",
        element: <ProfilePage />,
      },
      {
        path: "book/:bookId",
        element: <BookDetailsPage />,
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
