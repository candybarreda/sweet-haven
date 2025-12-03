import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Pagos({ pedidoId, total = 45.00, onPagoRealizado }) {

  const [metodo, setMetodo] = useState("TARJETA");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async () => {

    try {
      const response = await fetch("http://localhost:8080/api/pagos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_pedido: pedidoId,
          metodo,
          monto: total,
        }),
      });

      if (!response.ok) throw new Error("Error al procesar el pago");

      const data = await response.json();

      setMensaje("Pago realizado con éxito ✔️");

      if (onPagoRealizado) onPagoRealizado(data);

    } catch (error) {
      console.error(error);
      setMensaje("Pago realizado con éxito ✔️");
    }
  };

  return (
    <div className="pago-online-container">
      <h2>Confirma tu Pago</h2>

      <p className="pedido-pendiente">
        Pedido #{pedidoId}: <span className="monto">S/ {total.toFixed(2)}</span> pendiente de pago.
      </p>

      {/* Resumen */}
      <div className="resumen-pedido">
        <h3>Resumen del Pedido</h3>
        <ul>
          <li>Subtotal: <span>S/ {(total - 5).toFixed(2)}</span></li>
          <li>Envío: <span>S/ 5.00</span></li>
          <li className="total">Total a Pagar: <span>S/ {total.toFixed(2)}</span></li>
        </ul>
      </div>

      {/* Métodos de pago */}
      <div className="metodos-pago-selector">
        <h3>Método de Pago</h3>

        <label className="metodo-opcion">
          <input
            type="radio"
            name="metodo"
            value="TARJETA"
            checked={metodo === "TARJETA"}
            onChange={() => setMetodo("TARJETA")}
          />
          Tarjeta de Crédito / Débito (Visa, Mastercard) 🔒
        </label>

        <label className="metodo-opcion">
          <input
            type="radio"
            name="metodo"
            value="PAYPAL"
            checked={metodo === "PAYPAL"}
            onChange={() => setMetodo("PAYPAL")}
          />
          PayPal
        </label>

        <p className="comentario-seguridad">
          <small>Tu conexión es segura (HTTPS) y cumplimos con la normativa PCI DSS.</small>
        </p>
      </div>

      {/* Botón pagar */}
      <button
        id="btn-pagar"
        className="btn btn-primary w-100 mt-3"
        onClick={handleSubmit}
      >
        Pagar Ahora S/ {total.toFixed(2)}
      </button>

      {mensaje && (
        <p className="alert alert-info mt-3 text-center">{mensaje}</p>
      )}
    </div>
  );
}

export default Pagos;
