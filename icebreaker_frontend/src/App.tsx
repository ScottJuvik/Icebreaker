import React, { useEffect, useState } from "react";
import Router from "./Routers/Router";
import "./App.css";
import Rating from "./components/Rating/Rating";

function App() {
  return (
    <div>
      <Router />
      <Rating rating={2} maxRating={5} />
    </div>

  );
}

export default App;
