import React from "react";
import { Link } from 'react-router'

import { useAuth } from "../../context/authContext";
//import  { menu } from '../component/Products'


function HeaderAdmin({ cartCount, onCartClick, onUserClick }) {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <header className="sh-header">
      <div className="container">
        <nav className="sh-header__nav">
        <ul className="left">
          <li><Link to="/admin/gestionusuarios">Usuarios</Link></li>
          <li><Link to="/admin/gestionpedidos">Pedidos</Link></li>
          <li><Link to="/admin/gestionproductos">Productos</Link></li>
        </ul>

          <div  className="brand"><Link to="/">
            <div className="brand__sup">Sweet</div>
            <div className="brand__main">Ha-ven</div>
            <div className="brand__underline"></div>
            </Link>
          </div>

          <ul className="right">
            {/* SI NO ESTÁ LOGUEADO → mostrar login */}
            {!isAuthenticated ? (
              <>
                <li><Link to="login">👤</Link></li>
              </>
            ) : (
              <>
                {/* SI ESTÁ LOGUEADO → mostrar nombre + logout */}
                <li className="user-name">
                  👤 {user?.nombre || user?.email}
                </li>

                <li>
                  <button className="icon-btn" onClick={logout}>
                    🔓 Logout
                  </button>
                </li>
              </>
            )}

            {/* Favoritos */}
            
            {/* Carrito */}
           
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default HeaderAdmin;