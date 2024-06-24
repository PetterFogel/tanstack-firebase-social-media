import { Outlet } from "react-router-dom";
import LeftSideMenu from "@/components/shared/LeftSideMenu";
import BottomMenu from "@/components/shared/BottomMenu";
import TopMenu from "@/components/shared/TopMenu";

const PrivateLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopMenu />
      <LeftSideMenu />
      <section className="flex-1 bg-slate-50 px-4 overflow-y-scroll h-full">
        <Outlet />
      </section>
      <BottomMenu />
    </div>
  );
};

export default PrivateLayout;
