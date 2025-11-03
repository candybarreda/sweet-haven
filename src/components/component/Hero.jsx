import { Link } from "react-router";

function Hero() {
  return (
    <section className="sh-hero">
      <div className="container sh-hero__grid">
        <div className="card img-left">
          <img src="/img/empanada2.jpg" alt="Producto salado" />
        </div>

        <div className="card img-center">
          <img src="/img/pastel.jpg" alt="Pastel principal" />
          <Link to="menu">
          <button className="btn btn-primary">ORDENA AQUÍ
          </button>
          </Link>
          
        </div>

        <div className="card img-right">
          <img src="/img/alfajor.jpg" alt="Dulce en frascos" />
        </div>
      </div>

      <div className="sh-hero__ornaments container">
        <img src="/img/loading.png"/>
      </div>

      <div className="sh-hero__ribbon"></div>
    </section>
  );
}
export default Hero;