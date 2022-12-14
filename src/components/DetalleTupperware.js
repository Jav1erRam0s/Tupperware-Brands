import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Input } from "reactstrap";
import "../styles/DetalleTupperware.css";

class DetalleTupperware extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave() {
    this.props.closeModal();
  }

  render() {
    const slides = this.props.producto.imgvid.map((item, index) => {
      return (
        <div>
          {index === 0 && (
            <div class="carousel-item active carousel-item-slide">
              <img src={item} alt={item.index} />
            </div>
          )}
          {index !== 0 && item.startsWith("https://i.ibb") && (
            <div class="carousel-item carousel-item-slide">
              <img src={item} alt={item.index} />
            </div>
          )}
          {index !== 0 && item.startsWith("https://i.ibb") === false && (
            <div class="carousel-item carousel-item-slide">
              <iframe src={item} title={item.index}></iframe>
            </div>
          )}
        </div>
      );
    });

    return (
      <React.Fragment>
        <Modal isOpen={this.props.estadoModal} centered>
          <ModalHeader
            toggle={this.handleSave}
            cssModule={{ "modal-title": "w-100 text-center" }}
          >
            <span className="titleModal">
              <b>{this.props.producto.nombre}</b>
            </span>
          </ModalHeader>
          <ModalBody>
            <div
              id="carousel-Actions-Details-Indicators"
              class="carousel slide"
              data-bs-interval="false"
            >
              <div class="carousel-inner">{slides}</div>

              {this.props.producto.imgvid.length >= 2 && (
                <div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carousel-Actions-Details-Indicators"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carousel-Actions-Details-Indicators"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              )}
            </div>
            <br />
            <Input
              type="textarea"
              name="text"
              id="textAreaDescripcion"
              value={this.props.producto.descripcion}
            />
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default DetalleTupperware;
