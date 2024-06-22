import React from "react";

function Holder() {
  return (
    <div>
      <div className="back_holder py-4" style={{marginTop: "140px"}}>
        <div className="card container pt-2" style={{ width: "70%" }}>
          <div className="card-body">
            <div className="row ">
              <div className="col-6 text-center">
                <h2 className="font_holder">12,600,000</h2>
                <p>Circulating Supply end of 2025</p>
              </div>
              <div className="col-6 text-center">
                <h2 className="font_holder">1,600,000</h2>
                <p>Current Anual Rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Holder;
