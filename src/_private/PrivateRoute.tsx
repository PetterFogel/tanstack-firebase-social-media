import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { useAuthContext } from "@/context/AuthContext";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { currentUser, isLoading } = useAuthContext();

  if (isLoading) return <p>Loading...</p>;

  if (currentUser) return children;

  return <Navigate to="/sign-in" />;
};

export default PrivateRoute;
