import React, { useState } from "react";

import HeaderAdmin from "../components/component/HeaderAdmin";


function Inventario() {
  
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    idProducto: null,
    nombre: "",
    marca: "",
    categoria: "",
    proveedor: "",
    stock: "",
    stockMinimo: 10,
    precio: "",
    estado: "disponible",
    descripcion: "",
    mensaje: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  // =========================
  // MANEJO DEL FORMULARIO
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.stock || !form.precio) {
      alert("Por favor complete los campos obligatorios.");
      return;
    }

    if (isEditing) {
      // actualizar
      setProductos(productos.map(p => 
        p.idProducto === form.idProducto ? form : p
      ));
      setIsEditing(false);
    } else {
      // crear nuevo
      setProductos([...productos, { ...form, idProducto: productos.length + 1 }]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({
      idProducto: null,
      nombre: "",
      marca: "",
      categoria: "",
      proveedor: "",
      stock: "",
      stockMinimo: 10,
      precio: "",
      estado: "disponible",
      descripcion: "",
      mensaje: ""
    });
    setIsEditing(false);
  };

  // =========================
  // EDITAR PRODUCTO
  // =========================
  const editProducto = (producto) => {
    setForm(producto);
    setIsEditing(true);
  };

  // =========================
  // ELIMINAR PRODUCTO
  // =========================
  const deleteProducto = (id) => {
    setProductos(productos.filter(p => p.idProducto !== id));
  };


  return (
    <>
    <HeaderAdmin/>
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
                <label className="form-label">Marca</label>
                <input
                  id="marca"
                  type="text"
                  className="form-control"
                  value={form.marca}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Categoría</label>
                <input
                  id="categoria"
                  type="text"
                  className="form-control"
                  value={form.categoria}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Proveedor</label>
                <input
                  id="proveedor"
                  type="text"
                  className="form-control"
                  value={form.proveedor}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Stock *</label>
                <input
                  id="stock"
                  type="number"
                  className="form-control"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Stock Mínimo</label>
                <input
                  id="stockMinimo"
                  type="number"
                  className="form-control"
                  value={form.stockMinimo}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Precio *</label>
                <input
                  id="precio"
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={form.precio}
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
                  <option value="disponible">Disponible</option>
                  <option value="agotado">Agotado</option>
                  <option value="descontinuado">Descontinuado</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea
                  id="descripcion"
                  className="form-control"
                  rows="3"
                  value={form.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-12">
                <label className="form-label">Mensaje</label>
                <textarea
                  id="mensaje"
                  className="form-control"
                  rows="3"
                  value={form.mensaje}
                  onChange={handleChange}
                ></textarea>
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
          <h5 className="mb-0"><i className="bi bi-list"></i> Lista de Productos</h5>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                  <th>Mensaje</th>
                </tr>
              </thead>

              <tbody>
                {productos.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No hay productos registrados
                    </td>
                  </tr>
                ) : (
                  productos.map((p) => (
                    <tr key={p.idProducto}>
                      <td>{p.idProducto}</td>
                      <td>{p.nombre}</td>
                      <td>{p.marca || "N/A"}</td>
                      <td>{p.categoria || "N/A"}</td>

                      <td>
                        <span
                          className={`badge bg-${
                            p.stock <= p.stockMinimo ? "danger" : "success"
                          }`}
                        >
                          {p.stock}
                        </span>
                      </td>

                      <td>${p.precio}</td>

                      <td>
                        <span
                          className={`badge bg-${
                            p.estado === "disponible"
                              ? "success"
                              : p.estado === "agotado"
                              ? "danger"
                              : "secondary"
                          }`}
                        >
                          {p.estado}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => editProducto(p)}
                        >
                          <i className="bi bi-pencil"></i> Editar
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteProducto(p.idProducto)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
                        </button>
                      </td>

                      <td>{p.mensaje || "N/A"}</td>
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

export default Inventario;
