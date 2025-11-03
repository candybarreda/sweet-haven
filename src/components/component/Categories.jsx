const CATS = [
  { title: "Pastelería Salada", img: "/img/salado.jpeg", color: "red" },
  { title: "Tortas", img: "/img/torta.jpeg", color: "beige" },
  { title: "Postres Tradicionales", img: "/img/suspiro.jpeg", color: "red" },
  { title: "Bocaditos", img: "/img/brownies.jpg", color: "beige" },
];

function Categories() {
  return (
    <section className="sh-cats">
      <div className="container">
        <div className="ribbon ribbon-top"></div>

        <div className="grid">
          {CATS.map((c, i) => (
            <div key={i} className="cat-card">
              <img src={c.img} alt={c.title} />
              <h3>{c.title}</h3>
              <button className={`btn btn-pill ${c.color === "red" ? "btn-primary" : "btn-cream"}`}>
                Más Información
              </button>
            </div>
          ))}
        </div>

        <div className="ribbon ribbon-bottom"></div>
      </div>
    </section>
  );
}
export default Categories;