import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cardContext";


function DetallePersonalizado() {
  const { idDetalle } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useCart()

  console.log(state);

  /*useEffect(() => {
    fetch(`http://localhost:8080/api/detallepersonalizado/${idDetalle}`)
      .then(res => res.json())
      .then(data => {
        setDetalle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando detalle:", err);
        setLoading(false);
      });
  }, [idDetalle]);

  if (loading) return <p>Cargando detalle...</p>;
  if (!detalle) return <p>No se encontró el detalle</p>;*/

  const { pedido, producto, cantidad, precioUnitario, subtotal } = detalle;

  return (
    <>
      
      <main className="container py-4">
        <div className="card p-4 shadow-sm">
          <h2 className="text-center mb-4">Detalle del Pedido #{pedido.idPedido}</h2>

          {/* Información del pedido */}
          <div className="mb-4">
            <h5>Información del Pedido</h5>
            <p><strong>Fecha:</strong> {new Date(pedido.fechaPedido).toLocaleString()}</p>
            <p><strong>Estado:</strong> {pedido.estado}</p>
            <p><strong>Total:</strong> ${pedido.total}</p>
          </div>

          {/* Información del producto */}
          <div className="card mb-4">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={producto.imagenUrl}
                  className="img-fluid rounded-start"
                  alt={producto.nombre}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <p className="card-text">
                    <strong>Categoría:</strong> {producto.categoria.nombre}
                  </p>
                  <p className="card-text"><strong>Cantidad:</strong> {cantidad}</p>
                  <p className="card-text"><strong>Precio unitario:</strong> ${precioUnitario}</p>
                  <p className="card-text"><strong>Subtotal:</strong> ${subtotal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de pagos */}
          <div className="mb-4">
            <h5>Pagos</h5>
            {pedido.pagos && pedido.pagos.length > 0 ? (
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Método</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.pagos.map(pago => (
                    <tr key={pago.idPago}>
                      <td>{pago.metodo}</td>
                      <td>${pago.monto}</td>
                      <td>{pago.estado}</td>
                      <td>{new Date(pago.fecha).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay pagos registrados.</p>
            )}
          </div>

          {/* Totales */}
          <div className="text-end">
            <h5>Total a pagar: <strong>${pedido.total}</strong></h5>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetallePersonalizado;
