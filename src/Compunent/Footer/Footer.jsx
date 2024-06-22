import React from "react";
import { images } from "../../Utility/Images";

function Footer() {
  return (
    <div className="top_border margin_faq">
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <img src={images.logo} alt="" className="logo_img" width={100} />
          </div>
          <div className="col-8">
            <ul className=" d-lg-flex  justify-content-end footer_link">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#about"
                >
                  About
                </a>
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
              <li className="nav-item">
                <a className="nav-link " href="#">
                  Disclaimer
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="#">
                  Terms & Conditions
                </a>
              </li>
            </ul>
            <div className="d-flex gap-3 mt-4 justify-content-end">
            <a href="https://x.com/Budcoin_World" target="_blank">
                  <img src={images.twiter} alt="" width={35} />
                </a>
                <a href="https://polygonscan.com/token/0x6cea21103cfc8bb2516db3027c2bc5b2a28e770e" target="_blank">
                  <img src={images.opensea} alt="" width={35} />
                </a>
                <a href="http://budcoin.world/whitepaper/WHITEPAPER.pdf" target="_blank">
                  <img src={images.whitepaper} alt="" width={35} />
                </a>
                <a href="https://t.me/Budcoin_Community" target="_blank">
                  <img src={images.telegram} alt="" width={35} />
                </a>
            </div>
          </div>
        </div>
        <p className="text-center text-white mt-3 mb-3">
          @ 2023. All Right Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
