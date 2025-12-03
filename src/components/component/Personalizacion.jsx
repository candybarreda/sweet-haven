import React, { useMemo, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";

function Personalizacion({ onAddToCart, product }) {
  
  const [personalizaciones, setPersonalizaciones] = useState([]);
 
  if (!product) return <p className="text-center mt-5">Cargando...</p>;

  const categorias = product.categoriaPersonalizacion;

  const onChange = (e) => {
    const categoria = e.target.name.split('personalizacion-')[1];
    const personalizacion = { categoria, personalizacion: e.target.value }
    const existedPersonalization = personalizaciones.findIndex(p => p.categoria === categoria)
    if(existedPersonalization === -1){
      setPersonalizaciones((e) => [...e, personalizacion]);
      return;
    }
    const _personalizaciones = personalizaciones.filter((p) => p.categoria === categoria);
    setPersonalizaciones((e) => [..._personalizaciones, personalizacion])
  }

  const onSendToCart = () => {
    const productConPersonalizaciones = { ...product, personalizaciones }
    console.log(productConPersonalizaciones)
    onAddToCart(productConPersonalizaciones)
  }
  
  return (

      <div className="container my-5">
      <div className="row align-items-start">
        
        {/* IMAGENES */}
        <div className="col-md-6 text-center">
          <img
            src={`http://localhost:8080${product.imagenUrl}`}
            alt={product.nombre}
            className="img-fluid rounded shadow-sm mb-3"
            style={{ maxWidth: "80%" }}
          />
        </div>

        {/* INFORMACIÓN */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-2">{product.nombre}</h2>

          <p className="text-muted">
            Desde:{" "}
            <span className="fw-semibold">
              S/{product.precioBase.toFixed(2)}
            </span>
          </p>

          <p className="text-secondary">
            <small>{product.descripcion}</small>
          </p>

          {/* FORMULARIO DE PERSONALIZACIONES */}
          <form>
            {categorias.map((categoria) => (
              <div className="mb-3" key={categoria.idCategoria}>
                <label className="form-label fw-semibold">
                  {categoria.nombre}
                </label>

                <select className="form-select" onChange={onChange} name={`personalizacion-${categoria.id}`}>
                  <option value="">Seleccionar {categoria.nombre}</option>

                  {categoria.personalizaciones
                    .map((p) => (
                      <option key={p.id} value={p.idPersonalizacion}>{p.nombre}</option>
                    ))}
                </select>
              </div>
            ))}

            {/* BOTÓN AGREGAR AL CARRITO */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="fw-bold mb-0">
                S/{product.precioBase.toFixed(2)}
              </h4>

              <button
                type="button"
                className="btn btn-success px-4"
                onClick={onSendToCart}
              >
                Añadir al carrito
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      
   
    );
  }
 
export default Personalizacion;