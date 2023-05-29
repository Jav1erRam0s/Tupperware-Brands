import React from "react";
import axios from "axios";
import url from "../config.js";
import FiltroTupperware from "../components/FiltroTupperware.js";
import CardTupperware from "../components/CardTupperware.js";
import CarouselPromociones from "../components/CarouselPromociones.js";
import "../styles/ListaTupperware.css";

class ListaTupperware extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      productosFilter: [],
      productosPage: [],
      paginacion: [],
      actualPage: 1,
      promociones: [],
      cotizacion: 0,
      cantidadProductosPage: 20,
      promosEnable: false,
      statusProductos: false,
      statusPromos: false,
      statusCotizacion: false,
    };
  }

  cargarPromos() {
    axios.get(`${url.promociones}`).then((res) => {
      this.setState({
        promociones: res.data.promociones,
        promosEnable: res.data.enable,
        statusPromos: true,
      });
    });
  }

  cargarProductos() {
    axios.get(`${url.tupperware}`).then((res) => {
      this.setState({
        productos: res.data.productos,
        productosFilter: res.data.productos.sort(function (a, b) {
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
        productosPage: this.state.productosFilter.slice(
          (this.state.actualPage - 1) * this.state.cantidadProductosPage,
          this.state.actualPage * this.state.cantidadProductosPage
        ),
      });

      const cantidadPaginas = Math.ceil(
        this.state.productosFilter.length / this.state.cantidadProductosPage
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
    this.cargarPromos();
    this.cargarProductos();
    this.cargarDolar();
  }

  goToPage(page) {
    this.setState({
      actualPage: page,
      productosPage: this.state.productosFilter.slice(
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

  calculoDePrecio(precioEnDolar, cotizacion) {
    var precio = precioEnDolar * cotizacion;
    var redondeo = Math.round(precio / 10) * 10;
    return redondeo;
  }

  updateListProducts = (valueProducto, valuePrecio, valueCapacidad) => {
    //inicializamos las variables limites de 'precio'
    let precioDesde = 0;
    let precioHasta = 0;
    if (valuePrecio === "0-p-1000") {
      precioDesde = 0;
      precioHasta = 1000;
    } else if (valuePrecio === "1000-p-5000") {
      precioDesde = 1001;
      precioHasta = 5000;
    } else if (valuePrecio === "5000-p-10000") {
      precioDesde = 5001;
      precioHasta = 10000;
    } else if (valuePrecio === "10000-p-inf") {
      precioDesde = 10001;
      precioHasta = Number.POSITIVE_INFINITY;
    } else if (valuePrecio === "0-p-inf") {
      precioDesde = 0;
      precioHasta = Number.POSITIVE_INFINITY;
    }
    //inicializamos las variables limites de 'capacidad'
    let capacidadDesde = 0;
    let capacidadHasta = 0;
    if (valueCapacidad === "0-c-1000") {
      capacidadDesde = 0;
      capacidadHasta = 1000;
    } else if (valueCapacidad === "1000-c-5000") {
      capacidadDesde = 1001;
      capacidadHasta = 5000;
    } else if (valueCapacidad === "5000-c-10000") {
      capacidadDesde = 5001;
      capacidadHasta = 10000;
    } else if (valueCapacidad === "10000-c-inf") {
      capacidadDesde = 10001;
      capacidadHasta = Number.POSITIVE_INFINITY;
    } else if (valueCapacidad === "0-c-inf") {
      capacidadDesde = 0;
      capacidadHasta = Number.POSITIVE_INFINITY;
    }
    let newProductosFilter = null;
    //actualizamos productosFilter
    if (valueCapacidad === "0-c-inf") {
      // si no filtra por capacidad '0-c-inf', entonces acepta capacidades null.
      newProductosFilter = this.state.productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().indexOf(valueProducto.toLowerCase()) >
            -1 &&
          this.calculoDePrecio(producto.precio, this.state.cotizacion) >=
            precioDesde &&
          this.calculoDePrecio(producto.precio, this.state.cotizacion) <=
            precioHasta &&
          producto.capacidad >= capacidadDesde &&
          producto.capacidad <= capacidadHasta
      );
    } else {
      // si filtra por capacidad, es decir distinto de valor '0-c-inf', entonces no acepta capacidades null.
      newProductosFilter = this.state.productos.filter(
        (producto) =>
          producto.nombre.toLowerCase().indexOf(valueProducto.toLowerCase()) >
            -1 &&
          this.calculoDePrecio(producto.precio, this.state.cotizacion) >=
            precioDesde &&
          this.calculoDePrecio(producto.precio, this.state.cotizacion) <=
            precioHasta &&
          producto.capacidad >= capacidadDesde &&
          producto.capacidad <= capacidadHasta &&
          producto.capacidad != null
      );
    }

    //inicializo la paginacion en la hoja 1
    let newActualPage = 1;
    //evaluo la cantidad de paginas en la paginacion
    const cantidadPaginas = Math.ceil(
      newProductosFilter.length / this.state.cantidadProductosPage
    );
    var list = [];
    for (var i = 1; i <= cantidadPaginas; i++) {
      list.push(i);
    }
    //Actualizamos los estados con lo anteriormente calculado.
    this.setState({
      actualPage: newActualPage,
      productosFilter: newProductosFilter,
      productosPage: newProductosFilter.slice(
        (newActualPage - 1) * this.state.cantidadProductosPage,
        newActualPage * this.state.cantidadProductosPage
      ),
      paginacion: list,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-tupperware">
        <div className="content-productos">
          {/* PROMOCIONES */}
          {this.state.statusPromos === true &&
            this.state.actualPage === 1 &&
            this.state.promociones.length !== 0 &&
            this.state.promosEnable === true && (
              <CarouselPromociones
                promociones={this.state.promociones}
                cotizacion={this.state.cotizacion}
              />
            )}
          {/* LISTA DE PRODUCTOS */}
          <div className="bodyProduct">
            <a name="irArriba" href="up">
              {""}
            </a>
            {/* FILTRO DE PRODUCTOS */}
            <FiltroTupperware updateListProducts={this.updateListProducts} />
            <div className="row px-2 py-2">
              {this.state.statusProductos === true &&
                this.state.statusCotizacion === true &&
                this.state.productos.length === 0 && (
                  <span className="col-12 text-center">
                    <h5 className="infoTupperware">
                      A la brevedad tendremos productos de la linea tupperware
                    </h5>
                  </span>
                )}
              {this.state.statusProductos === true &&
                this.state.statusCotizacion === true &&
                this.state.productosFilter.length === 0 && (
                  <span className="col-12 text-center">
                    <h5 className="infoTupperware">
                      No se encontraron resultados que coincidan con la busqueda
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
              <ul  className="barra" class="nav-pagination pagination justify-content-center fuente-pagination">
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

export default ListaTupperware;
