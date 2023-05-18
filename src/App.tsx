import React from 'react';
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./components/Pages/Home";

const Basket = React.lazy(() => import(/* webpackChunkName: "Basket" */ './components/Pages/Basket'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './components/Pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFoundBlock" */ './components/Pages/NotFoundBlock'));


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basket" element={<React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <Basket />
            </React.Suspense>} />
            <Route path="*" element={<React.Suspense fallback={<div>Идет загрузка корзины...</div>}>
              <NotFound />
            </React.Suspense>} />
            <Route path="/pizza/:id" element={<React.Suspense fallback={<div>Идет загрузка питсы...</div>}>
              <FullPizza />
            </React.Suspense>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
