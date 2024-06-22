import React, { useContext, useEffect, useState } from "react";
import { images } from "../../Utility/Images";
import Web3 from "web3";
import { toppingAbi, toppingAddress } from "../../Utility/contract/topping";
import {
  budCoinTokenAbi,
  budCoinTokenAddress,
} from "../../Utility/contract/budCoinToken";
import { AuthUserContext } from "../../context/context";
import { toast } from "react-toastify";
import {
  timeLockedWalletAbi,
  timeLockedWalletAddress,
} from "../../Utility/contract/timeLockedWallet";
function Topping_content() {
  const { walletAddress } = useContext(AuthUserContext);
  const [currentMonthRewardsLeft, setCurrentMonthRewardsLeft] = useState(0);
  const [initialReward, setInitialReward] = useState(0);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState("00D : 00H : 00M : 00S");
  const [totalTime, setTotalTime] = useState();
  const [tokenWidthdrawLoading, setTokenWithdrawLoading] = useState(false);
  window.web3 = new Web3(window.ethereum);
  const web3 = window.web3;
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
  const timeLockedContract = () => {
    const time_lock_contract = new web3.eth.Contract(
      timeLockedWalletAbi,
      timeLockedWalletAddress
    );
    return time_lock_contract;
  };
  const getValue = async () => {
    try {
      const topContract = toppingContract();
      let currentMonthRewardsLeft = await topContract.methods
        .currentMonthRewardsLeft()
        .call();
      currentMonthRewardsLeft = Number(currentMonthRewardsLeft) / 1e18;
      setCurrentMonthRewardsLeft(currentMonthRewardsLeft.toFixed(2));

      let initialReward = await topContract.methods.initialReward().call();
      initialReward = Number(initialReward) / 1e18;
      setInitialReward(initialReward.toFixed(2));
    } catch (e) {
      console.log("e", e);
    }
  };

  const handleClaim = async () => {
    try {
      const topContract = toppingContract();
      const tokensContract = tokenContract();
      setLoading(true);
      if (walletAddress) {
        const isEligible = await topContract.methods
          .isEligible(walletAddress)
          .call();
        if (isEligible) {
          const balanceOf = await tokensContract.methods
            .balanceOf(walletAddress)
            .call();
          let minTokenBalance = await topContract.methods
            .minTokenBalance()
            .call();
          minTokenBalance = Number(minTokenBalance) / 1e18;

          if (Number(balanceOf) >= minTokenBalance) {
            const isWithinClaimWindow = await topContract.methods
              .isWithinClaimWindow()
              .call();
            if (isWithinClaimWindow) {
              let getCurrentMonthRewardsLeft = await topContract.methods
                .getCurrentMonthRewardsLeft()
                .call();
              getCurrentMonthRewardsLeft =
                Number(getCurrentMonthRewardsLeft) / 1e18;
              if (getCurrentMonthRewardsLeft > 0) {
                const claim = await topContract.methods
                  .claim()
                  .send({ from: walletAddress });
                if (claim) {
                  toast.success("Claim successfully.");
                  setLoading(false);
                }
              } else {
                toast.error("Your balance is low.");
                setLoading(false);
              }
            } else {
              toast.error("Your balance is low.");
              setLoading(false);
            }
          } else {
            toast.error("Your balance is low.");
            setLoading(false);
          }
        } else {
          setLoading(false);
          toast.error("Currently not eligible for claim.");
        }
      } else {
        toast.error("wallet connect first!");
        setLoading(false);
      }
    } catch (e) {
      console.log("e", e);
      setLoading(false);
    }
  };
  const padWithZeros = (number) => {
    return String(number).padStart(2, "0");
  };

  const timmerRun = async () => {
    try {
      const topContract = toppingContract();
      let getLastResetTime = await topContract.methods
        .getLastResetTime()
        .call();
      getLastResetTime = Number(getLastResetTime);
      const futureTime = getLastResetTime + 29 * 24 * 60 * 60;
      setTotalTime(futureTime);
      const calculateRemainingTime = () => {
        const now = Math.floor(Date.now() / 1000);
        const timeDifference = futureTime - now;
        if (timeDifference <= 0) {
          return "00D : 00H : 00M : 00S";
        }
        const days = Math.floor(timeDifference / (24 * 60 * 60));
        const hours = Math.floor((timeDifference % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
        const seconds = Math.floor(timeDifference % 60);

        return `${padWithZeros(days)}D : ${padWithZeros(
          hours
        )}H : ${padWithZeros(minutes)}M : ${padWithZeros(seconds)}S`;
      };
      const updateCountdown = () => {
        setCountdown(calculateRemainingTime());
      };
      updateCountdown();
      const intervalId = setInterval(updateCountdown, 1000);
      return () => clearInterval(intervalId);
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleRestart = async () => {
    try {
      const timeLocked = timeLockedContract();
      setTokenWithdrawLoading(true);
      if (walletAddress) {
        const now = Math.floor(Date.now() / 1000);
        if (now > totalTime) {
          const withdrawTokens = await timeLocked.methods
            .withdrawTokens()
            .send({ from: walletAddress });
          if (withdrawTokens) {
            toast.success("Token withdraw successfully.");
            setTokenWithdrawLoading(false);
          }
        } else {
          setTokenWithdrawLoading(false);
          toast.error("you are not token widthdraw yet!");
        }
      } else {
        setTokenWithdrawLoading(false);
        toast.error("wallet connect first!");
      }
    } catch (e) {
      setTokenWithdrawLoading(false);
      console.log("e", e);
    }
  };
  useEffect(() => {
    getValue();
    const fetchData = async () => {
      await timmerRun();
    };
    fetchData();
  }, [walletAddress]);
  return (
    <div>
      <div className="p-3 topping_p ">
        <h2>Claim Your Topping </h2>
        <div className="card  mt-5 m-auto" style={{ width: "fit-content" }}>
          <div className="card-body">
            <img src={images.toping} className="staking_image" alt="" />
          </div>
          {/* <div className="row text-center mt-2">
            <div className="col-6 ">
              <p>INITIAL REWARD: {initialReward} BUDS</p>
            </div>
            <div className="col-6">
              <p>LEFT REWARD: {currentMonthRewardsLeft} BUDS</p>
            </div>
          </div> */}
          {/* <div className="bor_bottom w-75 m-auto my-4"></div> */}
          <div className="d-flex justify-content-evenly mt-4">
            <p>Last Reward {initialReward}</p>
            <p>{countdown}</p>
          </div>
          {/* <div className="px-4">
            <div className="progress progress-striped mt-2 ">
              <div
                className="progress-bar progress-bar-danger"
                role="progressbar"
                aria-valuenow={80}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
          <div className="d-flex justify-content-around mt-2">
            <p>60%</p>
            <p>Next Restart</p>
          </div> */}
          {/* <p className="text-center mt-3">Number of Claim 1</p> */}
          <div className="d-flex mt-2 justify-content-evenly pb-4 pt-2 ">
            <button
              className="btn_connect px-5"
              onClick={handleClaim}
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
                "Claim"
              )}
            </button>
            <button className="btn_connect px-5" onClick={handleRestart} disabled={tokenWidthdrawLoading}>
              {
                tokenWidthdrawLoading ? (
                  <>
                    <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="ms-2">Loading...</span>
                  </>
                ) : (
                  "Restart"
                )
              }
            </button>
          </div>
          <div className=" justify-content-center d-flex">
            <button className="btn_connect mb-3">
              <a
                href="https://quickswap.exchange/#/pools/v2?currency0=0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359&currency1=0x6cEa21103cfc8bb2516Db3027c2Bc5B2A28e770E"
                target="_blank"
                className="btn_connect px-5"
                style={{ textDecoration: "none" }}
              >
                Get LP Token
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topping_content;
