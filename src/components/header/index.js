/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@apollo/client';
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ethers } from 'ethers';
import { useCallback, useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import PancakeAbi from "../../assets/abi/pancakeAbi.json";
import sqmAbi from "../../assets/abi/sqm.json";
import Bnb from "../../assets/images/BNB.png";
import Hamburger from "../../assets/images/Hamburgur.png";
import MobileLogo from "../../assets/images/LOGO_MOBILE.png";
import Marbles from "../../assets/images/MARBLES.png";
import Metamask from "../../assets/images/METAMASK.png";
import SquidMoonCurrency from "../../assets/images/squid-moon-currency-icon.png";
import LogoSVG from "../../assets/images/squid-moon-logo.svg";
import StarSVG from "../../assets/images/star-vector.svg";
import User from "../../assets/images/USER.png";
import { walletConnect } from "../../hooks/wallet/Connectors";
import { useStores } from '../../stores/RootStore';
import { useIsWalletConnected } from '../../utils/helpers';
import { QUERY_ME, QUERY_PLAYERS } from "../../utils/queries";
import SelectWalletModal from "../modals/SelectWalletModal";
import "./style.css";

const Index = ({ checkAuth }) => {
  const { t, i18n } = useTranslation();
  const { chainStore } = useStores();
  const { setPlayer, setPlayers, setTotalScore, leaderBoard, setLeaderBoard, getPayout } = chainStore;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [eqxBalance, setEqxBalance] = useState(0);
  const { account, chainId, activate, library } = useWeb3React();
  const isWalletConnected = useIsWalletConnected();
  // eslint-disable-next-line no-unused-vars
  const [me, setMe] = useState({ rewardClaimed: 0, score: 0 });
  const [sqmBalance, setSqmBalance] = useState(0.00);
  const [sqmRate, setSqmRate] = useState(0);
  const sqmAddr = "0x2766cc2537538ac68816b6b5a393fa978a4a8931";
  const pancakeAddr = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
  const usdtAddr = "0x55d398326f99059fF775485246999027B3197955";
  const [en, setEn] = useState('en')
  const { loading: playerQueryLoading, data: player } = useQuery(QUERY_ME, { variables: { id: account } });
  const { loading: playersQueryLoading, data: players } = useQuery(QUERY_PLAYERS, { variables: { orderBy: 'score' } });
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [rank, setRank] = useState(0);
  const onLanguangeClick = () => setIsActive(!isActive);
  const handleChangeLanguage = useCallback((lan) => {
    i18n.changeLanguage(lan)
    setIsActive(false)
    setEn(lan)
  }, [i18n])

  useEffect(() => {
    if (!playerQueryLoading && player && player.player) {
      setMe(player.player);
    }
  }, [playerQueryLoading, player]);

  useEffect(() => {
    if (!playersQueryLoading && players && !playerQueryLoading && player) {
      const count = players.players.length > 12 ? Math.floor(players.players.length * 0.08) : players.players.length
      const _players = players.players.slice(0, count)
      const _totalScore = _players.reduce((prev, curr) => parseFloat(prev) + parseFloat(ethers.utils.formatEther(curr.score)), 0)
      setLeaderBoard(_players);
      setTotalScore(_totalScore)
      setPlayer(player);
      setPlayers(players);
      setRank(players.players.map(e => e.id.toLowerCase()).indexOf(account.toLowerCase()) + 1);
    }
  }, [playersQueryLoading, account, player, players, setPlayer, setPlayers, setTotalScore, setLeaderBoard, playerQueryLoading]);

  const getBalance = useCallback(async () => {
    try {
      if (account) {
        let sqmContract = await new library.eth.Contract(sqmAbi, sqmAddr);
        let sqmBln = await sqmContract.methods.balanceOf(account).call();
        let sqmDecimal = await sqmContract.methods.decimals().call();
        setSqmBalance(sqmBln / (10 ** sqmDecimal));
        let balance = await library.eth.getBalance(account);
        setEqxBalance(await library.utils.fromWei(balance, "ether"));
      }

    } catch (error) {
      console.log("error", error)
    }
  }, [account, library]);

  const setSqmRatePancake = useCallback(async () => {
    let sqmContract = await new library.eth.Contract(sqmAbi, sqmAddr);
    let sqmDecimal = await sqmContract.methods.decimals().call();
    let router = await new library.eth.Contract(PancakeAbi, pancakeAddr);
    let tokenToSell = 1 * 10 ** sqmDecimal;
    let amountOutSqmToUsdt = await router.methods.getAmountsOut(tokenToSell.toString(), [sqmAddr, usdtAddr]).call();
    amountOutSqmToUsdt = await library.utils.fromWei(amountOutSqmToUsdt[1].toString());
    setSqmRate(amountOutSqmToUsdt);
  }, [library])

  const handleChange = (event) => {
    setOpen((prev) => !prev);
  };

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
      setShow(false)
    }
    catch (e) {
      console.error(e);
    }
  }

  let menuRef = useRef(null);

  const getMeFromLeaderBoard = () => {
    return leaderBoard.find(p => p.id.toLowerCase() === account.toLowerCase());
  }

  useEffect(() => {
    async function fetchData() {
      const handler = (e) => {
        if (isWalletConnected) {
          if (!menuRef.current || !menuRef.current.contains(e.target)) {
            setOpen(false);
          }
        }
      };
      if (isWalletConnected) {
        await setSqmRatePancake();
        await getBalance();
      }
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
    fetchData();
  }, [chainId, account, getBalance, setSqmRatePancake, isWalletConnected]);

  return (
    <header className=" text-white bg-dark-700 lg:bg-transparent pb-10 lg:pb-0">
      <div className="container">
        <div className="py-8 flex justify-between items-center">
          <div>
            <picture>
              <source srcSet={LogoSVG} media="(min-width: 1024px)" />
              <img src={MobileLogo} alt="" />
            </picture>
          </div>
          {isWalletConnected &&
            <>
              <div className="metamask-mobile flex lg:hidden items-center">
                <div className="mr-4">
                  <img src={Metamask} alt="Metamask wallet" width="24" />
                </div>
                <p className="text-sm">{account ? account.slice(0, 5) : ''}...{account ? account.slice(-5) : ''}</p>
              </div>
              <div className="bg-dark-400 p-2 pr-8 rounded-full hidden items-center  lg:flex">
                <div className="metamask flex items-center">
                  <div className="mr-4">
                    <img src={Metamask} alt="Metamask wallet" width="24" />
                  </div>
                  <p className="text-sm">{account ? account.slice(0, 5) : ''}...{account ? account.slice(-5) : ''}</p>
                </div>
                <div className="flex items-center ml-4">
                  <div className="mr-4">
                    <img src={Bnb} alt="BNB coin balance" width="24" />
                  </div>
                  <p className="text-base  font-medium">{(parseFloat(eqxBalance)).toFixed(4)} BNB</p>
                </div>
                <div className="flex items-center ml-4">
                  <div className="mr-4">
                    <img src={SquidMoonCurrency} alt="Squid Moon balance" width="28" />
                  </div>
                  <p className="text-base font-medium">{(parseFloat(sqmBalance)).toFixed(2)} SQM</p>
                  <p className="text-sm  text-gray-500 ml-2 font-normal">${((parseFloat(sqmBalance * sqmRate))).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center ml-4">
                  <div className="mr-4">
                    <img src={StarSVG} alt="Your Squid Moon score" width="24" />
                  </div>
                  <p className="text-base font-medium">{t("header.rank")} {rank}</p>
                  <p className="text-sm  text-gray-500 ml-2 font-normal">
                    {t("header.payout")} {
                      getMeFromLeaderBoard() && leaderBoard.length ? getPayout(getMeFromLeaderBoard().score) : 0
                    }
                  </p>
                </div>
              </div>
            </>
          }
          {(!account || chainId.toString() !== process.env.REACT_APP_CHAIN_ID) &&
            <div>
              <button className="connect-wallet-btn" onClick={() => {
                if (account) {
                  sessionStorage.removeItem('connect_later');
                  checkAuth();
                } else {
                  setShow(true);
                }

              }}>{t("header.connect")}</button>
            </div>
          }
          <div className="lg:hidden">
            <button onClick={handleChange}>
              <img src={Hamburger} alt="" />
            </button>
          </div>
          <div className="hidden lg:flex flex-shrink-0 items-center ">
            {/*<img src={Music} alt="" className="w-8 " />*/}
            <ol className="equaliser">
              <li className="equaliser-bar"></li>
              <li className="equaliser-bar"></li>
              <li className="equaliser-bar"></li>
              <li className="equaliser-bar"></li>
            </ol>
            <div className="w-8 mx-4 menu-container">
              <img src={`/images/${en}.svg`} alt="languages" className="w-full menu-trigger" onClick={onLanguangeClick} />
              <nav ref={dropdownRef} className={`lan-menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                  <li>
                    <img src={`/images/en.svg`} alt="languages" />
                    <div onClick={() => { handleChangeLanguage('en') }}>English</div>
                  </li>
                  <li>
                    <img src={`/images/ch.svg`} alt="languages" />
                    <div onClick={() => { handleChangeLanguage('ch') }}>Chinese 中文</div>
                  </li>
                  <li>
                    <img src={`/images/ko.svg`} alt="languages" />
                    <div onClick={() => { handleChangeLanguage('ko') }}>Korean 한국어</div>
                  </li>
                  <li>
                    <img src={`/images/jp.svg`} alt="languages" />
                    <div onClick={() => { handleChangeLanguage('jp') }}>Japanese 日本語</div>
                  </li>
                  <li>
                    <img src={`/images/ru.svg`} alt="languages" />
                    <div onClick={() => { handleChangeLanguage('ru') }}>Russian Pусский</div>
                  </li>
                </ul>
              </nav>
            </div>
            <img src={User} alt="USER" className="w-10" />
          </div>
        </div>
        <div className="  w-full  mx-auto  block lg:hidden cus_mobile_adjust">
          <h1 className="font-mineCraft text-3xl md:text-4xl mx-auto text-center text-yellow my-8">
            <span className="minecraft-dollor">S</span>{" "}
            <CountUp end={200000} duration={2} separator=',' /> {t("header.prize")}
          </h1>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`menu flex flex-col ${open ? "active" : ""} `}
      >
        <div className="flex-1">
          <div className="pb-10 text-right">
            <button className="p-2" onClick={handleChange}>
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          <div className="metamask flex items-center max-w-max">
            <div className="mr-4">
              <img src={Metamask} alt="" />
            </div>
            <p className="text-sm">{account ? account.slice(0, 5) : ''}...{account ? account.slice(-5) : ''}</p>
          </div>
          <div className="flex items-center py-3">
            <div className="mr-4">
              <img src={Bnb} alt="" />
            </div>
            <p className="text-base  font-medium">{(parseFloat(eqxBalance)).toFixed(4)} BNB</p>
          </div>
          <div className="flex items-center py-3">
            <div className="mr-4">
              <img src={SquidMoonCurrency} alt="Squid moon balance" />
            </div>
            <p className="text-base font-medium">{(parseFloat(sqmBalance)).toFixed(2)} SQM</p>
            <p className="text-sm  text-gray-500 ml-2 font-normal">${((parseFloat(sqmBalance * sqmRate))).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="flex items-center py-3">
            <div className="  px-2 mr-4">
              <img src={StarSVG} alt="Your Squid moon score" />
            </div>
            <p className="text-base font-medium">{t("header.rank")} 23</p>
            <p className="text-sm  text-gray-500 ml-2 font-normal">
              {t("header.payout")} {
                getMeFromLeaderBoard() && leaderBoard.length ? getPayout(getMeFromLeaderBoard().score) : 0
              }
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex items-center  w-full my-10 md:my-4">
            <div
              className=" cursor-pointer marble-popup-parent relative"
            // onClick={marbleHandler}
            >
              <div className="marbles-question">
                <i className="fas fa-question"></i>
              </div>
              <img src={Marbles} alt="" />
            </div>
            <p className="font-medium text-2xl ml-3">{t("header.marbles")}</p>
          </div>
          <h1 className="font-mineCraft text-3xl md:text-4xl mx-auto  text-yellow my-8">
            <span className="minecraft-dollor">S</span>{" "}
            <CountUp end={200000} duration={2} separator=',' /> {t("header.prize")}
          </h1>
          <div className="flex items-center menu-social">
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-telegram-plane"></i>
            </a>
          </div>
        </div>
      </div>
      <div className={`overlay ${open ? "block" : "hidden"}`}></div>
      <SelectWalletModal modalShow={show} setModalView={setShow} walletconnect={walletConnector} />
    </header>
  );
};

export default Index;
