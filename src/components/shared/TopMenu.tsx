import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOutAccount } from "@/lib/firebase/firebase.utils";
import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <header className="md:hidden w-full border-b">
      <div className="flex-between py-2 px-4">
        <Link to="/" className="font-bold text-base">
          Logo
        </Link>
        <nav>
          <Button
            className="flex gap-4 items-center justify-start hover:bg-transparent"
            variant="ghost"
            onClick={signOutAccount}
          >
            <LogOut size={16} />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default TopMenu;
