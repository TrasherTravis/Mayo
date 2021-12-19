import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../hooks/wallet/Connectors";
import "./style.css";
import METAMASK from '../../assets/images/METAMASK.png';
import WALLETCONNECTOR from '../../assets/images/WalletConnector.svg';

const SelectWalletModal = ({ modalShow, setModalView, walletconnect }) => {
  const { t } = useTranslation();
  const { account, activate} = useWeb3React();

  useEffect(() => {
    if(account) {
      setModalView(false);
    }
  }, [account, setModalView])

  const metaMaskConnect = async () => {
    try {
      await activate(injected, undefined, true);
    }
    catch (e) {
      if (e instanceof UnsupportedChainIdError) {
        console.error('UnsupportedChainIdError');
      } else if (!window.ethereum) {
          console.error("No MetaMask");
      } else {
        console.error('Wallet Connect Error', e);
      }
    }
  };

  return (
    <div className={`modal connect-wallet-modal lost-modal ${modalShow ? "flex" : "hidden"} `} onClick={() => {setModalView(false)}}>
      <div className="wallet-modal justify-center items-end text-center pb-10 relative rounded-xl p-4">
        <div className="flex justify-between items-center">
          <h5>{t("modals.selectWallet.connect")}</h5>
          <i className="fas fa-times close-icon"></i>
        </div>
        <div className="flex justify-between align-items-center mt-14 p-2.5 wallet-item rounded-md" onClick={metaMaskConnect}>
          <p>MetaMask</p>
          <img src={METAMASK} width="32" alt='Connect to Metamask' />
        </div>
        <div className="flex justify-between align-items-center mt-6 p-2.5 wallet-item rounded-md" onClick={() => walletconnect()}>
          <p>WalletConnect</p>
          <img src={WALLETCONNECTOR} width="32" alt='Connect to WalletConnect' />
        </div>
      </div>
    </div>
  );
};

export default SelectWalletModal;
