import { AuthContext } from "@/context/AuthContext";
import { use } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const { currentUser, isLoading } = use(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {currentUser ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex-center flex-1 py-10">
            <Outlet />
          </section>
          <div className="hidden xl:block h-screen flex-1 bg-slate-900"></div>
        </>
      )}
    </>
  );
};

export default PublicLayout;
