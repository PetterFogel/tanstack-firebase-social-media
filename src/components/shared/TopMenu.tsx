import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOutAccount } from "@/lib/firebase/firebase.utils";

const TopMenu = () => {
  return (
    <header className="md:hidden w-full border-b bg-white">
      <div className="flex-between py-2 px-4">
        <Link to="/" className="font-bold text-base">
          StoryClub
        </Link>
        <div className="flex-center gap-4">
          <Button
            className="flex gap-4 items-center justify-start hover:bg-transparent"
            variant="ghost"
            onClick={signOutAccount}
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopMenu;
