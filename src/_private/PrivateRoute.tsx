import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { ReactElement, use } from "react";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { currentUser, isLoading } = use(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (currentUser) return children;

  return <Navigate to="/sign-in" />;
};

export default PrivateRoute;
