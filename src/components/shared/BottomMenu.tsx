import { Link, useLocation } from "react-router-dom";
import { HomeIcon, SearchIcon } from "lucide-react";

const bottomMenuLinks = [
  {
    route: "/",
    label: "Home",
    svgIcon: <HomeIcon size={16} />,
  },
  {
    route: "/Explore",
    label: "Explore",
    svgIcon: <SearchIcon size={16} />,
  },
];

const BottomMenu = () => {
  const { pathname } = useLocation();

  return (
    <section className="z-50 border-t flex-between bg-white w-full fixed bottom-0 p-4 md:hidden">
      {bottomMenuLinks.map((link, idx) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={idx}
            to={link.route}
            className={`rounded-lg text-xs transition group flex-center flex-col ${
              isActive ? "text-slate-900 font-bold" : "text-slate-600"
            }`}
          >
            {link.svgIcon}
            {link.label}
          </Link>
        );
      })}
    </section>
  );
};

export default BottomMenu;
