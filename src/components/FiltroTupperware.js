import React from "react";
import "../styles/FiltroTupperware.css";

class FiltroTupperware extends React.Component {
  constructor(props) {
    super(props);
    this.filtrar = this.filtrar.bind(this);
    this.state = {
      valorInput: "",
    };
  }

  changeValueInput = (e) => {
    var elemProducto = document.getElementById("input-producto");
    var valueProducto = elemProducto.value;
    this.setState({
      valorInput: valueProducto,
    });
    this.filtrar();
  };

  filtrar = () => {
    var elemProducto = document.getElementById("input-producto");
    var valueProducto = elemProducto.value;

    var elemPrecio = document.getElementById("select-precio");
    var valuePrecio = elemPrecio.value;

    var elemCapacidad = document.getElementById("select-capacidad");
    var valueCapacidad = elemCapacidad.value;

    this.props.updateListProducts(valueProducto, valuePrecio, valueCapacidad);
  };

  render() {
    return (
      <div id="filtro-tupper" class="row">
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mt-2 text-center my-auto">
          <div class="row">
            <div class="col-4 my-auto">
              <h6 className="label-filtro">Producto</h6>
            </div>
            <div class="col-8 my-auto">
              <input
                type="text"
                class="form-control form-control-sm"
                value={this.state.valorInput}
                id="input-producto"
                placeholder="Taza milano"
                onChange={this.changeValueInput}
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mt-2 mb-2 text-center my-auto">
          <div class="row">
            <div class="col-4 my-auto">
              <h6 className="label-filtro">Precio</h6>
            </div>
            <div class="col-8 my-auto">
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                id="select-precio"
                onChange={this.filtrar}
              >
                <option value="0-p-1000">Menos de $ 1.000</option>
                <option value="1000-p-5000">Entre $ 1.000 y $ 5.000</option>
                <option value="5000-p-10000">Entre $ 5.000 y $ 10.000</option>
                <option value="10000-p-inf">Mayor a $ 10.000</option>
                <option value="0-p-inf" selected>
                  Todos
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-4 col-md-4 col-lg-4 mb-2 text-center my-auto">
          <div class="row">
            <div class="col-4 my-auto">
              <h6 className="label-filtro">Capacidad</h6>
            </div>
            <div class="col-8 my-auto">
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                id="select-capacidad"
                onChange={this.filtrar}
              >
                <option value="0-c-1000">Menos de 1 Lt.</option>
                <option value="1000-c-5000">Entre 1 y 5 Lt.</option>
                <option value="5000-c-10000">Entre 5 y 10 Lt.</option>
                <option value="10000-c-inf">Mayor a 10 Lt.</option>
                <option value="0-c-inf" selected>
                  Todos
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FiltroTupperware;
