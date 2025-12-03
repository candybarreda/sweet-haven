import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { redirect, useNavigate, Outlet } from "react-router"

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", contrasena: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { rol } = await login(form.email, form.contrasena);
      console.log("aqui toy")
      console.log(rol)
      if(rol === "ADMIN") {
        navigate("/admin/gestionproductos")
        return;
      }
      navigate("/")
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  return (
    <main>
      <div className="auth-container">
        <div className="auth-box">

          {/* LOGO */}
          <div className="brand">
            <div className="brand__sup">Sweet</div>
            <div className="brand__main">Ha-ven</div>
            <div className="brand__underline"></div>
          </div>

          <h2>Inicia Sesión</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={form.contrasena}
              onChange={(e) =>
                setForm({ ...form, contrasena: e.target.value })
              }
              required
            />

            <button className="btn-primary" type="submit">
              Ingresar
            </button>
          </form>

          <p>
            ¿No tienes una cuenta?{" "}
            <a href="/registro">Regístrate aquí</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
