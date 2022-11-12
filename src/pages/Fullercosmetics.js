import React from "react";
import Footer from "../components/Footer.js";
import ListaFullercosmetics from "../containers/ListaFullercosmetics.js";

class Fullercosmetics extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListaFullercosmetics />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Fullercosmetics;
