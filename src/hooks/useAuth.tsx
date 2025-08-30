import { USER_LS_KEY } from "@/lib/constants";
import {
  deleteFromLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from "@/lib/utils";
import type { User } from "@/types/user";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";

type AuthContextType = {
  user: null | User;
  handleLogin: (payload: User) => void;
  handleLogout: () => void;
};

const authContextInitial: AuthContextType = {
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextInitial);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getFromLocalStorage<User | null>(USER_LS_KEY) ?? null;
  });

  const handleLogin = useCallback(
    (user: User) => {
      setUser(user);
      setToLocalStorage(USER_LS_KEY, user);
    },
    [setUser],
  );

  const handleLogout = useCallback(() => {
    setUser(null);
    deleteFromLocalStorage(USER_LS_KEY);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider };
export default useAuth;
