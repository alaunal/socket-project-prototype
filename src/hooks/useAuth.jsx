import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [helperText, setHelperText] = useState({ error: null, text: null });
  const [isLoading, setIsLoading] = useState(false);


  const join = (data) => {
    setUser(data);
  };

  const leave = () => {
    setUser({});
  };

  const value = useMemo(
    () => ({
      user,
      join,
      leave,
      helperText,
      setHelperText,
      isLoading,
      setIsLoading,
    }),
    [user, helperText, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
