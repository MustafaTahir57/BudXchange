import React from "react";
import { images } from "../../Utility/Images";
function About() {
  return (
    <div className="text-center container" id="about">
      <div className="px-2 px-lg-5 " style={{paddingTop: "100px"}}>
        <h3 className="h3_about">About Us</h3>
        <div className="row mt-5 align-items-center">
          <div className="col-12 col-md-6 px-2 px-lg-5">
            <p className="para ">
              In this world where limitations of rights, economic changes, and
              growing restrictions are the norm, Budcoin stands as your
              protector against potential issues with CBDCs and total control of
              personal consumption.
            </p>
          </div>
          <div className="col-12 col-md-6">
            <img src={images.aboutimg} alt="" width={200} />
          </div>
        </div>
        <div className="row mt-1 align-items-center">
          <div className="col-12 col-md-6">
            <img src={images.aboutimg2} alt="" width={200} />
          </div>
          <div className="col-12 col-md-6 px-2 px-lg-5">
            <p className="para ">
              Invest in your future and gain privacy and freedom while
              cultivating passive income with a decentralized approach, inspired
              by Bitcoin mining and backed by the community.Join the resistance,
              protect your assets, and get ready for the changes of the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
