import React from "react";
import { images } from "../../Utility/Images";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
function Side_bar() {
  return (
    <div>
      <div className="sidebar text-center pt-5 d-none d-md-block">
        <Link to="/">
          {" "}
          <img src={images.logo} alt="" className="" width={140} />
        </Link>
        <img src={images.logo2} alt="" className="" width={140} />

        <Link
          to="/dashboard"
          className=" gap-3 d-flex align-items-center hover ms-5 mt-3"
          href="#home"
        >
          <img src={images.vector} alt="" width={15} height={15} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/Staking"
          className=" gap-3 d-flex align-items-center hover ms-5 "
          href="#home"
        >
          <img src={images.vector1} alt="" width={15} height={15} />
          <span>Staking</span>
        </Link>
        <Link
          to="/Swap"
          className=" gap-3 d-flex align-items-center hover ms-5"
          href="#home"
        >
          <img src={images.vector1} alt="" width={15} height={15} />
          <span>Swap</span>
        </Link>
        <Link
          to="/Topping"
          className=" gap-3 d-flex align-items-center hover ms-5"
          href="#home"
        >
          <img src={images.vector1} alt="" width={15} height={15} />
          <span>Topping</span>
        </Link>
        <Link
          to="/"
          className=" gap-3 d-flex align-items-center hover ms-5"
          href="#home"
        >
          <IoMdHome className="fs-5 colo"/>
          
          <span>Home</span>
        </Link>
        <div className="mt-5">
          <h5 className="h3_about">For Support</h5>
          <p>foundation@budcoin.world</p>
        </div>
      </div>
    </div>
  );
}

export default Side_bar;
