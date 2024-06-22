import React, { useContext, useEffect, useState } from "react";
import logo2 from "../../assets/logo 1 (2).png";
import wave from "../../assets/bdd1.png";

import Web3 from "web3";
import { toppingAbi, toppingAddress } from "../../Utility/contract/topping";
import {
  budCoinTokenAbi,
  budCoinTokenAddress,
} from "../../Utility/contract/budCoinToken";
import { AuthUserContext } from "../../context/context";
import { stakingAbi, stakingAddress } from "../../Utility/contract/staking";
import { toast } from "react-toastify";
import axios from "axios";
import { usdAbi, usdAddress } from "../../Utility/contract/usd";
function Dashbord() {
  window.web3 = new Web3(window.ethereum);
  const web3 = window.web3;
  const { walletAddress } = useContext(AuthUserContext);
  const [toppingApplicants, setToppingApplicants] = useState(0);
  const [stakingApplicants, setStakingApplicants] = useState(0);
  const [stakingLoading, setStakingLoading] = useState(false);
  const [toppingLoading, setToppingLoading] = useState(false);
  const [rankingDetails, setRankingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalSupply,setTotalSupply] = useState(0)
  const [rewardsDistributedToday, setRewardsDistributedToday] = useState(0);
  const [totalDistributedRewards, setTotalDistributedRewards] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0.0);
  const toppingContract = () => {
    const topping_Contract = new web3.eth.Contract(toppingAbi, toppingAddress);
    return topping_Contract;
  };
  const tokenContract = () => {
    const token_Contract = new web3.eth.Contract(
      budCoinTokenAbi,
      budCoinTokenAddress
    );
    return token_Contract;
  };
  const usdContract = () => {
    const usd_contract = new web3.eth.Contract(usdAbi, usdAddress);
    return usd_contract;
  };
  const stakingContract = () => {
    const staking_Contract = new web3.eth.Contract(stakingAbi, stakingAddress);
    return staking_Contract;
  };

  const getValue = async () => {
    try {
      const topContract = toppingContract();
      const staking = stakingContract();
      const token = tokenContract();
      const usd = usdContract()
      let stakingApplicants = await staking.methods.applicants().call();
      stakingApplicants = Number(stakingApplicants);
      setStakingApplicants(stakingApplicants);
      let toppingApplicants = await topContract.methods.applicants().call();
      toppingApplicants = Number(toppingApplicants);
      setToppingApplicants(toppingApplicants);
      let totalSupply = await token.methods.totalSupply().call();
      totalSupply = Number(totalSupply) / 1e18
     setTotalSupply(totalSupply.toFixed(0))
     let totalDistributedRewards = await staking.methods
        .totalDistributedRewards()
        .call();
      totalDistributedRewards = Number(totalDistributedRewards) / 1e18;
      setTotalDistributedRewards(totalDistributedRewards.toFixed(2));
     if(walletAddress){
      const lockInfo = await staking.methods
          .lockInfo(walletAddress)
          .call();
        let amount = Number(lockInfo.amount) / 1e18;
          setRewardsDistributedToday(amount.toFixed(3));
          let usdBalance = await usd.methods.balanceOf(walletAddress).call();
          usdBalance = Number(usdBalance);
          setUsdBalance(usdBalance.toFixed(2));
     }
    } catch (e) {
      console.log("e", e);
    }
  };
  const getHolder = async () => {
    try {
      setLoading(true);
      const repsonse = await axios.get(
        `https://deep-index.moralis.io/api/v2.2/erc20/${budCoinTokenAddress}/owners?chain=matic&order=DESC`,
        {
          headers: {
            accept: "application/json",
            "X-API-Key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjJhNzhjMWRiLWJiOGUtNDgxOS1hOWI2LTI4NjU4NjkyYjhjYiIsIm9yZ0lkIjoiMzk1NDA0IiwidXNlcklkIjoiNDA2MzA5IiwidHlwZUlkIjoiZjAwNDUyNGMtMGYyMy00ZTE2LWExNjUtZDgxMmQwNDYwODExIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTc3NDIwODgsImV4cCI6NDg3MzUwMjA4OH0.XihkqzttN_TNKOExHJbfu-Gl6-FkFHY_42SFo7ACl4c",
          },
        }
      );
      const array = []
      repsonse?.data?.result.forEach((element) => {
        if (element.is_contract == false) {
          array.push(element);
        }
      });
      setRankingDetails(array)
      setLoading(false);
    } catch (e) {
      console.log("e", e);
      setLoading(false);
    } 
  };
  const stakingApply = async () => {
    try {
      const staking = stakingContract();
      const token = tokenContract();
      setStakingLoading(true);
      if (walletAddress) {
        const alreadyVoted = await staking.methods
          .alreadyVoted(walletAddress)
          .call();
        if (alreadyVoted === false) {
          let balanceOf = await token.methods.balanceOf(walletAddress).call();
          balanceOf = Number(balanceOf);
          if (balanceOf > 0) {
            const reduceCommission = await staking.methods
              .reduceCommission()
              .send({ from: walletAddress });
            if (reduceCommission) {
              toast.success("Commission get successfully.");
              setStakingLoading(false);
            }
          } else {
            toast.error("Your balance is low.");
            setStakingLoading(false);
          }
        } else {
          toast.error("you already voted");
          setStakingLoading(false);
        }
      } else {
        setStakingLoading(false);
        toast.error("wallet connect first!");
      }
    } catch (e) {
      setStakingLoading(false);
      console.log("e", e);
    }
  };
  const toppingApply = async () => {
    try {
      const token = tokenContract();
      const topping = toppingContract();
      setToppingLoading(true);
      if (walletAddress) {
        const alreadyVoted = await topping.methods
          .alreadyVoted(walletAddress)
          .call();
        if (alreadyVoted === false) {
          let balanceOf = await token.methods.balanceOf(walletAddress).call();
          balanceOf = Number(balanceOf);
          if (balanceOf > 0) {
            const reduceCommission = await topping.methods
              .reduceCommission()
              .send({ from: walletAddress });
            if (reduceCommission) {
              toast.success("Commission get successfully.");
              setToppingLoading(false);
            }
          } else {
            toast.error("Your balance is low.");
            setToppingLoading(false);
          }
        } else {
          toast.error("you already voted");
          setToppingLoading(false);
        }
      } else {
        setToppingLoading(false);
        toast.error("wallet connect first!");
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  useEffect(() => {
    getHolder();
  }, []);
  useEffect(() => {
    getValue();
  }, [walletAddress]);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 right_border">
          <iframe height="100%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed" src="https://www.geckoterminal.com/polygon_pos/pools/0xc22ca6b200525db0d82482f8d54fd6352ce330fd?embed=2&info=1&swaps=0" frameborder="0" allow="clipboard-write" allowfullscreen></iframe>
            {/* <div className="pt-4 table-responsive ">
              <table>
                <thead>
                  <tr>
                    <td className="text-start ps-3">Holder ranking</td>
                    <td className="text-start">Holder Address</td>
                    <td className="text-start">Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr class="text-center" style={{height: "245px"}}>
                      <td colspan="3">
                      <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {rankingDetails.length > 0 ? (
                        rankingDetails.slice(0,10).map((items, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-start ps-3">{index +1}</td>
                              <td className="text-start">{items?.owner_address}</td>
                              <td className="text-start">{Number(items?.balance_formatted).toFixed(10)}</td>
                             
                            </tr>
                          );
                        })
                      ) : (
                        <tr class="text-center" style={{height: "245px"}}>
                      <td colspan="3">
                      No Record Found
                      </td>
                     
                    </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div> */}
          </div>
          <div className="col-12 col-lg-3 grig_dasg p-3">
            <h3>BudCoin</h3>
            <div className="border_dash font_famly text-center py-4 ">
              {/* <h6 className=" color_manage"> Balance</h6>

              <h5 className=" mt-2">
                {usdBalance} <span className="fs-6 fw-300">BUDS</span>
              </h5> */}
              <h6 className=" color_manage">TOTAL DISTRIBUTED REWARS</h6>
              <h6 className="">{totalDistributedRewards}</h6>
              <img src={wave} width={200} alt="" />
              <div className="mt-4">Reduce Staking Fee</div>
              <h5 className="mt-2">{stakingApplicants}/1 Milion</h5>
              <button
                className="btn_connect"
                onClick={stakingApply}
                disabled={stakingLoading}
              >
                {stakingLoading ? (
                  <>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="ms-2">Loading...</span>
                  </>
                ) : (
                  "APPLY"
                )}
              </button>
              <h6 className=" mt-5">Reduce Topping Reward </h6>
              <h5 className="mt-1">{toppingApplicants}/10,000</h5>
              <button
                className="btn_connect"
                onClick={toppingApply}
                disabled={toppingLoading}
              >
                {toppingLoading ? (
                  <>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="ms-2">Loading...</span>
                  </>
                ) : (
                  "APPLY"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord;
