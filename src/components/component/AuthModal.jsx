import React, { useContext, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Registro from "./Registro";

const AuthModal = ({ show, onClose }) => {
  const { login,  registerUser} = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loginData, setLoginData] = useState({
    email: "",
    contrasena: "",
  });

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion:"",
    email: "",
    contrasena: "",
  });
  const [errors, setErrors] = useState({});

  if (!show) return null;

  //login

    const handleLogin = async () => {
      if (!loginData.email || !loginData.contrasena) {
        alert("Ingresa tus credenciales");
        return;
      }

    const res = await login(loginData.email, loginData.contrasena);

      if (!res.success) {
        alert(res.message);
        return;
      }

      // cerrar modal
      onClose();

      // redirección por rol
    const user = JSON.parse(localStorage.getItem("usuario"));

      if (user.rol === "ADMIN") navigate("/admin/inventario");
      else navigate("/");
    };

  

    const handleChange = (field, value) => {
      setFormData({ ...formData, [field]: value });
      setErrors({ ...errors, [field]: "" }); 
    };

  const validateStep3 = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.last.trim()) newErrors.last = "El apellido es obligatorio";
    if (!formData.telefono.trim()) newErrors.telefono = "El número de documento es obligatorio";
    if (!formData.day) newErrors.day = "Selecciona un día";
    if (!formData.month) newErrors.month = "Selecciona un mes";
    if (!formData.year.trim()) newErrors.year = "El año es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio";

    setErrors(newErrors);

    // si no hay errores, pasa al siguiente paso
    if (Object.keys(newErrors).length === 0) {
      setStep(4);
    }
  };

  return (
    
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}> 
        {/* Logo */}
        <div className="brand">
          <div className="brand__sup">Sweet</div>
          <div className="brand__main">Ha-ven</div>
          <div className="brand__underline"></div>
        </div>

        {/* Paso 1 */}
        {step === 1 && (
          <div className="auth-step">
            <h2 className="welcome-title">¡Hola! Bienvenido a</h2>
            <button className="btn-primary" onClick={() => setStep(2)}>
              Inicia Sesión
            </button>
            <button className="btn-primary" onClick={() => setStep(3)}>
              Crear Cuenta
            </button>
          </div>
        )}

        {/* Paso 2: Login */}
        {step === 2 && (
          <div className="auth-step">
            <h2 className="welcome-title">¡Hola! Bienvenido a</h2>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginData.contrasena}
              onChange={(e) => setLoginData({ ...loginData, contrasena: e.target.value })}
            />

            <button className="btn-primary" onClick={handleLogin}>Ingresar</button>
          </div>
        )}

        {/* Paso 3: Crear cuenta con validación */}
        {step === 3 && <Registro/>}

      </div>
    </div>
  );
};

export default AuthModal;