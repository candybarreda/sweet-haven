import React from "react";
import { Link, useNavigate, useNavigation } from "react-router";
import { useAuth } from "../../context/authContext";

const CartModal = ({ show, cartItems, onClose, updateQuantity, decreaseQuantity, removeItem }) => {
  const { isAuthenticated, setShowAuth, user } = useAuth();
  const navigator = useNavigate()
  if (!show) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const envio = 0;
  const total = subtotal + envio;

  const goToPay = () => {
    console.log({
      state: 'gotopage',
      data: {
        isAuthenticated,
        user
      }
    })
    if (isAuthenticated) return navigator('/pago');
    onClose()
    setShowAuth(true)
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="cart-title">Revisa tu pedido antes de la entrega</h2>
        <hr />
        <div className="cart-details">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío 🛒</p>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="cart-desc">{item.desc}</p>
                  <div className="cart-price">S/{item.price}</div>
                  <div className="cart-actions">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      ➖
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id)}
                    >
                      ➕
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>S/{subtotal}</span>
            </div>
            <div className="summary-line">
              <span>Envío:</span>
              <span>S/{envio}</span>
            </div>
            <div className="summary-total">
              <span>TOTAL</span>
              <span>S/{total}</span>
            </div>
            <button className="btn-primary" onClick={() => goToPay()}>Proceder Pago</button>  
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;