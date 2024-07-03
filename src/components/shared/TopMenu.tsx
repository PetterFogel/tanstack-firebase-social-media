import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { signOutAccount } from "@/lib/firebase/firebase.utils";
import { LogOut, UserRound } from "lucide-react";

const TopMenu = () => {
  const { currentUser } = useAuthContext();

  return (
    <header className="md:hidden w-full border-b">
      <div className="flex-between py-2 px-4">
        <Link to="/" className="font-bold text-base">
          Logo
        </Link>
        <div className="flex-center gap-4">
          {currentUser && (
            <Link to={`/profile/${currentUser.id}`}>
              <div className="bg-green-400 rounded-full h-8 w-8 flex-center">
                <UserRound size={16} />
              </div>
            </Link>
          )}
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
