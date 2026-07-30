import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useUserAuth } from "../hooks/auth/useUserAuth";
import type { User } from "../types/auth.types";

interface UserAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (user: User) => void;
  logout: () => Promise<void>;
  googleAuth: (credential: string) => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

interface UserAuthProviderProps {
  children: ReactNode;
}

export const UserAuthProvider = ({
  children,
}: UserAuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { getUser, logoutUser, googleSignIn } = useUserAuth();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const currentUser = await getUser();

        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();

    const handleBlocked = async () => {
      await logoutUser();
      setUser(null);
      window.location.href = "/login?blocked=true";
    };

    window.addEventListener("auth-blocked", handleBlocked);

    return () => {
      window.removeEventListener("auth-blocked", handleBlocked);
    };
  }, [getUser, logoutUser]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.warn("Server logout returned an error, clearing local user session anyway:", error);
    } finally {
      setUser(null);
    }
  };

  const googleAuth = async (credential: string) => {
    const loggedInUser = await googleSignIn(credential);

    // Assuming googleSignIn returns the authenticated user
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        googleAuth,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserAuthContext);

  if (!context) {
    throw new Error(
      "useUserContext must be used inside UserAuthProvider"
    );
  }

  return context;
};