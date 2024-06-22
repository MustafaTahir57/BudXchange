import React from "react";
import Offcanvs from "../Offcanvs/Offcanvs";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {images} from "../../Utility/Images"
import WalletConnection from "../Navbar/WalletContract";
function Dash_nav() {
  return (
    <div>
      <nav className="border_nav d-flex align-items-center justify-content-between">
        <Offcanvs />
        <input
          className="input_none"
          type="text"
          id="fname"
          name="fname"
          placeholder="Find something here..."
        />
        <div className="gap-2 d-flex align-items-center">
        <WalletConnection />
          {/* <IoNotificationsOutline className="fs-4 text-white " />
          <Link to="/">
            {" "}
            <img
              src={images.vector5}
              width={35}
              height={35}
              className="profile"
              alt=""
            />
          </Link>
          <p className="p-0 m-0 adree ">1434....55363</p> */}
        </div>
      </nav>
    </div>
  );
}

export default Dash_nav;
