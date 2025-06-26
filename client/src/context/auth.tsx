import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const TOKEN_KEY = "auth_token";

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const login = (token: string) => {
    saveToken(token);
    setIsAuthenticated(true);
  };

   const logout = () => {
    removeToken();
    setIsAuthenticated(false);

  };

  useEffect(() => {
    const isToken = getToken();
    if (isToken) {
      setIsAuthenticated(true);
    }
    setIsLoading(false)
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within Auth Provider");
  }
  return context;
};
