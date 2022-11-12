import React from "react";
import "../styles/CarouselPromociones.css";
import Promo from "../images/promo.png";

class CarouselPromociones extends React.Component {
  render() {
    return (
      <div id="carousel-promos">
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="true"
        >
          <div class="carousel-inner carousel-body">
            {this.props.promociones.map((element, index) => {
              if (index === 0) {
                return (
                  <div class="carousel-item active">
                    <div class="row">
                      <div class="col-sm-12 col-lg-8">
                        <img
                          src={element.imagen}
                          class="d-block w-100 carousel-promo-img"
                          alt={element.nombre}
                        />
                        <div class="d-lg-none d-sm-block carousel-caption text-center">
                          <h4 className="text-center info-carousel-promo-title">
                            {element.nombre}
                          </h4>
                          <div className="contenedor-img">
                            <img
                              src={Promo}
                              alt="promo"
                              className="precio-promo-img"
                            ></img>
                            <div className="centrado-img">
                              <p className="info-carousel-promo-precio">
                                <b>
                                  $ {element.precio.toLocaleString("de-DE")}
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="d-none d-lg-block col-4 my-auto">
                        <h5 className="text-center info-carousel-promo-title">
                          {element.nombre}
                        </h5>
                        <p className="info-carousel-promo-descripcion">
                          {element.descripcion}
                        </p>
                        <div class="row">
                          <div class="col-12 text-center">
                            <div className="contenedor-img">
                              <img
                                src={Promo}
                                alt="promo"
                                className="precio-promo-img"
                              ></img>
                              <div className="centrado-img">
                                <p className="info-carousel-promo-precio">
                                  <b>
                                    $ {element.precio.toLocaleString("de-DE")}
                                  </b>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div class="carousel-item">
                  <div class="row">
                    <div class="col-sm-12 col-lg-8">
                      <img
                        src={element.imagen}
                        class="d-block w-100 carousel-promo-img"
                        alt={element.nombre}
                      />
                      <div class="d-lg-none d-sm-block carousel-caption text-center">
                        <h5 className="text-center info-carousel-promo-title">
                          {element.nombre}
                        </h5>
                        <div className="contenedor-img">
                          <img
                            src={Promo}
                            alt="promo"
                            className="precio-promo-img"
                          ></img>
                          <div className="centrado-img">
                            <p className="info-carousel-promo-precio">
                              <b>$ {element.precio.toLocaleString("de-DE")}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="d-none d-lg-block col-4 my-auto">
                      <h5 className="text-center info-carousel-promo-title">
                        {element.nombre}
                      </h5>
                      <p className="info-carousel-promo-descripcion">
                        {element.descripcion}
                      </p>
                      <div class="row">
                        <div class="col-12 text-center">
                          <div className="contenedor-img">
                            <img
                              src={Promo}
                              alt="promo"
                              className="precio-promo-img"
                            ></img>
                            <div className="centrado-img">
                              <p className="info-carousel-promo-precio">
                                <b>
                                  $ {element.precio.toLocaleString("de-DE")}
                                </b>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
}

export default CarouselPromociones;
