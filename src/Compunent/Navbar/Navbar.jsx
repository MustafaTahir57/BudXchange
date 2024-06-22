import React from "react";
import { images }  from "../../Utility/Images"
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import WalletConnection from "./WalletContract";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light text_color  nav_back">
      <div className="container-fluid px-5">
        <Link t0="/" className="navbar-brand" href="#">
          <img src={images.logo} alt="" className="logo_img" width={100} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <GiHamburgerMenu className="icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end align-items-center gap-4 ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link" href="#">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#Collections">
                Collections
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#Whitepaper">
                Whitepaper
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#FAQ">
                FAQ
              </a>
            </li>
            <WalletConnection />
            {/* <button className="btn_connect">Connect Wallet </button> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
