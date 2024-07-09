import { Outlet } from "react-router-dom";
import LeftSideMenu from "@/components/shared/LeftSideMenu";
import BottomMenu from "@/components/shared/BottomMenu";
import TopMenu from "@/components/shared/TopMenu";

const PrivateLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopMenu />
      <LeftSideMenu />
      <section className="w-full bg-slate-50 md:px-4 pb-16 md:overflow-y-scroll">
        <Outlet />
      </section>
      <BottomMenu />
    </div>
  );
};

export default PrivateLayout;
