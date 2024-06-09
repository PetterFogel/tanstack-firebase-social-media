import { auth } from "@/lib/firebase/firebase.config";
import { User, onAuthStateChanged } from "firebase/auth";
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
  currentUser: User | null;
  isLoading: boolean;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const value = { currentUser, isLoading, setCurrentUser };

  useEffect(() => {
    console.log("TRIGGER");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
