import React, { useContext, useState } from "react";
import { useAuth } from "../../context/authContext";

function Registro(){
  const { registerUser } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    email: "",
    contrasena: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    let e = {};
  
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.apellido.trim()) e.apellido = "El apellido es obligatorio";
    if (!form.telefono.trim()) e.telefono = "El teléfono es obligatorio";
    if (!form.direccion.trim()) e.direccion = "La dirección es obligatoria";
    if (!form.email.trim()) e.email = "El correo es obligatorio";
    if (!form.contrasena.trim()) e.contrasena = "La contraseña es obligatoria";
  
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const payload =  {
      nombre: form.nombre,
      apellido: form.apellido,
      email: form.email,   
      telefono: form.telefono,
      direccion: form.direccion,
      contrasena: form.contrasena,
      rolId: 2
    };

    const res = await registerUser(payload);

    if (res.success) {
      alert("Registro exitoso");
      window.location.href = "/login";
    } else {
      alert(res.message || "Error registrando usuario");
    }
  };


return(
  <div className="auth-container">
    <div className="auth-box">
      

      <h2>Crea tu cuenta</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={(e) => handleChange("nombre", e.target.value)}
        />
        {errors.nombre && <p className="error-text">{errors.nombre}</p>}

        <input
          type="text"
          placeholder="Apellido"
          value={form.apellido}
          onChange={(e) => handleChange("apellido", e.target.value)}
        />
        {errors.apellido && <p className="error-text">{errors.apellido}</p>}

        <div className="id-row">
          <select defaultValue="Telefono" className="id-type">
            <option value="Telefono">Teléfono</option>
            <option value="Movil">Móvil</option>
          </select>

          <input
            type="number"
            placeholder="Número"
            value={form.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
          />
        </div>
        {errors.telefono && (
          <p className="error-text">{errors.telefono}</p>
        )}

        <input
          type="text"
          placeholder="Direccion"
          value={form.direccion}
          onChange={(e) => handleChange("direccion", e.target.value)}
        />
        {errors.direccion && <p className="error-text">{errors.direccion  }</p>}

        <input 
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input 
          type="password"
          value={form.contrasena}
          onChange={(e) => handleChange("contrasena", e.target.value)}
        />
        {errors.contrasena && (
          <p className="error-text">{errors.contrasena}</p>
        )}

        <button className="btn-primary" type="submit">
          Crear cuenta
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  </div>

  )
}
export default Registro;