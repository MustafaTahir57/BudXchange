import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { images } from "../../Utility/Images";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdRestartAlt } from "react-icons/md";
import Stak_table from "../Stak_table/Stak_table";
import Web3 from "web3";
import { stakingAbi, stakingAddress } from "../../Utility/contract/staking";
import {
  uniswapV2PairAbi,
  uniswapV2PairAddress,
} from "../../Utility/contract/uniswapV2Pair";
import { AuthUserContext } from "../../context/context";
import { toast } from "react-toastify";
function Staking_contant() {
  const { walletAddress } = useContext(AuthUserContext);
  window.web3 = new Web3(window.ethereum);
  const web3 = window.web3;
  const [accumulatedRewards, setAccumulatedRewards] = useState(0.0);
  const [totalDistributedRewards, setTotalDistributedRewards] = useState(0);
  const [rewardsDistributedToday, setRewardsDistributedToday] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0.0);
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [lpLoading, setLpLoading] = useState(false);
  const [lockLpLoading, setLockLpLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const stakingContract = () => {
    const staking_Contract = new web3.eth.Contract(stakingAbi, stakingAddress);
    return staking_Contract;
  };

  const uniswapV2PairContract = () => {
    const uniswapV2Pair_Contract = new web3.eth.Contract(
      uniswapV2PairAbi,
      uniswapV2PairAddress
    );
    return uniswapV2Pair_Contract;
  };
  const getValue = async () => {
    try {
      const staking = stakingContract();
      const uniswap = uniswapV2PairContract();
      if (walletAddress) {
        let accumulatedRewards = await staking.methods
          .accumulatedRewards(walletAddress)
          .call();
        accumulatedRewards = Number(accumulatedRewards);
        setAccumulatedRewards(accumulatedRewards.toFixed(2));

        const lockInfo = await staking.methods
          .lockInfo(walletAddress)
          .call();
        let amount = Number(lockInfo.amount) / 1e18;
          setRewardsDistributedToday(amount);
      }

      let totalDistributedRewards = await staking.methods
        .totalDistributedRewards()
        .call();
      totalDistributedRewards = Number(totalDistributedRewards) / 1e18;
      setTotalDistributedRewards(totalDistributedRewards.toFixed(2));

      // let rewardsDistributedToday = await staking.methods
      //   .rewardsDistributedToday()
      //   .call();
      // rewardsDistributedToday = Number(rewardsDistributedToday);

      let stakeBalance = await uniswap.methods.balanceOf(stakingAddress).call();
      stakeBalance = Number(stakeBalance) / 1e18;
      setStakedBalance(stakeBalance);
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleharvestRewards = async () => {
    try {
      const staking = stakingContract();
      setLoading(true);
      if (walletAddress) {
        const harvestRewards = await staking.methods
          .harvestRewards()
          .send({ from: walletAddress });

        if (harvestRewards) {
          setLoading(false);
          toast.success("Harvest rewards successfully.");
        }
      } else {
        setLoading(false);
        toast.error("wallet connect first!");
      }
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };

  const handleUnlockLp = async () => {
    try {
      const staking = stakingContract();
      setLpLoading(true);
      if (walletAddress) {
        let stakingStartTime = await staking.methods
          .stakingStartTime(walletAddress)
          .call();
        stakingStartTime = Number(stakingStartTime);
        let NINETY_DAYS = await staking.methods.NINETY_DAYS().call();
        NINETY_DAYS = Number(NINETY_DAYS);

        const totalTime = stakingStartTime + NINETY_DAYS;
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > totalTime) {
          const unlockLP = await staking.methods
            .unlockLP()
            .send({ from: walletAddress });
          if (unlockLP) {
            toast.success("LP unlocked successfully.");
            setLpLoading(false);
          }
        } else {
          toast.error("Cannot unlock LP yet. Staking period not completed.");
          setLpLoading(false);
        }
      } else {
        toast.error("wallet connect first!");
        setLpLoading(false);
      }
    } catch (e) {
      console.log("e", e);
      setLpLoading(false);
    }
  };
  const handleStaking = async () => {
    try {
      if (!value) {
        setError(true);
        return;
      }
      const staking = stakingContract();
      const uniswap = uniswapV2PairContract();
      setLockLpLoading(true);
      if (walletAddress) {
        let balanceOf = await uniswap.methods.balanceOf(walletAddress).call();
        const weiValue = web3.utils.toWei(value.toString(), "ether");
        if (Number(balanceOf) > 0) {
          const approve = await uniswap.methods
            .approve(stakingAddress, weiValue)
            .send({ from: walletAddress });
          if (approve) {
            toast.success("Amount approve successfully.");
            const lockLP = await staking.methods
              .lockLP(weiValue)
              .send({ from: walletAddress });
            if (lockLP) {
              setLockLpLoading(false);
              toast.error("Lp lock successfully.");
              setValue("")
            }
          }
        } else {
          setLockLpLoading(false);
          toast.error("Insufficient funds!");
        }
      } else {
        setLockLpLoading(false);
        toast.error("wallet connect first!");
      }
    } catch (e) {
      setLockLpLoading(false);
      console.log("e", e);
    }
  };
  useEffect(() => {
    getValue();
  }, [walletAddress]);
  return (
    <div>
      <div className="p-3 topping_p ">
        <h2>Staking Seeds</h2>
        <div className="card  mt-5 m-auto" style={{ width: "fit-content" }}>
          <div className="card-body  ">
            <img src={images.staking} className="staking_image" alt="" />
          </div>
          <div className="d-flex justify-content-center flex-column align-items-center mt-2 mb-3">
            <p>Distributed Rewards</p>
            <p className="mb-3">{totalDistributedRewards}</p>
            <p>Total Staked Seeds</p>
            <p>{rewardsDistributedToday}</p>
          </div>
          <div className="d-flex mt-2 justify-content-evenly pb-4 pt-2 ">
            <button
              className="btn_connect px-5"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              STAKE
            </button>
            <button
              className="btn_connect"
              onClick={handleUnlockLp}
              disabled={lpLoading}
            >
              {lpLoading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2">Loading...</span>
                </>
              ) : (
                "UNSTAKE"
              )}
            </button>
          </div>
          <div className=" justify-content-center d-flex">
            <button
              className="btn_connect my-3"
              onClick={handleharvestRewards}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2">Loading...</span>
                </>
              ) : (
                "HARVEST"
              )}
            </button>
          </div>
        </div>
      </div>
      {/* <div className="container-fluid">
        <div className="row px-3 ">
          <div className="col-12 col-lg-3 border_staking pt-3 mb-3">
            <div className="d-flex align-items-center gap-1">
              <AiOutlineDollarCircle /> <p className="p-0 m-0 p_fs">Staking</p>
            </div>
            <div className="dropdown  mt-2">
              <button
                className="btn btn_round2 dropdown-toggle  gap-3 d-flex justify-content-between align-items-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={images.logo2}
                  width={20}
                  height={20}
                  className="rounded_drop"
                  alt=""
                />{" "}
                <p className="m-0 p-0 p_fs">BUDCOIN</p>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center gap-1 mt-3">
              <img src={images.amout} alt="" />
              <p className="p-0 m-0 p_fs">Amount</p>
            </div>
            <input
              className="input_none w-100"
              type="number"
              id="fname"
              name="fname"
              placeholder="Enter amount"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {error && !value && (
              <span className="text-danger">Please enter amount</span>
            )}
           
            <div className="d-flex justify-content-center my-4">
              <button className="btn_connect me-2" onClick={handleStaking} disabled={lockLpLoading}>
                {
                  lockLpLoading ?  (
                    <>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="ms-2">Loading...</span>
                    </>
                  ) : (
                    "Staking"
                  )
                }
                
              </button>
              <button
                className="btn_connect"
                onClick={handleUnlockLp}
                disabled={lpLoading}
              >
                {lpLoading ? (
                  <>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="ms-2">Loading...</span>
                  </>
                ) : (
                  "Unlock Lp"
                )}
              </button>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="d-grid grig_dasg">
              <div className="  border_dash   p-2">
                <p>Distributed Rewards</p>
                <h1 className="h3_dash text-center pt-2">
                  {totalDistributedRewards}
                </h1>
                <p className="pt-2 text-end text-white m-0">BUDS</p>
              </div>
              <div className="  border_dash   p-2">
                <p>Next Payout</p>
                <h3 className="h3_dash text-center pt-2">
                  {rewardsDistributedToday}
                </h3>
                <p className="pt-2 text-end text-white m-0">BUDS</p>
              </div>
              <div className="  border_dash   p-2">
                <p>Total Earnings</p>
                <h1 className="h3_dash text-center pt-2">
                  {accumulatedRewards}
                </h1>
                <p className="pt-2 text-end text-white m-0">BUDS</p>
              </div>
            </div>
            
            <button
              className="pending my-3"
              onClick={handleharvestRewards}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="ms-2">Loading...</span>
                </>
              ) : (
                "Pending 0"
              )}
            </button>
          </div>
          <div className="col-12 col-md-12 col-lg-3">
            <span className="d-flex align-items-center gap-3">
              <BsBank />
              <h6 className="m-0">Staked Balances</h6>
            </span>
            <h2>{stakedBalance}</h2>
            <h6 className="border_h5 pb-4">SPECIAL SEEDS LP TOKEN</h6>
          </div>
        </div>
        <div className="">
          <Stak_table />
        </div>
      </div> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body" style={{ backgroundColor: "rgb(29 48 82)" }}>
              <lable className="pt-4">Enter Stake Amount</lable>
              <input
                className="w-100"
                type="number"
                id="fname"
                name="fname"
                placeholder="Enter amount"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {error && !value && (
                <span className="text-danger">Please enter amount</span>
              )}
              <div className="row mt-1 d-flex flex-md-row flex-column-reverse">
                <div className="col-md-6 mt-2">
                <button type="button" class="btn-cancel" data-bs-dismiss="modal" onClick={()=>{
                  setValue("")
                  setError(false)
                }}>Close</button>
                </div>
                <div className="col-md-6 mt-2">
                <button className="btn_connect-modal me-2" onClick={handleStaking} disabled={lockLpLoading}>
                {
                  lockLpLoading ?  (
                    <>
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="ms-2">Loading...</span>
                    </>
                  ) : (
                    "Staking"
                  )
                }
                
              </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Staking_contant;
