import React from "react";
import Footer from "../components/Footer.js";
import ListaTupperware from "../containers/ListaTupperware.js";

class Tupperware extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ListaTupperware />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Tupperware;
