import React from "react";

function FAQ() {
  return (
    <div className="margin_faq text-center" id="FAQ">
      <h3 className="h3_about">frequently asked questions</h3>
      <div className="container px-3 mt-3">
        <div className="row grid mt-0 p-0">
          <div className=" border_faq ">
            <div className="faq_img2 text-center">
              <h4 className="h3_faq pt-3">What blockchain is Budcoin on?</h4>
              <p className="text-white px-5">
                Budcoin runs on the Polygon network since it guarantees faster
                and cheaper transactions.
              </p>
            </div>
          </div>
          <div className=" border_faq ">
            <div className="faq_img text-center">
              <h4 className="h3_faq pt-3">What is Budcoin Topping?</h4>
              <p className="text-white px-5">
                You can get more rewards, hold 100 BUDS and a minimum
                participation of Special seeds (LP Token) and you can claim up
                to 50,000 BUDS per month! The initial reward is reduced by 10%
                with each claim and resets every 30 days.
              </p>
            </div>
          </div>
          <div className=" border_faq ">
            <div className="faq_img text-center">
              <h4 className="h3_faq pt-3">Is Budcoin gambling?</h4>
              <p className="text-white px-5">
                No, Budcoin is a digital collectible that grants you ownership
                of Budcoin. Includes, tooping, proof of stake etc.
              </p>
            </div>
          </div>
          <div className=" border_faq ">
            <div className="faq_img text-center">
              <h4 className="h3_faq pt-3">How can I earn Budcoin Reward?</h4>
              <p className="text-white px-5">
                You can earn Budcoin with theses methods:
                <ol>
                  <li>Purchase</li>
                  <li>Staking Reward</li>
                  <li>Tooping</li>
                </ol>
              </p>
            </div>
          </div>
          <div className=" border_faq ">
            <div className="faq_img text-center">
              <h4 className="h3_faq pt-3">Who controls the reward price?</h4>
              <p className="text-white px-5">
                Smart contracts ensures that no one can have access or exploit
                the rewards and blockchain makes all transactions transparent.
                See docs.
              </p>
            </div>
          </div>
          <div className=" border_faq ">
            <div className="faq_img text-center">
              <h4 className="h3_faq pt-3">
                How do I collaborate with Budcoin?
              </h4>
              <p className="text-white px-5">
                Reach out through our collaboration form or our social channels.
                We will ensure to go through the requests as quickly as we can.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
