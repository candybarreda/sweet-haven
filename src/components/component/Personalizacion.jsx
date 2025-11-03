import  React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";


 function Personalizacion({ onAddToCart, product })  {
  if (!product) return <p className="text-center mt-5">
    <img className="mx-auto" src='/img/cargando.svg'/>
    Cargando producto...</p>;

  return (
    <div className="container my-5">
      <div className="row align-items-start">
        {/* Imagen principal */}
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded shadow-sm mb-3"
            style={{ maxWidth: "80%" }}
          />
          <div>
            <img
              src={product.thumbnail}
              alt={`${product.title} mini`}
              className="img-thumbnail"
              style={{ width: "100px" }}
            />
          </div>
        </div>

        {/* Información del producto */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-2">{product.title}</h2>
          <p className="text-muted">
            Desde: <span className="fw-semibold">S/{product.price.toFixed(2)}</span>
          </p>

          <p className="text-secondary">
            <strong>Tiempo de elaboración:</strong> {product.time}
            <br />
            <small>{product.description}</small>
          </p>

          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">Porciones</label>
              <select className="form-select">
                <option>{Personalizacion.name}</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Tipo de sabor</label>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sabor"
                    id="tradicional"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="tradicional">
                    Sabores tradicionales
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sabor"
                    id="especial"
                  />
                  <label className="form-check-label" htmlFor="especial">
                    Sabores especiales
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Opción de Cake</label>
              <select className="form-select">
                <option>Chocolate</option>
                <option>Vainilla</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Relleno</label>
              <select className="form-select">
                <option>Buttercream</option>
                <option>Ganache</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Dedicatoria</label>
              <textarea
                className="form-control"
                placeholder="Escribe una dedicatoria"
                rows="2"
              ></textarea>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4 className="fw-bold mb-0">S/{product.price.toFixed(2)}</h4>
              <button type="button" className="btn btn-success px-4" onClick={() => onAddToCart(product)}>
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