import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cardContext";


function DetallePedido() {
  const { idDetalle } = useParams();
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state } = useCart()

  const products = state.cartItems
  console.log(products)

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

  //const { pedido, producto, cantidad, precioUnitario, subtotal } = detalle;

  return (
    <>
      
      <main className="container py-4">
        <div className="card p-4 shadow-sm">
          <h2 className="text-center mb-4">Detalle del Pedido</h2>

          {
            products.map((producto) => {
              return (
                <div className="card mb-4">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={"http://localhost:8080" + producto.imagenUrl}
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
                        <p className="card-text"><strong>Cantidad:</strong> {producto.quantity}</p>
                        <p className="card-text"><strong>Precio unitario:</strong> ${producto.precioBase}</p>
                        <p className="card-text"><strong>Subtotal:</strong> ${producto.quantity*producto.precioBase}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          

          {/* Totales */}
          <div className="text-end">
            <h5>Total a pagar: <strong></strong></h5>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetallePedido;
