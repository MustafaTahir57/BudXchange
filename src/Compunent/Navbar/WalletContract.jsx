import React, { useContext, useEffect } from 'react'
import {
    useWeb3ModalAccount,
    createWeb3Modal,
    defaultConfig,
  } from "@web3modal/ethers/react";
import { AuthUserContext } from '../../context/context';

  const projectId = "57c3ed3f7633af987eda789d503edfee";
const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },
  {
    chainId: 137,
    name: "Polygon Mainnet",
    currency: "MATIC",
    explorerUrl: "https://polygonscan.com",
    rpcUrl: "https://polygon-rpc.com/",
  }
];

const ethersConfig = defaultConfig({
  metadata: {
    name: "Web3Modal",
    description: "Web3Modal Laboratory",
    url: "https://web3modal.com",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  defaultChainId: 1,
  rpcUrl: "https://cloudflare-eth.com",
});
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
//   themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#0f172a",
    '--w3m-color-mix': '#fff',
  }
});
const WalletConnection = () => {
    const { address } = useWeb3ModalAccount();
    const {setWalletAddress} = useContext(AuthUserContext)
    useEffect(()=>{
      setWalletAddress(address)
    }, [address])
  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', borderRadius: '25px' }}>
    <w3m-button></w3m-button>
</div>
  )
}

export default WalletConnection