import React from "react";
import Footer from "../components/Footer.js";
import ListaHomeware from "../containers/ListaHomeware.js";

class Homeware extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListaHomeware />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Homeware;
