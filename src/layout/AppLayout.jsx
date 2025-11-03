import React, { useState } from "react";
import Header from "../components/component/Header";
import Footer from "../components/component/Footer";
import CartModal from "../components/component/CartModal";
import AuthModal from "../components/component/AuthModal"; // 👈 nuevo import
import { Outlet } from "react-router";
import { useCart } from "../context/cardContext";
import { useAuth } from "../context/authContext";

function AppLayout() {
  const { state, dispatch } = useCart();
  const { showAuth, setShowAuth } = useAuth();

  const [showCart, setShowCart] = useState(false); // 👈 estado para modal de login

  const updateQuantity = (id) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id })
  };

  const decreaseQuantity = (id) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id })
  };

  const removeItem = (id) => {
    
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  };

  return (
    <>
      {/* 🧭 Header con eventos de carrito y login */}
      <Header
        cartCount={state.cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        onUserClick={() => setShowAuth(true)} // 👈 aquí abrimos el modal de usuario
      />

      <Outlet/>

      

      <Footer />

      {/* 🛍️ Modal Carrito */}
      <CartModal
        show={showCart}
        cartItems={state.cartItems}
        onClose={() => setShowCart(false)}
        updateQuantity={updateQuantity}
        decreaseQuantity={decreaseQuantity}
        removeItem={removeItem}
      />

      {/* 👤 Modal Inicio de Sesión / Crear Cuenta */}
      <AuthModal
        show={showAuth}
        onClose={() => setShowAuth(false)}
      />
    </>
  );
}

export default AppLayout;