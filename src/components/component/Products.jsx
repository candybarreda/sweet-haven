import { Link } from "react-router";
import productsData from "../../products.json";



function Products() {
  
  return (
    <section className="sh-featured">
      <div className="container">
        <h2 className="section-title">
          Nuestros Pasteles Estrella <img src="/img/bunny.png" alt="" />
        </h2>
        <div className="grid">
          {productsData.map((it, i) => (
            <article key={i} className="card">
              <div className="thumb"><img src={it.image} alt={it.title} /></div>
              <div className="body">
                <h3>{it.title}</h3>
                <p className="desc">{it.desc}</p>
                <div className="meta">
                  <span className="price">S/{it.price}</span>
                  <Link  to={`/personalizacion/${it.id}`}>
                    <button className="btn btn-chip" >
                    Personalizar 🧺
                  </button>
                  </Link>
                  
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Products;