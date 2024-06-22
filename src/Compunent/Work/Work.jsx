import React from "react";
function Work() {
  return (
    <div className="pt-3">
      <div
        className="my-5 text-center container pos px-1 px-lg-5 work"
        id="Whitepaper"
      >
        <h3 className="h3_about my-5">How It Works</h3>
        <div className="progress progress1 progress-striped ">
          <div
            className="progress-bar progress-bar-danger"
            role="progressbar"
            aria-valuenow={80}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: "100%" }}
          ></div>
        </div>
        <p className="para step_para">
          Buy some BUDS, don't go crazy and don't go in with everything. Reserve
          some to provide liquidity and get the best yield.
        </p>
        <div className="step1 step_no">Step: 1</div>
        <div className="steper stepper_set"></div>
        <p className="para step_para2">
          Provides liquidity to the official pool and receive special seeds "LP
          Tokens"
        </p>
        <div className="step2 step_no">Step: 2</div>
        <div className="steper2 stepper_set"></div>
        <p className="para step_para3">
          Plant the special seeds in our staking cultivation and
          harvest BUDS every week!
        </p>
        <div className="step3 step_no">Step: 3</div>
        <div className="steper3 stepper_set"></div>
        <p className="para step_para4">
          If you have at least 100BUDS and a minimum participation of special
          seeds you can claim the monthly Topping
        </p>
        <div className="step4 step_no">Step: 4</div>
        <div className="steper4  stepper_set"></div>
      </div>

      <div className="demo-preview pb-5 d-block d-md-none">
        <div className="progress2 vertical">
          <div
            role="progressbar2"
            style={{ height: "95%" }}
            className="progress-bar2"
          >
            <div className="">
              <div className="dot dotmove"></div>
              <div className="res_step res_step_move">Step1</div>
              <p className="res_para res_para_move ">
                Buy some BUDS, don't go crazy and don't go in with everything.
                Reserve some to provide liquidity and get the best yield.
              </p>
            </div>
            <div className="">
              <div className="dot dotmove2"></div>
              <div className="res_step res_step_move2">Step2</div>
              <p className="res_para res_para_move2 ">
                Provides liquidity to the official pool and receive special
                seeds "LP Tokens"
              </p>
            </div>
            <div className="">
              <div className="dot dotmove3"></div>
              <div className="res_step res_step_move3">Step3</div>
              <p className="res_para res_para_move3 ">
                Plant the special seeds in our staking cultivation and
                harvest BUDS every week!
              </p>
            </div>
            <div className="">
              <div className="dot dotmove4"></div>
              <div className="res_step res_step_move4">Step4</div>
              <p className="res_para res_para_move4 ">
                If you have at least 100BUDS and a minimum participation of
                special seeds you can claim the monthly Topping
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
