import React, { useState, useEffect } from "react";
import HeaderAdmin from "../components/component/HeaderAdmin";


function GestionPedidos() {
  
  const [pedido, setPedido] = useState([]);
  const [form, setForm] = useState({
    idPedido: null,
    idUsuario: "",
    fechaPedido:"",
    estado: 'PENDIENTE',
    total: "",
    
  });

  const [isEditing, setIsEditing] = useState(false);
  // CARGAR LISTA DE USUARIOS (GET)
  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos/detalle")
      .then(res => res.json())
      .then(data => setPedido(data))
      .catch(err => console.error("Error cargando Pedidos", err));
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

    if (!form.nombre || !form.precioBase || !form.idCategoria) {
      alert("Por favor complete los campos obligatorios.");
      return;
    }

    if (isEditing) {
      await fetch(`http://localhost:8080/api/pedidos/detalle/${form.idPedido}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Pedido actualizado");
    }  else {
      // === POST ===
      await fetch("http://localhost:8080/api/pedidos/detalle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Pedido creado");
    }

    // Recargar lista
    fetch("http://localhost:8080/api/pedidos/detalle")
      .then(res => res.json())
      .then(data => setPedido(data));

    resetForm();
  };

   // LIMPIAR FORMULARIO
  const resetForm = () => {
    setForm({
      idPedido: null,
      idUsuario: "",
      fechaPedido:"",
      estado: 'PENDIENTE',
      total: ""
    });
    setIsEditing(false);
  };

  // =========================
  // EDITAR 
  // =========================
  const editPedido = (pedido) => {
    setForm(pedido);
    setIsEditing(true);
  };

  // =========================
  // ELIMINAR 
  // =========================
  const deletePedido = (id) => {
    setPedido(pedido.filter(p => p.iPedido !== id));
  };


  return (
    <>
    <HeaderAdmin/>
    <main className="container-fluid py-4">

      <h1 className="mb-4">Gestión de Pedidos</h1>

      {/* ============ FORMULARIO ============ */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-box"></i>{" "}
            {isEditing ? "Editar pedido" : "Nuevo Pedido"}
          </h5>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              <div className="col-md-3">
                <label className="form-label">Usuario *</label>
                <input
                  id="idusuario"
                  type="text"
                  className="form-control"
                  value={form.idUsuario}
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
                  <option value="disponible">PENDIENTE</option>
                  <option value="inactivo">EN_PROCESO</option>
                  <option value="inactivo">ENTREGADO</option>
                  <option value="inactivo">CANCELADO</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Total</label>
                <input
                  id="direccion"
                  type="number"
                  className="form-control"
                  value={form.total}
                  onChange={handleChange}
                  required
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
          <h5 className="mb-0"><i className="bi bi-list"></i> Lista de Pedidos</h5>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>idUsuario</th>
                  <th>fechaPedido</th>
                  <th>estado</th>
                  <th>total</th>
                </tr>
              </thead>

              <tbody>
                {pedido.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center text-muted">
                      No hay pedido registrados
                    </td>
                  </tr>
                ) : (
                  pedido.map((p) => (
                    <tr key={p.idPedido}>
                      <td>{p.idPedido}</td>
                      <td>{p.idUsuario}</td>
                      <td>{p.fechaPedido || "N/A"}</td>
                      <td>{p.estado || "N/A"}</td>
                      <td>{p.total || "N/A"}</td>
                      

                      
                      

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-1"
                          onClick={() => editPedido(p)}
                        >
                          <i className="bi bi-pencil"></i> Editar
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deletePedido(p.idPedido)}
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

export default GestionPedidos;
