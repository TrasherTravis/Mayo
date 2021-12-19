import "./../preloader/style.css";
import { useState } from 'react';

import M_Logo from "../../assets/images/m_logo.png";
import LogoSVG from "../../assets/images/squid-moon-logo.svg";
import Coinl from "../../assets/images/coin_l.png";
import Coinr from "../../assets/images/coin_r.png";
import SelectWalletModal from "../modals/SelectWalletModal";
import { walletConnect } from "../../hooks/wallet/Connectors";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useTranslation } from "react-i18next";
import { useIsIncorrectNetwork } from '../../utils/helpers';

const Index = ({ loading, laterFn }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const { activate, account, library} = useWeb3React();
  const isIncorrectNetwork = useIsIncorrectNetwork();

  const switchNetwork = async () => {
    await library.eth.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }]
    })
  }

  const resetWalletConnector = (connector) => {
    if (
      connector &&
      connector instanceof WalletConnectConnector
    ) {
      connector.walletConnectProvider = undefined
    }
  }

  const walletConnector = async () => {
    try {
      await activate(walletConnect);
      resetWalletConnector(walletConnect);
    }
    catch (e) {
      console.error(e);
    }
  }

  /*const connectLater = () => {
    sessionStorage.setItem('connect_later', true);
    laterFn();
  }*/

  return (
    <>
      <div className={show ? 'is-blurred ' : ''} >
        <div className="row flex_direct">
          <div className="col-md-5 wallet_left">
            <div>
              <div className="p-5 left_content">
                <img src={M_Logo} alt="" className=" m_logo" />
                <h1 className="font-mineCraft text-4xl  text-yellow my-8">  <span className="minecraft-dollor">S</span> 200,000 usd in prizes</h1>
{/*                 <a className="marbles-help-text-wrapper align-items-center d-flex" href="https://medium.com/@SquidMoonCoin/squid-moon-marbles-game-3219edce34fc" target="_blank" rel="noopener noreferrer">
                   <img src={MarblesHelp} alt="How to play Squid Moon Marbles game" className=" m_logo" />
                   <h3>{t("auth.marbles")}</h3>
                 </a>
                 <h1 className="font-mineCraft text-4xl text-yellow my-8">  <span class="minecraft-dollor">S</span> {t("auth.prize")}</h1>*/}
              </div>
            </div>
          </div>
          <div className="col-md-7 wallet_right">
            <div>
              <a href="https://squidmoon.finance/"><img src={LogoSVG} alt="" className=" mx-auto mb-4" /></a>
            </div>

            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-8">
                {/* connect wallet */}
                {!account && <div className="wallet_content">
                  <div className="mb-3">
                    <h1 className="fw-bold font_big mb-4">{t("auth.title")}</h1>
                    <h2 className="fw-bold mb-4">{t("auth.startBy")} </h2>
                  </div>
                  <div className=" mb-4">
                    <button className="wallet_connect_btn" onClick={() => setShow(true)}><i className="fas fa-dice-d20"></i> {t("auth.connect")}</button>
                  </div>
                </div>}

                {/* error Network */}
                {isIncorrectNetwork && 
                  <div className="wallet_content error_network">
                    <div className="mb-3 ">
                      <h1 className="fw-bold text-danger mb-4">{t("auth.incorrectNetwork.title")}</h1>
                      <div className="mb-4">{t("auth.incorrectNetwork.description")}</div>
                    </div>
                    <div className=" mb-4">
                      <button className="wallet_connect_btn" onClick={switchNetwork}><i className="fas fa-dice-d20"></i> {t("auth.incorrectNetwork.switch")}</button>
                    </div>
                  </div>
                }
              </div>
            </div>


            <div className="d-flex justify-content-between connect_later_sec">
              <div>
                <img src={Coinl} alt="" className="coinl" />
              </div>
              {/*<div className="align-self-center con_later mb-4" onClick={connectLater}>Connect later</div>*/}
              <div>
                <img src={Coinr} alt="" className="coinr" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectWalletModal modalShow={show} setModalView={setShow} walletconnect={walletConnector} />
    </>
  );
};

export default Index;
