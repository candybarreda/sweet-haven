import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Pagos from "../../pages/Pagos";
import AuthModal from "./AuthModal";

const CartModal = ({
  show,
  cartItems,
  onClose,
  updateQuantity,
  decreaseQuantity,
  removeItem,
  clienteId
}) => {

  // TODOS LOS HOOKS ARRIBA
  const { isAuthenticated, showAuth, setShowAuth, user } = useAuth();
  const navigate = useNavigate();

  const [mostrarPago, setMostrarPago] = useState(false);
  const [pedidoId, setPedidoId] = useState(null);

  // Si el modal no debe mostrarse, se retorna DESPUÉS de llamar los hooks
  if (!show) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precioBase * item.quantity,
    0
  );

  const envio = 15;
  const total = subtotal + envio;

  const goToPay = async () => {
    try {
      if(!isAuthenticated){
        setShowAuth(true);
        return;
      }
      navigate('/detallepedido')
      return
      const response = await fetch("http://localhost:8080/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCliente: clienteId,
          total
        })
      });

      const data = await response.json();
      setPedidoId(data.idPedido);
      setMostrarPago(true);
    } catch (error) {
      console.error("Error al registrar pedido", error);
    }
  };

  const handlePagoRealizado = (pago) => {
    console.log("Pago realizado:", pago);
    alert("Pago realizado con éxito!");
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="cart-title">Revisa tu pedido antes de la entrega</h2>
        <hr />

        <div className="cart-details">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío 🛒</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.idProducto} className="cart-item">
                <img
                  src={`http://localhost:8080${item.imagenUrl}`}
                  alt={item.nombre}
                />
                <div className="cart-info">
                  <h4>{item.nombre}</h4>
                  <p className="cart-desc">{item.descripcion}</p>
                  <div className="cart-price">S/{item.precioBase}</div>

                  <div className="cart-actions">
                    <button
                      onClick={() => decreaseQuantity(item.idProducto)}
                      disabled={item.quantity <= 1}
                    >
                      ➖
                    </button>

                    <span>{item.quantity}</span>

                    {
                      item.categoria.nombre.toLowerCase() !== 'personalizado' && (
                        <button
                      onClick={() => updateQuantity(item.idProducto)}
                    >
                      ➕
                    </button> 
                      )
                    }
                    

                    <button
                      className="delete-btn"
                      onClick={() => removeItem(item.idProducto)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!mostrarPago ? (
          cartItems.length > 0 && (
            <div className="cart-summary">
              <div>Subtotal: S/{subtotal.toFixed(2)}</div>
              <div>Envío: S/{envio}</div>
              <div>Total: S/{total.toFixed(2)}</div>

              <button onClick={goToPay}>Proceder Pago</button>
            </div>
          )
        ) : (
          <Pagos
            pedidoId={pedidoId}
            total={total}
            onPagoRealizado={handlePagoRealizado}
          />
        )}
      </div>
      <AuthModal show={showAuth}/>
    </div>
  );
};

export default CartModal;
