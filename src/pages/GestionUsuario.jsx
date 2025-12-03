import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/component/HeaderAdmin";


function GestionUsuarios() {
  
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    id_usuario: null,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    contraseña: "",
    rol_id: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  // CARGAR LISTA DE USUARIOS (GET)
  useEffect(() => {
    fetch("http://localhost:8080/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error cargando usuarios", err));
  }, []);

  // =========================
  // MANEJO DEL FORMULARIO
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.email || !form.direccion ) {
      alert("Por favor complete los campos obligatorios.");
      return;
    }

    if (isEditing) {
      await fetch(`http://localhost:8080/api/usuarios/${form.id_usuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Usuario actualizado");
    }  else {
      // === POST ===
      await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Usuario creado");
    }

    // Recargar lista
    fetch("http://localhost:8080/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));

    resetForm();
  };

   // LIMPIAR FORMULARIO
  const resetForm = () => {
    setForm({
      id_usuario: null,
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      direccion: "",
      contraseña: "",
      rol_id: "",
    });
    setIsEditing(false);
  };

  // =========================
  // EDITAR 
  // =========================
  const editUsuario = (usuarios) => {
    setForm(usuarios);
    setIsEditing(true);
  };

  // =========================
  // ELIMINAR
  // =========================
  const deleteUsuario = (id) => {
    setUsuarios(usuarios.filter(p => p.id_usuario !== id));
  };


  return (
    <>
    <HeaderAdmin/>
    <main className="container-fluid py-4">

      <h1 className="mb-4">Gestión de Usuarios</h1>

      {/* ============ FORMULARIO ============ */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-box"></i>{" "}
            {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-3">
                <label className="form-label">Nombre *</label>
                <input
                  id="nombre"
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Apellido</label>
                <input
                id="apellido"
                  type="text"
                  className="form-control"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Email</label>
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Telefono</label>
                <input
                  id="telefono"
                  type="telefono"
                  className="form-control"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Direccion</label>
                <input
                  id="direccion"
                  type="direccion"
                  className="form-control"
                  value={form.direccion}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Contraseña</label>
                <input
                  id="contraseña"
                  type="contraseña"
                  className="form-control"
                  value={form.contraseña}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-info">
                <i className="bi bi-save"></i>{" "}
                {isEditing ? "Actualizar" : "Guardar"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                >
                  <i className="bi bi-x-circle"></i> Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* ============ TABLA ============ */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0"><i className="bi bi-list"></i> Lista de Usuarios</h5>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Contraseña</th>
                  <th>Rol_usuario</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  usuarios.map((p) => (
                    <tr key={p.id_usuario}>
                      <td>{p.id_usuario}</td>
                      <td>{p.nombre}</td>
                      <td>{p.apellido }</td>
                      <td>{p.email }</td>
                      <td>{p.telefono }</td>
                      <td>{p.direccion }</td>
                      <td>{p.contraseña}</td>
                      <td>{p.rol.rol_id}</td>

                      
                      

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => editUsuario(p)}
                        >
                          <i className="bi bi-pencil"></i> Editar
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteUsuario(p.id_usuario)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </td>

                      
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </main>
    
    
    </>
    
  );
}

export default GestionUsuarios;
