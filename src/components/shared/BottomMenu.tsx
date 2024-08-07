import { useAuthContext } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  BookUser,
  HomeIcon,
  LibraryBig,
  SearchIcon,
  UserRound,
} from "lucide-react";

const navigationLinks = [
  {
    route: "/",
    label: "Home",
    svgIcon: <HomeIcon size={20} />,
  },
  {
    route: "/Explore",
    label: "Explore",
    svgIcon: <SearchIcon size={20} />,
  },
  {
    route: "/bookshelf",
    label: "Bookshelf",
    svgIcon: <LibraryBig size={20} />,
  },
  {
    route: "/people",
    label: "People",
    svgIcon: <BookUser size={20} />,
  },
];

const BottomMenu = () => {
  const { pathname } = useLocation();
  const { currentUser } = useAuthContext();

  const profileLink = {
    route: `/profile/${currentUser?.id}`,
    label: "Profile",
    svgIcon: <UserRound size={16} />,
  };

  const bottomMenuLinks = navigationLinks.concat(profileLink);

  return (
    <section className="z-50 border-t flex-between bg-white w-full fixed bottom-0 p-4 md:hidden">
      {bottomMenuLinks.map((link, idx) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={idx}
            to={link.route}
            className={`rounded-lg text-[10px] transition group flex-center flex-col font-bold tracking-wider ${
              !isActive && "text-slate-400"
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
