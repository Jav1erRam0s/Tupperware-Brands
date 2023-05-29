import React from "react";
import axios from "axios";
import url from "../config.js";
import CardTupperware from "../components/CardTupperware.js";
import "../styles/ListaHomeware.css";

class ListaHomeware extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      productosPage: [],
      paginacion: [],
      actualPage: 1,
      cotizacion: 0,
      cantidadProductosPage: 12,
      statusProductos: false,
      statusCotizacion: false,
    };
  }

  cargarProductos() {
    axios.get(`${url.homeware}`).then((res) => {
      this.setState({
        productos: res.data.productos.sort(function (a, b) {
          if (a.precio > b.precio) {
            return 1;
          }
          if (a.precio < b.precio) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }),
        statusProductos: true,
      });

      this.setState({
        productosPage: this.state.productos.slice(
          (this.state.actualPage - 1) * this.state.cantidadProductosPage,
          this.state.actualPage * this.state.cantidadProductosPage
        ),
      });

      const cantidadPaginas = Math.ceil(
        this.state.productos.length / this.state.cantidadProductosPage
      );
      var list = [];
      for (var i = 1; i <= cantidadPaginas; i++) {
        list.push(i);
      }
      this.setState({ paginacion: list });
    });
  }

  cargarDolar() {
    axios.get(`${url.dolar}`).then((res) => {
      this.setState({
        cotizacion: res.data.cotizacion,
        statusCotizacion: true,
      });
    });
  }

  componentDidMount() {
    this.cargarProductos();
    this.cargarDolar();
  }

  goToPage(page) {
    this.setState({
      actualPage: page,
      productosPage: this.state.productos.slice(
        (page - 1) * this.state.cantidadProductosPage,
        page * this.state.cantidadProductosPage
      ),
    });
  }

  previousPage() {
    const nuevaPage = this.state.actualPage - 1;
    if (nuevaPage >= 1) {
      this.goToPage(nuevaPage);
    }
  }

  nextPage() {
    const cantidadPaginas = this.state.paginacion.length;
    const nuevaPage = this.state.actualPage + 1;
    if (nuevaPage <= cantidadPaginas) {
      this.goToPage(nuevaPage);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-homeware">
        <div className="content-productos">
          {/* LISTA DE PRODUCTOS */}
          <div className="bodyProduct">
            <a name="irArriba" href="up">
              {""}
            </a>
            <div className="row px-2 py-2">
              {this.state.statusProductos === true &&
                this.state.statusCotizacion === true &&
                this.state.productos.length === 0 && (
                  <span className="col-12 text-center">
                    <h5 className="infoHomeware">
                      A la brevedad tendremos productos de la linea homeware
                    </h5>
                  </span>
                )}

              <div class="container text-center padding-list-product">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5">
                  {this.state.statusProductos === true &&
                    this.state.statusCotizacion === true &&
                    this.state.productosPage.map((element, index) => {
                      return (
                        <span className="col mb-4" key={index}>
                          <CardTupperware
                            producto={element}
                            cotizacion={this.state.cotizacion}
                          />
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BARRA DE PAGINACION */}
        {this.state.statusProductos === true &&
          this.state.paginacion.length >= 2 && (
            <nav aria-label="Page navigation example">
              <ul class="nav-pagination pagination justify-content-center fuente-pagination">
                <li class="page-item">
                  <a href="#irArriba" className="anclaje">
                    <button
                      class="page-link"
                      onClick={() => this.previousPage()}
                      aria-label="Previous"
                    >
                      <span aria-hidden="true" className="buttonControl">
                        <b>&laquo;</b>
                      </span>
                    </button>
                  </a>
                </li>

                {this.state.statusProductos === true &&
                  this.state.paginacion.map((element, index) => {
                    return (
                      <li class="page-item">
                        <a href="#irArriba" className="anclaje">
                          <button
                            class="page-link"
                            onClick={() => this.goToPage(element)}
                          >
                            <span className="buttonPage">{element}</span>
                          </button>
                        </a>
                      </li>
                    );
                  })}

                <li class="page-item">
                  <a href="#irArriba" className="anclaje">
                    <button
                      class="page-link"
                      onClick={() => this.nextPage()}
                      aria-label="Next"
                    >
                      <span aria-hidden="true" className="buttonControl">
                        <b>&raquo;</b>
                      </span>
                    </button>
                  </a>
                </li>
              </ul>
            </nav>
          )}
          </div>
      </React.Fragment>
    );
  }
}

export default ListaHomeware;
