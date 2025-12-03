import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/component/HeaderAdmin";


function GestionProductos() {
  
  const [productosTrad, setProductosTrad] = useState([]);
  const [form, setForm] = useState({
    id_producto: null,
    nombre: "",
    descripcion: "",
    precio_base: "",
    estado:'ACTIVO' ,
    id_categoria: "",
    imagen_url:"",
  });

  const [isEditing, setIsEditing] = useState(false);
  // CARGAR LISTA DE USUARIOS (GET)
  useEffect(() => {
    fetch(" http://localhost:8080/api/productos/tradicionales")
      .then(res => res.json())
      .then(data => setProductosTrad(data))
      .catch(err => console.error("Error cargando Productos", err));
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

    if (!form.nombre || !form.precio_base || !form.id_categoria) {
      alert("Por favor complete los campos obligatorios.");
      return;
    }

    if (isEditing) {
      await fetch(` http://localhost:8080/api/productos/tradicionales/${form.id_producto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Producto actualizado");
    }  else {
      // === POST ===
      await fetch(" http://localhost:8080/api/productos/tradicionales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Producto creado");
    }

    // Recargar lista
    fetch(" http://localhost:8080/api/productos/tradicionales")
      .then(res => res.json())
      .then(data => setProductosTrad(data));

    resetForm();
  };

   // LIMPIAR FORMULARIO
  const resetForm = () => {
    setForm({
      id_producto: null,
      nombre: "",
      descripcion: "",
      precio_base: "",
      estado: 'ACTIVO',
      id_categoria: "",
      imagen_url:"",
    });
    setIsEditing(false);
  };

  // =========================
  // EDITAR 
  // =========================
  const editProductosTrad = (producto) => {
    setForm(producto);
    setIsEditing(true);
  };

  // =========================
  // ELIMINAR
  // =========================
  const deleteProductoTrad = (id) => {
    setProductosTrad(productosTrad.filter(p => p.id_usuario !== id));
  };


  return (
    <>
     <HeaderAdmin />
      <main className="container-fluid py-4">
        <h1 className="mb-4">Gestión de Productos</h1>

        {/* ============ FORMULARIO ============ */}
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">
              <i className="bi bi-box"></i>{" "}
              {isEditing ? "Editar Producto" : "Nuevo Producto"}
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
                  <label className="form-label">Descripción *</label>
                  <input
                    id="descripcion"
                    type="text"
                    className="form-control"
                    value={form.descripcion}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Precio Base *</label>
                  <input
                    id="precio_base"
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={form.precio_base}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Estado</label>
                  <select
                    id="estado"
                    className="form-select"
                    value={form.estado}
                    onChange={handleChange}
                  >
                    <option value="ACTIVO">ACTIVO</option>
                    <option value="INACTIVO">INACTIVO</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Categoría *</label>
                  <input
                    id="id_categoria"
                    type="number"
                    className="form-control"
                    value={form.id_categoria}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">Imagen URL</label>
                  <input
                    id="imagen_url"
                    type="text"
                    className="form-control"
                    value={form.imagen_url}
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
            <h5 className="mb-0">
              <i className="bi bi-list"></i> Lista de Productos Tradicionales
            </h5>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio Base</th>
                    <th>Estado</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {productosTrad.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        No hay productos registrados
                      </td>
                    </tr>
                  ) : (
                    productosTrad.map((p, index) => (
                      <tr key={p.id_producto || index}>
                        <td>{p.id_producto}</td>
                        <td>{p.nombre}</td>
                        <td>{p.descripcion || "N/A"}</td>
                        <td>{p.precio_base || "N/A"}</td>
                        <td>{p.estado || "N/A"}</td>
                        <td>{p.id_categoria || "N/A"}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-1"
                            onClick={() => editProductosTrad(p)}
                          >
                            <i className="bi bi-pencil"></i> Editar
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteProductoTrad(p.id_producto)}
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

export default GestionProductos;
    
    
  