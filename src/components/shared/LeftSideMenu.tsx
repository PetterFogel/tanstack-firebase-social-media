import { Button } from "@/components/ui/button";
import { signOutAccount } from "@/lib/firebase/firebase.utils";
import { NavLink, useLocation } from "react-router-dom";
import { HomeIcon, LogOut, SearchIcon } from "lucide-react";

const leftSideMenuLinks = [
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

const LeftSideMenu = () => {
  const { pathname } = useLocation();

  return (
    <nav className="hidden md:flex px-3 py-10 flex-col justify-between min-w-[270px] border-x">
      <ul className="flex flex-col gap-1">
        {leftSideMenuLinks.map(
          (link: { route: string; label: string; svgIcon: JSX.Element }) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`rounded-lg font-medium transition group ${
                  isActive
                    ? "bg-slate-900 text-white hover:text-white hover:bg-slate-800"
                    : "hover:bg-gray-100 hover:text-slate-900"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center px-4 py-3"
                >
                  {link.svgIcon}
                  {link.label}
                </NavLink>
              </li>
            );
          }
        )}
      </ul>
      <Button
        className="flex gap-4 items-center justify-start hover:bg-transparent"
        variant="ghost"
        onClick={signOutAccount}
      >
        <LogOut size={16} />
        Sign out
      </Button>
    </nav>
  );
};

export default LeftSideMenu;
