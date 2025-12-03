import React, { createContext, useContext, useEffect, useState } from "react";

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

   // ✔️ LOGIN
        const login = async (email, contrasena) => {
          try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, contrasena }),
            });

            const data = await response.json();

            if (!response.ok) {
              return { success: false, message: data.message || "Credenciales inválidas" };
            }

            // 📌 IMPORTANTE: aquí agregamos el rol y guardamos todo
            const usuarioData = {
              id: data.usuario.id_usuario,
              nombre: data.usuario.nombre,
              email: data.usuario.email,
              rol: data.usuario.rolNombre, // 👈 Guardar rol
            };

            setUser(usuarioData);

            localStorage.setItem("usuario", JSON.stringify(usuarioData));
            localStorage.setItem("token", data.token);

            return { success: true, message: "Inicio exitoso", rol: usuarioData.rol };

          } catch (error) {
            return { success: false, message: "Error de conexión con el servidor" };
          }
        };

  


      const registerUser = async (formData) => {
        try {
          const response = await fetch("http://localhost:8080/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });

          const data = await response.json();

          if (response.ok) {
            return { success: true, data };
          }

          return { success: false, message: data.message };

        } catch (error) {
          return { success: false, message: "Error de conexión" };
        }
      };

      // ✔️ LOGOUT
      const logout = () => {
        setUser(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
      };
      
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registerUser,
        isAuthenticated: !!user,
        showAuth,
        setShowAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
