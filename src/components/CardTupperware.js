import React from "react";
import "../styles/CardTupperware.css";
import DetalleTupperware from "./DetalleTupperware.js";

class CardTupperware extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estadoModal: false,
    };
  }

  showDetails = () => {
    this.setState({ estadoModal: true });
  };

  closeModal = () => {
    this.setState({ estadoModal: false });
  };

  render() {
    const producto = this.props.producto;

    return (
      <React.Fragment>
        <div class="card" onClick={this.showDetails}>
          <img
            src={producto.imgvid[0]}
            class="card-img-top"
            alt={producto.nombre}
          />
          <div class="card-body">
            <p class="card-text">
              <div className="centerH">
                <h5 className="titleCard">
                  <b>{producto.nombre}</b>
                </h5>
              </div>
              <div class=" mt-3 row precioStock">
                <div class="col-6">
                  <div className="centerH precio">
                    <h4>
                      <b>$ {producto.precio.toLocaleString("de-DE")}</b>
                    </h4>
                  </div>
                </div>
                {producto.stock === 0 && (
                  <div class="col-6">
                    <div className="centerH">
                      <span class="badge bg-danger">Sin stock</span>
                    </div>
                  </div>
                )}
                {producto.stock !== 0 && (
                  <div class="col-6">
                    <div className="centerH">
                      <span class="badge bg-info text-dark">
                        Stock x {producto.stock}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </p>
          </div>
        </div>

        <DetalleTupperware
          producto={producto}
          estadoModal={this.state.estadoModal}
          closeModal={this.closeModal}
        />
      </React.Fragment>
    );
  }
}

export default CardTupperware;
