import React, { useContext, useState } from "react";
import { useAuth } from "../../context/authContext";

const AuthModal = ({ show, onClose }) => {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const handleLogin = async () => {
  try {
    await login(loginData.username, loginData.password)
   
    } catch (error) {
      console.error("Error:", error);
    }
};

  const [errors, setErrors] = useState({});

  if (!show) return null;

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" }); 
  };

  const validateStep3 = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio";
    if (!formData.last.trim()) newErrors.last = "El apellido es obligatorio";
    if (!formData.idNumber.trim()) newErrors.idNumber = "El número de documento es obligatorio";
    if (!formData.day) newErrors.day = "Selecciona un día";
    if (!formData.month) newErrors.month = "Selecciona un mes";
    if (!formData.year.trim()) newErrors.year = "El año es obligatorio";

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
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginData.contrasena}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />

            <button className="btn-primary" onClick={handleLogin}>Ingresar</button>
          </div>
        )}

        {/* Paso 3: Crear cuenta con validación */}
        {step === 3 && (
          <div className="auth-step">
            <h2 className="welcome-title">Crea tu cuenta</h2>

            {/* Nombre */}
            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            {/* Apellido */}
            <input
              type="text"
              placeholder="Apellido"
              value={formData.last}
              onChange={(e) => handleChange("last", e.target.value)}
            />
            {errors.last && <p className="error-text">{errors.last}</p>}

            {/* Documento */}
            <label className="label-tiny" htmlFor="id-number">
              Documento de identidad
            </label>
            <div className="id-row">
              <select className="id-type" defaultValue="DNI">
                <option value="DNI">DNI</option>
                <option value="CE">CE</option>
                <option value="PAS">Pasaporte</option>
              </select>
              <input
                type="text"
                placeholder="Número"
                value={formData.idNumber}
                onChange={(e) => handleChange("idNumber", e.target.value)}
              />
            </div>
            {errors.idNumber && <p className="error-text">{errors.idNumber}</p>}

            {/* Fecha de nacimiento */}
            <label className="label-tiny" htmlFor="dob-day">
              Fecha de Nacimiento
            </label>
            <div className="dob-row">
              <select
                value={formData.day}
                onChange={(e) => handleChange("day", e.target.value)}
                className="short-input"
              >
                <option value="">Día</option>
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <select
                value={formData.month}
                onChange={(e) => handleChange("month", e.target.value)}
                className="short-input"
              >
                <option value="">Mes</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Año"
                className="short-input"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                inputMode="numeric"
              />
            </div>
            {(errors.day || errors.month || errors.year) && (
              <p className="error-text">
                {errors.day || errors.month || errors.year}
              </p>
            )}

            <button className="btn-primary" onClick={validateStep3}>
              Continuar
            </button>
          </div>
        )}

        {/* Paso 4: Crear clave */}
        {step === 4 && (
          <div className="auth-step">
            <h2 className="welcome-title red">Escribe una clave</h2>
            <p className="info-text">Úsala para mantener tu seguridad</p>
            <input type="email" placeholder="Correo electrónico" />
            <input type="password" placeholder="Contraseña" />
            <input type="password" placeholder="Confirmar contraseña" />

            <label className="terms">
              <input type="checkbox" />
              <span>
                Acepto sus Términos y Condiciones, así como el envío de
                comunicación de la marca Sweet Haven y el tratamiento de mis
                datos personales bajo las condiciones de la Política de
                Privacidad.
              </span>
            </label>

            <button className="btn-primary">Crear</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;