import React from "react";

import { images } from "../../Utility/Images";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
function Offcanvs() {
  return (
    <div className="offcanvas_none py-3">
      <div className="offcanvas offcanvas-start " id="demo">
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close "
            data-bs-dismiss="offcanvas"
          >
            <RxCross2 className="text-white fs-2" />
          </button>
        </div>
        <div className="offcanvas-body">
          <div className="sidebar_off text-center pt-5 ">
            <Link to="/" className="" style={{ marginLeft: "12px" }}>
              <img src={images.logo} alt="" className="" width={140} />
            </Link><br/>
            <img src={images.logo2} alt="" className="" width={140} />

            <Link
              to="/dashboard"
              className=" aa gap-3 d-flex align-items-center hover "
              href="#assssss"
              data-bs-dismiss="offcanvas"
            >
              <img src={images.vector} alt="" width={15} height={15} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/Staking"
              className=" aa gap-3 d-flex align-items-center hover  "
              href="#home"
              data-bs-dismiss="offcanvas"
            >
              <img src={images.vector1} alt="" width={15} height={15} />
              <span>Staking</span>
            </Link>
            <Link
              to="/Swap"
              className=" aa gap-3 d-flex align-items-center hover "
              href="#home"
              data-bs-dismiss="offcanvas"
            >
              <img src={images.vector1} alt="" width={15} height={15} />
              <span>Swap</span>
            </Link>
            <Link
              to="/Topping"
              className=" aa gap-3 d-flex align-items-center hover "
              href="#home"
              data-bs-dismiss="offcanvas"
            >
              <img src={images.vector1} alt="" width={15} height={15} />
              <span>Topping</span>
            </Link>
            <Link
              to="/"
              className=" aa gap-3 d-flex align-items-center hover "
              href="#home"
              data-bs-dismiss="offcanvas"
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
      </div>
      <div className=" d-flex">
        <button
          className="btn "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#demo"
        >
          <img src={images.offimg} vwidth={100} alt="" />
        </button>
        <Link to="/" className="m-0 ms-0">
          <img src={images.logo} width={100} alt="" />
        </Link>
      </div>
    </div>
  );
}

export default Offcanvs;
