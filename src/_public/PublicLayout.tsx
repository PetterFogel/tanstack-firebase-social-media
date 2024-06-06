import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <section className="flex-center flex-1 py-10">
        <Outlet />
      </section>
      <div className="hidden xl:block h-screen flex-1 bg-slate-900"></div>
    </>
  );
};

export default PublicLayout;
