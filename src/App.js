import React from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFoundBlock";
import Basket from "./components/Pages/Basket";

export const SearchContext = React.createContext();

function App() {
  const [search, setSearch] = React.useState("");
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/basket" element={<Basket />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
