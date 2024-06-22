import React from "react";

import Side_bar from "../Side_bar/Side_bar";
import Dashbord from "../Dashbord/Dashbord";
import Dash_nav from "../Dash_nav/Dash_nav";
function Side() {
  return (
    <div>
      <>
        <Side_bar />
        <div className="content">
          <Dash_nav />
          <div className=" border_dash_color  py-3 mt-2">
            <Dashbord />
          </div>
        </div>
      </>
    </div>
  );
}

export default Side;
