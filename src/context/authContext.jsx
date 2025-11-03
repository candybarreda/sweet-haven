import React, { Children, createContext, useContext, useEffect, useReducer, useState } from 'react';




const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    const savedUser = localStorage.getItem("usuario");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.usuario);
        localStorage.setItem("usuario", JSON.stringify(data.user));
        setShowAuth(false)
        return { success: true, message: "Inicio de sesión exitoso" };
      } else {
        return { success: false, message: data.message || "Error de login" };
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      return { success: false, message: "Error de conexión con el servidor" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, showAuth, setShowAuth }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

