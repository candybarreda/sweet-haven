import { Link, useLocation, useMatch, useRoutes } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { getProductos } from "../../productos.js";



function Producto({ categoryId, onAddToCart }) {
  const [productos, setProducts] = useState([]);

  const showAddCart = useMemo(() => categoryId === 1, [categoryId]);
  useEffect(() => {
    cargarProductos(categoryId);
  }, []);

  const cargarProductos = async (categoryId) => {
    try {
      const data = await getProductos(categoryId);
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };
  

  
  return (
    <section className="sh-featured">
      <div className="container">
        <h2 className="section-title">
          Nuestros Pasteles Estrella <img src="/img/bunny.png" alt="" />
        </h2>

        <div className="grid">
          {productos.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            productos.map((producto, i) => (
              <article key={i} className="card">
                <div className="thumb">
                  <img src={`http://localhost:8080${producto.imagenUrl}`} alt={producto.nombre} />
                </div>

                <div className="body">
                  <h3>{producto.nombre}</h3>
                  <p className="desc">{}</p>

                  <div className="meta">
                    <span className="price">S/{producto.precioBase}</span>

                    {
                      showAddCart ? (
                        <button 
                        type="button"
                        className="btn btn-success px-4"
                        onClick={() => onAddToCart(producto)} 
                        
                        >
                          Agregar al carrito 🛒
                        </button>
                      ) : 
                      <Link to={`/personalizacion/${producto.idProducto}`}>
                        <button className="btn btn-chip" >
                          Personalizar 🧺
                        </button>
                      </Link>
                    }
                    
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Producto;
