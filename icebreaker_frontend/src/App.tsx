import React, { useEffect, useState } from "react";
import Router from "./Routers/Router";
import "./App.css";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <div>
      <Router />
      <Footer />
    </div>
  );
}

export default App;
