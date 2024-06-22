import { useState } from "react";
import "./App.css";
import Landing from "./Compunent/Landing/Landing";
import Side from "./Compunent/Side/Side";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Staking from "./Compunent/Staking/Staking";
import Swap from "./Compunent/Swap/Swap";
import Topping from "./Compunent/Topping/Topping";
import AuthState from "./context/context";
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Side />} />
          <Route path="/Staking" element={<Staking />} />
          <Route path="/Swap" element={<Swap />} />
          <Route path="/Topping" element={<Topping />} />
        </Routes>
      </BrowserRouter>
      </AuthState>
    </>
  );
}

export default App;
