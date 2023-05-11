import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFoundBlock";
import Basket from "./components/Pages/Basket";
import FullPizza from "./components/Pages/FullPizza";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/pizza/:id" element={<FullPizza />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
