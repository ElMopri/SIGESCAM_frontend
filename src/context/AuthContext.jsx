import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });

  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      clearAuth();
      setLoading(false);
      return;
    }
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    } else {
      clearAuth();
    }
    setLoading(false);
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    sessionStorage.removeItem("isLoggedIn");
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  const login = (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
        setUser,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
