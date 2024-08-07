import { auth } from "@/lib/firebase/firebase.config";
import { IUser } from "@/types/user";
import { getCurrentUserDoc } from "@/lib/firebase/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from "react";

interface ContextProps {
  currentUser: IUser | null;
  isLoading: boolean;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
}

export const AuthContext = createContext<ContextProps>({
  currentUser: null,
  isLoading: true,
  setCurrentUser: () => {},
});

interface Props {
  children: ReactElement;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const value = { currentUser, isLoading, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      const user = await getCurrentUserDoc(authUser);
      setCurrentUser(user || null);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
