import React from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../Utility/Images";
function Budcoin() {
  const navigate = useNavigate()
  return (
    <div className="back">
      <div className="opsity">
        <div className="container">
          <div className="row align-items-center px-2 px-lg-5">
            <div className="col-12 col-md-6 ">
              <img
                className="img_opsity d-flex justify-content-center"
                src={images.monk}
                alt=""
                width={"100%"}
              />
            </div>
            <div className="col-12 col-md-6  ">
              <div className="">
                <img src={images.bidtext} width={150} alt="" />
              </div>
              <p className="para mt-4">
                We suggest you start grow, you will only need an initial
                investment of at least 1 dollars and you add liquidity to the
                pool. With the special seed that you will receive "LP Tokens"
                you will be able to stake and start harvesting BUDS
              </p>
              <button className="btn_connect" onClick={()=>navigate("/Swap")}> Buy Now </button>
              <div className="d-flex gap-2 mt-4">
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
        </div>
      </div>
    </div>
  );
}

export default Budcoin;
