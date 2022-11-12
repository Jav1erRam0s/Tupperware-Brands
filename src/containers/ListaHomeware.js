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
      status: false,
    };
  }

  cargarProductos() {
    axios.get(`${url.homeware}`).then((res) => {
      this.setState({ productos: res.data.productos, status: true });

      this.setState({
        productosPage: this.state.productos.slice(
          (this.state.actualPage - 1) * 8,
          this.state.actualPage * 8
        ),
      });

      const cantidadPaginas = Math.ceil(this.state.productos.length / 8);
      var list = [];
      for (var i = 1; i <= cantidadPaginas; i++) {
        list.push(i);
      }
      this.setState({ paginacion: list });
    });
  }

  componentDidMount() {
    this.cargarProductos();
  }

  goToPage(page) {
    this.setState({
      actualPage: page,
      productosPage: this.state.productos.slice((page - 1) * 8, page * 8),
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
        <div className="content-productos">
          {/* LISTA DE PRODUCTOS */}
          <div className="bodyProduct">
            <a name="irArriba" href="up">
              {""}
            </a>
            <div className="row px-2 py-2">
              {this.state.status === true && this.state.productos.length === 0 && (
                <span className="col-12 text-center">
                  <h5 className="infoHomeware">
                    A la brevedad tendremos productos de la linea homeware
                  </h5>
                </span>
              )}
              {this.state.status === true &&
                this.state.productosPage.map((element, index) => {
                  return (
                    <span
                      className="col-12 col-sm-6 col-md-6 col-lg-3 mb-3"
                      key={index}
                    >
                      <CardTupperware producto={element} />
                    </span>
                  );
                })}
            </div>
          </div>
        </div>
        {/* BARRA DE PAGINACION */}
        {this.state.status === true && this.state.paginacion.length >= 2 && (
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

              {this.state.status === true &&
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
      </React.Fragment>
    );
  }
}

export default ListaHomeware;
