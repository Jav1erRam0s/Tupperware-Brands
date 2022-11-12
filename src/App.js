import React from "react";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";

import Tupperware from "./pages/Tupperware.js";
import Homeware from "./pages/Homeware.js";
import Fullercosmetics from "./pages/Fullercosmetics.js";
import Contactenos from "./pages/Contactenos.js";

import Layout from "./containers/Layout.js";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Layout></Layout>
        <Routes>
          <Route path="/" element={<Tupperware />} />
          <Route
            path="/productos/tupperware"
            element={<Tupperware />}
          />
          <Route
            path="/productos/homeware"
            element={<Homeware />}
          />
          <Route
            path="/productos/fullercosmetics"
            element={<Fullercosmetics />}
          />
          <Route path="/contactenos" element={<Contactenos />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
