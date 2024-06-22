import React from "react";

import Side_bar from "../Side_bar/Side_bar";
import Dash_nav from "../Dash_nav/Dash_nav";
import Staking_contant from "../Staking_contant/Staking_contant";
function Staking() {
  return (
    <div>
      <>
        <Side_bar />
        <div className="content">
          <Dash_nav />
          <div className=" border_dash_color  py-3 mt-2">
            <Staking_contant />
          </div>
        </div>
      </>
    </div>
  );
}

export default Staking;
