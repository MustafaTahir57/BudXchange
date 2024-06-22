import React from "react";

import Side_bar from "../Side_bar/Side_bar";
import Dash_nav from "../Dash_nav/Dash_nav";
import Topping_content from "../Topping_content/Topping_content";
function Topping() {
  return (
    <div>
      <>
        <Side_bar />
        <div className="content">
          <Dash_nav />
          <div className=" border_dash_color  py-3 mt-2">
            <Topping_content/>
          </div>
        </div>
      </>
    </div>
  );
}

export default Topping;
