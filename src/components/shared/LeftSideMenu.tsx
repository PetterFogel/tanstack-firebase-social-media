import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { signOutAccount } from "@/lib/firebase/firebase.utils";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HomeIcon, LogOut, SearchIcon, UserRound } from "lucide-react";

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
  const { currentUser } = useAuthContext();

  return (
    <nav className="hidden md:flex px-3 py-10 flex-col justify-between min-w-[270px] border-x">
      <div className="flex flex-col gap-11">
        {currentUser && (
          <Link
            to={`/profile/${currentUser.id}`}
            className="flex gap-3 items-center"
          >
            <div className="bg-green-400 rounded-full h-14 w-14 flex-center">
              <UserRound size={30} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-lg">{currentUser.name}</p>
              <p className="text-sm text-light-3">@{currentUser.username}</p>
            </div>
          </Link>
        )}
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
      </div>
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
