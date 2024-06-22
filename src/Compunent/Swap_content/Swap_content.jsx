import React, { useContext, useEffect, useState } from "react";
import { images } from "../../Utility/Images";
import { IoSwapVertical } from "react-icons/io5";
import Web3 from "web3";
import {
  budCoinTokenAbi,
  budCoinTokenAddress,
} from "../../Utility/contract/budCoinToken";
import { swapAbi, swapAddress } from "../../Utility/contract/swap";
import { AuthUserContext } from "../../context/context";
import { usdAbi, usdAddress } from "../../Utility/contract/usd";
import { toast } from "react-toastify";
function Swap_content() {
  window.web3 = new Web3(window.ethereum);
  const web3 = window.web3;
  const { walletAddress } = useContext(AuthUserContext);
  const [usdBalance, setUsdBalance] = useState(0.0);
  const [tokenBalance, setTokenBalance] = useState(0.0);
  const [amount, setAmount] = useState("");
  const [calculateValue, setCalculateValue] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const address = [
    "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    "0x6cEa21103cfc8bb2516Db3027c2Bc5B2A28e770E",
  ];
  const tokenContract = () => {
    const token_Contract = new web3.eth.Contract(
      budCoinTokenAbi,
      budCoinTokenAddress
    );
    return token_Contract;
  };
  const swapContract = () => {
    const swap_contract = new web3.eth.Contract(swapAbi, swapAddress);
    return swap_contract;
  };
  const usdContract = () => {
    const usd_contract = new web3.eth.Contract(usdAbi, usdAddress);
    return usd_contract;
  };

  const getValue = async () => {
    try {
      const usd = usdContract();
      const token = tokenContract();
      if (walletAddress) {
        let usdBalance = await usd.methods.balanceOf(walletAddress).call();
        usdBalance = Number(usdBalance) / 1000000;
        setUsdBalance(usdBalance.toFixed(2));
        let tokenBalance = await token.methods.balanceOf(walletAddress).call();
        tokenBalance = Number(tokenBalance) / 1e18;
        setTokenBalance(tokenBalance.toFixed(2));
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleHalfValue = () => {
    if (usdBalance > 0) {
      const divideValue = usdBalance / 2;
      setAmount(divideValue);
    }
  };
  const changeAmount = async () => {
    try {
      const swap = swapContract();
      if (amount) {
        const value = amount * 1000000;
        let getAmountsOut = await swap.methods
          .getAmountsOut(value, address)
          .call();
        let budsValue = Number(getAmountsOut[1]) / 1e18;
        const object = {
          realAmount: Number(getAmountsOut[0]),
          budsValues: Number(getAmountsOut[1]),
          convertBusdValue: budsValue,
        };
        setCalculateValue(object);
      } else {
        setCalculateValue();
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleSwap = async () => {
    try {
      if (!amount) {
        setError(true);
        return;
      }
      setLoading(true);
      const token = tokenContract();
      const usdc = usdContract()
      const swap = swapContract();
      const value = amount * 1000000;
      if (walletAddress) {
        // if (amount <= usdBalance) {
          const approve = await usdc.methods
            .approve(swapAddress, value)
            .send({ from: walletAddress });
          if (approve) {
            toast.success("Your amount is approved successfully!");
            const currentTime = new Date();
            const newTime = new Date(currentTime.getTime() + 5 * 60 * 1000);
            const epochTimeInSeconds = Math.floor(newTime.getTime() / 1000);
            const swapExactTokens = await swap.methods
              .swapExactTokensForTokensSupportingFeeOnTransferTokens(
                calculateValue.realAmount,
                calculateValue.budsValues,
                address,
                walletAddress,
                epochTimeInSeconds
              )
              .send({ from: walletAddress });
            if (swapExactTokens) {
              setLoading(false);
              toast.success("your amount swap successfully.");
            }
          }
        // } else {
        //   setLoading(false);
        //   toast.error("Your balance is low.");
        // }
      } else {
        setLoading(false);
        toast.error("Wallet connect first!");
      }
    } catch (e) {
      setLoading(false);
      toast.error(e);
      console.log("e", e);
    }
  };
  useEffect(() => {
    changeAmount();
  }, [amount]);
  useEffect(() => {
    getValue();
  }, [walletAddress]);
  return (
    <div className="p-3 " style={{ position: "relative" }}>
      <h2>Buy Budcoin</h2>
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="transparent-image">
          <div className="card m-auto">
            <div className="card-body">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between fw-bold">
                  <p>From:</p>
                  <div>
                    <button className="max" onClick={handleHalfValue}>
                      50%
                    </button>
                    <button
                      className="max ms-3"
                      onClick={() => {
                        if (usdBalance > 0) {
                          setAmount(usdBalance);
                        }
                      }}
                    >
                      MAX
                    </button>
                  </div>
                </div>
                <div className="col-12 mt-3 d-flex align-items-center justify-content-between fw-bold">
                  <div className="row d-flex align-items-center justify-content-between">
                    <div className="col-4">
                      <div className="back_coin_box ps-2 d-flex align-items-center">
                        <img src={images.usdc} width={20} alt="" />
                        <p className="ms-1">USDC</p>
                      </div>
                    </div>
                    <div className="col-8">
                      <input
                        type="number"
                        className="input-number"
                        placeholder=""
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={1}
                      />
                      {error && !amount && (
                        <span className="text-danger">Enter Amount</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-3 d-flex align-items-center justify-content-between">
                  <p className="fw-bold color_bol">Balance:</p>
                  <p className="fw-bold color_bol">{usdBalance} $</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`m-auto swap_icon p-2 ms-1`}>
            <IoSwapVertical className="fs-5 fw-bold d-flex justify-content-center align-items-center" />
          </div>
          <div className="card m-auto mt-3" style={{ width: "21rem" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-6 text-start fw-bold">
                  <p>To(estimate):</p>
                  <div className="back_coin_box mt-4 ps-2 d-flex align-items-center">
                    <img src={images.bid} width={20} alt="" style={{borderRadius: "50%"}}/>
                    <p className="ms-1">BUDS</p>
                  </div>
                  <p className="mt-4 fw-bold color_bol">Balance:</p>
                </div>
                <div className="col-6 text-end">
                  <p className="mt-4 pt-4 fw-bold fs-5 color_bol">
                    {calculateValue
                      ? calculateValue.convertBusdValue.toFixed(2)
                      : "0.00"}
                  </p>
                  <p className="mt-4 fw-bold color_bol">{tokenBalance} $</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3" style={{ width: "21rem" }}>
          <button
            className={` w-100 ${
              usdBalance <= 0 || amount > usdBalance || loading
                ? "btn_connect"
                : "swap_icon"
            }`}
            // disabled={usdBalance <= 0 || amount > usdBalance || loading}
            onClick={handleSwap}
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
              "Swap"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Swap_content;
