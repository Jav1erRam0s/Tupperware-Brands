import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import url from "../config.js";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Logo from "../images/logo.png";
import Productos from "../images/productos.png";
import Folletos from "../images/folletos.png";
import Contactenos from "../images/contactenos.png";
import "../styles/Navegacion.css";

class Navegacion extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.closeToggle = this.closeToggle.bind(this);
    this.state = {
      isOpen: false,
      folletos: [],
      status: false,
    };
  }

  cargarFolletos() {
    axios.get(`${url.folletos}`).then((res) => {
      this.setState({ folletos: res.data.folletos, status: true });
    });
  }

  componentDidMount() {
    this.cargarFolletos();
  }

  pasearFecha = (dateStr) => {
    var dia = parseInt(dateStr.substr(8, 2));
    var mesNum = parseInt(dateStr.substr(5, 2));

    var mesText = "";
    if (mesNum === 1) {
      mesText = "Enero";
    } else if (mesNum === 2) {
      mesText = "Febrero";
    } else if (mesNum === 3) {
      mesText = "Marzo";
    } else if (mesNum === 4) {
      mesText = "Abril";
    } else if (mesNum === 5) {
      mesText = "Mayo";
    } else if (mesNum === 6) {
      mesText = "Junio";
    } else if (mesNum === 7) {
      mesText = "Julio";
    } else if (mesNum === 8) {
      mesText = "Agosto";
    } else if (mesNum === 9) {
      mesText = "Septiembre";
    } else if (mesNum === 10) {
      mesText = "Octubre";
    } else if (mesNum === 11) {
      mesText = "Noviembre";
    } else if (mesNum === 12) {
      mesText = "Diciembre";
    }
    var salida = dia + " de " + mesText;
    return <span>{salida}</span>;
  };

  filtrarFueraDeFechaDeCierre = (element) => {
    const tiempoTranscurrido = Date.now();
    var hoy = new Date(tiempoTranscurrido);
    const diaHoy = hoy.getDate();
    const mesHoy = hoy.getMonth() + 1;
    const anioHoy = hoy.getFullYear();

    const cierre = new Date(element.cierra);
    const diaCierre = cierre.getDate() + 1;
    const mesCierre = cierre.getMonth() + 1;
    const anioCierre = cierre.getFullYear();

    if (
      anioCierre > anioHoy ||
      (anioCierre === anioHoy && mesCierre >= mesHoy && diaCierre >= diaHoy)
    ) {
      return (
        <DropdownItem>
          <a
            href={element.enlace}
            target="_blank"
            rel="noopener noreferrer"
            className="linkCamp"
          >
            <span onClick={this.closeToggle} className="linkFolleto">
              • {element.nombre}
              {" - "}
              <span class="badge bg-warning text-dark">
                Cierra : {this.pasearFecha(element.cierra)}
              </span>
            </span>
          </a>
        </DropdownItem>
      );
    }
  };

  mostrarNoDisponible() {
    var folletos = this.state.folletos;
    var mostrar = true;

    for (const element of folletos) {
      const tiempoTranscurrido = Date.now();
      var hoy = new Date(tiempoTranscurrido);
      const diaHoy = hoy.getDate();
      const mesHoy = hoy.getMonth();
      const anioHoy = hoy.getFullYear();
      const fechaHoy = new Date(anioHoy, mesHoy, diaHoy);

      const cierre = new Date(element.cierra);
      const diaCierre = cierre.getDate() + 1;
      const mesCierre = cierre.getMonth();
      const anioCierre = cierre.getFullYear();
      const fechaCierre = new Date(anioCierre, mesCierre, diaCierre);

      if (fechaCierre >= fechaHoy && anioCierre === anioHoy) {
        mostrar = false;
        break;
      }
    }

    if (mostrar) {
      return (
        <DropdownItem>
          <span onClick={this.closeToggle} className="itemsNav linkFolleto">
            No disponible
          </span>
        </DropdownItem>
      );
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  closeToggle() {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar color="dark" expand="lg">
          <NavbarBrand>
            <img src={Logo} className="imgLogo" alt="..." />
          </NavbarBrand>
          <h3 id="titleNavMobile">Tupperware Brands</h3>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <UncontrolledDropdown nav inNavbar className="styleItems">
                <DropdownToggle nav caret>
                  <img
                    src={Productos}
                    className="nav-link-img"
                    alt="contactenos"
                  />
                  <span className="linkNav itemsNav">Productos</span>
                </DropdownToggle>
                <DropdownMenu right id="dropdown-productos">
                  <Link
                    to="/productos/tupperware"
                    onClick={this.closeToggle}
                    className="linkNav itemsNav"
                  >
                    <DropdownItem>
                      <span class="linkProducto">• Tupperware</span>
                    </DropdownItem>
                  </Link>
                  <Link
                    to="/productos/homeware"
                    onClick={this.closeToggle}
                    className="linkNav itemsNav"
                  >
                    <DropdownItem>
                      <span class="linkProducto">• Homeware</span>
                    </DropdownItem>
                  </Link>
                  <Link
                    to="/productos/fullercosmetics"
                    onClick={this.closeToggle}
                    className="linkNav itemsNav"
                  >
                    <DropdownItem>
                      <span class="linkProducto">• Fullercosmetics</span>
                    </DropdownItem>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar className="styleItems">
                <DropdownToggle nav caret>
                  <img
                    src={Folletos}
                    className="nav-link-img"
                    alt="contactenos"
                  />
                  <span className="linkNav itemsNav">Folletos de campaña</span>
                </DropdownToggle>
                <DropdownMenu right id="dropdown-folletos">
                  {this.state.status === true &&
                    this.state.folletos.map((element, index) => {
                      return (
                        <span className="itemsNav">
                          {this.filtrarFueraDeFechaDeCierre(element)}
                        </span>
                      );
                    })}
                  {this.mostrarNoDisponible()}
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem className="styleItems styleItemEnd">
                <NavLink>
                  <Link
                    to="/contactenos/"
                    onClick={this.closeToggle}
                    className="linkNav itemsNav"
                  >
                    <img
                      src={Contactenos}
                      className="nav-link-img"
                      alt="contactenos"
                    />
                    Contáctenos
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Navegacion;
