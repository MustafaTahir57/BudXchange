import React from "react";

import Side_bar from "../Side_bar/Side_bar";
import Dash_nav from "../Dash_nav/Dash_nav";
import Swap_content from "../Swap_content/Swap_content";
function Swap() {
  return (
    <div>
      <>
        <Side_bar />
        <div className="content">
          <Dash_nav />
          <div className=" border_dash_color  py-3 mt-2">
            <Swap_content />
          </div>
        </div>
      </>
    </div>
  );
}

export default Swap;
