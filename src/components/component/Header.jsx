import React from "react";
import { Link } from 'react-router'


function Header({ cartCount, onCartClick, onUserClick }) {
  return (
    <header className="sh-header">
      <div className="container">
        <nav className="sh-header__nav">
          <ul className="left">
            <li><Link to="menu">Menú</Link></li>
            <li><Link to="#">Contacto</Link></li>
            <li><Link to="#">Nuestra Misión</Link></li>
            <li><Link to="personalizacion">Personalizados</Link></li>
          </ul>

          <div  className="brand"><Link to="/">
            <div className="brand__sup">Sweet</div>
            <div className="brand__main">Ha-ven</div>
            <div className="brand__underline"></div>
            </Link>
          </div>

          <ul className="right">
            <li><a href="#" aria-label="Buscar">🔍</a></li>
            <li>
              <button
                className="icon-btn"
                onClick={onUserClick}
                aria-label="Usuario"
              >
                👤
              </button>
            </li>
            <li><a href="#" aria-label="Favoritos">♡</a></li>
            <li>
              <button
                className="icon-btn"
                onClick={onCartClick}
                aria-label="Carrito"
              >
                🛒
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;