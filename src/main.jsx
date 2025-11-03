import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Home from "./pages/Home";
import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router"
import { CartProvider } from "./context/cardContext";
import Menu from "./pages/Menu";
import AppLayout from "./layout/AppLayout";
import { AuthProvider, useAuth } from "./context/authContext";

import ProductDetails from "./pages/ProductDetails";
import Pagos from "./pages/Pagos";

async function authMiddleware({ request, context }) {
  const { user, setShowAuth } = await useAuth();
  context.set(user);
  if (!user) {
    setShowAuth(true)
    throw redirect(-1);
  }
  context.set(userContext, user);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route element={<AppLayout/>} >
              <Route index element={<Home/>}/>
              <Route path="menu" element={<Menu/>}/>
              <Route path="personalizacion/:productId" element={<ProductDetails/>}/>
              <Route path="pago" middleware={[authMiddleware]}  element={<Pagos/>}/>
            </Route>         
          </Routes>
        </AuthProvider>  
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);