import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="sh-footer">
      <div className="footer-top">
        <div className="container top-content">
          <div className="brand-block">
            <div className="circle">sH</div>
            <p>
              En tu casa o en la nuestra, no importa dónde disfrutes, siempre te endulzaremos
              con el sabor único de nuestra pastelería. ¡Gracias por elegirnos!
            </p>
          </div>

          <div className="payments">
            <img src="/img/visa.png" alt="Visa" />
            <img src="/img/mastercard.png" alt="Mastercard" />
            <img src="/img/yape.png" alt="Yape" />
            <img src="/img/plin.png" alt="Plin" />
          </div>
        </div>
      </div>

      <div className="footer-mid">
        <div className="container cols">
          <div>
            <h4>Sweet Haven</h4>
            <ul>
              <li>Menú</li>
              <li>Contacto</li>
              <li>Nuestra Misión</li>
              <li>Personalizados</li>
            </ul>
          </div>
          <div>
            <h4>Categorías</h4>
            <ul>
              <li>Pastelería Salada</li>
              <li>Tortas</li>
              <li>Postres Tradicionales</li>
              <li>Bocaditos</li>
              <li>Cheesecakes</li>
              <li>Queques</li>
            </ul>
          </div>
          <div>
            <h4>Legales</h4>
            <ul>
              <li>Políticas de Privacidad</li>
              <li>Términos y condiciones</li>
              <li>Preguntas frecuentes</li>
              <li>Derechos Arco</li>
            </ul>
          </div>
          <div className="social">
            <h4>Síguenos a través de:</h4>
            <div className="social-box">
              <FaFacebookF />
              <FaInstagram />
              <FaXTwitter />
              <FaLinkedinIn />
            </div>
            <div className="claims">📖 LIBRO DE RECLAMACIONES</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          Sweet Haven © {new Date().getFullYear()} - Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
export default Footer;
