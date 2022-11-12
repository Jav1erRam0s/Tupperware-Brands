import React from "react";
import Footer from "../components/Footer.js";
import "../styles/Contactenos.css";
import Jav1erRam0s from "../images/Jav1erRam0s.png";
import whatsapp from "../images/whatsapp.png";
import telegram from "../images/telegram.png";

class Contactenos extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <div class="row">
            <div class="col-sm-12 col-lg-6">
              <h3 className="infoContactenosTitle">A considerar...</h3>
              <ul className="infoContactenos">
                <li>Los productos son 100% Tupperware y nuevos.</li>
                <li>
                  Para una compra segura, lea las dimensiones del producto.
                </li>
                <li>
                  Los pedidos realizados por folleto, tardan 7 dias en llegar
                  desde el momento en que cierra la campaña.
                </li>
                <li>
                  Escribinos ante cualquier inquietud. Tu consulta no molesta.
                </li>
              </ul>

              <div class="row">
                <div class="col-12" align="center">
                  <div id="tarjeta">
                    <div class="tarjeta-body">
                      <div class="row">
                        <div class="col-5 tarjera-img">
                          <img src={Jav1erRam0s} alt="Jav1erRam0s" />
                        </div>
                        <div class="col-7">
                          <h5 className="tarjetaName">Javi</h5>
                          <div className="tarjetaData">
                            <a
                              href="https://wa.me/5491132432819"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={whatsapp} alt="iconWht" />
                            </a>
                            <a
                              href="https://t.me/Jav1erRam0s"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src={telegram} alt="iconTgm" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-12 col-md-12 col-lg-6">
              <div id="map">
                <h3 className="infoMap">
                  Estamos ubicados en Virreyes, zona norte.
                </h3>
                <iframe
                  title="map-virreyes"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26316.886341832003!2d-58.572935099999995!3d-34.46202650000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca54617ff2139%3A0xb160e5a9bd7bc597!2sB1645%20Virreyes%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1663942497508!5m2!1ses-419!2sar"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Contactenos;
