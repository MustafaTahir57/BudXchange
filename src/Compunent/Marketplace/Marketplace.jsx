import React from "react";
import { images } from "../../Utility/Images";
function Marketplace() {
  return (
    <div className="text-center mt-5" id="Collections">
      <h3 className="h3_about">NFT MARKETPLACE</h3>
      <img className="mt-3" src={images.coming} width={270} alt="" />
      <div className="container  px-lg-5">
        <div className="row mt-3 px-1 px-lg-5">
          <div className="col-12 col-md-6 col-lg-3 mt-2   ">
            <img src={images.nft} className="w-100" alt="" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mt-2   ">
            <img src={images.nft2} className="w-100" alt="" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mt-2   ">
            <img src={images.nft3} className="w-100" alt="" />
          </div>
          <div className="col-12 col-md-6 col-lg-3 mt-2   ">
            <img src={images.nft4} className="w-100" alt="" />
          </div>
        </div>
        <h5 className="h3_about mt-3">View more</h5>
      </div>
    </div>
  );
}

export default Marketplace;
