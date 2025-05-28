import { createContext, useState, useEffect, useCallback } from "react";
import { obtenerPorId } from "../api/UsuarioApi";

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

  // Función para actualizar el usuario con datos frescos del backend
  const actualizarUsuarioDesdeBackend = useCallback(async (dni) => {
    try {
      const usuarioActualizado = await obtenerPorId(dni);
      setUser(usuarioActualizado);
      localStorage.setItem("user", JSON.stringify(usuarioActualizado));
    } catch (error) {
      console.error('Error al actualizar usuario desde backend:', error);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      clearAuth();
      setLoading(false);
      return;
    }
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(storedRole);
      
      // Actualizar datos del usuario desde el backend
      if (parsedUser?.dni) {
        await actualizarUsuarioDesdeBackend(parsedUser.dni);
      }
    } else {
      clearAuth();
    }
    setLoading(false);
  }, [actualizarUsuarioDesdeBackend]);

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

  const login = async (userData, userRole) => {
    setUser(userData);
    setRole(userRole);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("role", userRole);
    sessionStorage.setItem("isLoggedIn", "true");
    
    // Actualizar datos del usuario desde el backend
    if (userData?.dni) {
      await actualizarUsuarioDesdeBackend(userData.dni);
    }
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
