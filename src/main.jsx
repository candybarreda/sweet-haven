import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"; 
import Home from "./pages/Home";
import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import { CartProvider } from "./context/cardContext";
import Menu from "./pages/Menu";
import AppLayout from "./layout/AppLayout";
import { AuthProvider } from "./context/authContext";
import Login from "./pages/Login";
import RegistroPage from "./pages/RegistroPage";
import ProductDetails from "./pages/ProductDetails";
import Pagos from "./pages/Pagos";
import Personalizado from "./pages/Personalizado";
import Inventario from "./pages/Inventario";
import GestionUsuarios from "./pages/GestionUsuario";
import DetallePersonalizado from "./pages/DetallePersonalizado";
import DetallePedido from "./pages/DetallePedido";

// 🔐 Importar ProtectedRoute
import { ProtectedRoute } from "./routes/ProtectesRoute";
import GestionProductos from "./pages/GestionProductos";
import GestionPedidos from "./pages/GestionPedidos";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Routes>

            {/* Layout principal */}
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu/>} />
              <Route path="personalizados" element={<Personalizado />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<RegistroPage />} />
              <Route path="personalizacion/:productId" element={<ProductDetails />} />
              
              <Route path="detallepersonalizado" element={<DetallePersonalizado />}/>
              <Route path="detallepedido" element={<DetallePedido/>}/>
              
              
              
              {/* 🔐 Ruta protegida SOLO usuarios logueados */}
              <Route path="pago" element={
                  <ProtectedRoute>
                    <Pagos />
                    
                  </ProtectedRoute>
                }
              />
            </Route>
           

            {/* 🔐 Rutas admin */}
            <Route path="admin" element={<ProtectedRoute only={["ADMIN"]} />}>
              <Route path="/admin/gestionusuarios" element={<GestionUsuarios/>}/>
              <Route path="/admin/gestionproductos" element={<GestionProductos/>}/>
              <Route path="/admin/gestionpedidos" element={<GestionPedidos/>}/>
              <Route path="/admin/inventario" element={<Inventario/>}/>
            </Route>

          </Routes>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
