import React from "react";
import "../styles/Footer.css";

class Footer extends React.Component {
  anioActual() {
    return new Date().getFullYear();
  }

  render() {
    return (
      <React.Fragment>
        <footer id="footer" class="pb-2 pt-3">
          <div class="container">
            <div class="row text-center">
              <div class="col-12 col-lg">
                <h6 id="copyright">
                  Developed by <span id="myName">Jav1er Ram0s</span> • ©{" "}
                  {this.anioActual()} All Rights Reserved
                </h6>
              </div>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
