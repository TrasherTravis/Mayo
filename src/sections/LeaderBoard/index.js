/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { ethers } from 'ethers';
import { useTranslation } from "react-i18next";

import GreenTag from "../../assets/images/GreenTag.png";
import RedTag from "../../assets/images/RedTag.png";
import Winner1 from "../../assets/images/winner1.png";
import Winner2 from "../../assets/images/winner2.png";
import Winner3 from "../../assets/images/winner3.png";
import Dollor from "../../assets/images/dollor.svg";
import Dollor2 from "../../assets/images/Dollor2.png";
import Dollor3 from "../../assets/images/Dollor3.png";
import Dollor4 from "../../assets/images/Dollor4.png";

import gameAbi from "../../assets/abi/game.json";

import { parseToUsdPriceFormat, GAME_ADDRESS } from '../../utils/helpers';

import "./style.css";
import { useStores } from "../../stores/RootStore";

const PrevGame = () => {
  const { t } = useTranslation();
  const { chainStore } = useStores();
  const { prize, getPayout, player, leaderBoard, totalScore } = chainStore;
  const [currentView, setCurrentView] = useState(10);
  const [remain, setRemain] = useState(0)

  const listenEvent = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(GAME_ADDRESS, gameAbi, provider)
    const end = await contract.end()

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    const end_date = new Date(end * 1000)
    const current_date = new Date()

    const diffDays = Math.round(Math.abs((end_date - current_date) / oneDay));

    setRemain(diffDays)
  }, []);

  useEffect(() => {
    async function fetchData() {
      await listenEvent();
    }
    fetchData();
  }, [listenEvent])

  return (
    <section className="leader-board py-20">
      <div className="container text-center">
        <h1>{t("sections.leaderboard.leaderboard")}</h1>
        <div className="leader-head text-center relative mt-10">
          <div className="score-tag">
            <div className="relative ">
              <img src={GreenTag} alt="" />
              <div className="score-tag-content text-black">
                <h3 className=" text-base md:text-xl font-bold">{t("sections.leaderboard.top")} 8%</h3>
                <p className=" text-xs md:text-sm">{t("sections.leaderboard.winner")}</p>
              </div>
            </div>
            <div className="ml-4 relative ">
              <img src={RedTag} alt="" />
              <div className="score-tag-content">
                <h3 className="text-base md:text-xl font-bold">{player.score}</h3>
                <p className="text-xs md:text-sm">{t("sections.leaderboard.yourScore")}</p>
              </div>
            </div>
          </div>
          <h2 className="font-mineCraft text-4xl md:text-6xl uppercase leading-10">
            {parseToUsdPriceFormat(prize)} {t("sections.leaderboard.prize")}
          </h2>
          <p className="text-yellow text-base  md:text-2xl mt-4">
            {remain} {t("sections.leaderboard.announced")}
          </p>
        </div>

        <div className="hidden md:grid grid-cols-12 w-full mt-28 uppercase font-bold text-sm px-4">
          <div className="text-left col-span-7">
            <p>{t("sections.leaderboard.rank")}</p>
          </div>
          <div className="flex justify-between col-span-5">
            <p>{t("sections.leaderboard.score")}</p>
            <p>{t("sections.leaderboard.payout")}</p>
          </div>
        </div>
        <div className="cards-wrapper mt-20 md:mt-0">
          {leaderBoard && leaderBoard.slice(0, currentView).map((v, i) => (
            <div
              key={i}
              className={`ml-1  rounded-3xl grid grid-cols-1 md:grid-cols-12 mt-8 relative winner-card text-brown ${i + 1 === 1
                ? "first py-8"
                : i + 1 === 2
                  ? "second py-8"
                  : i + 1 === 3
                    ? "third py-8"
                    : "py-6"
                }`}
            >
              <div className="rank-tag  text-left ">
                <div className="rank-tag-inner pl-2 flex items-center">
                  <p className=" font-bold  italic  text-white">
                    <span
                      className={`${i + 1 === 1
                        ? "text-4xl"
                        : i + 1 === 2
                          ? "text-4xl"
                          : i + 1 === 3
                            ? "text-4xl"
                            : "text-xl"
                        } `}
                    >
                      {i + 1}
                    </span>
                    <span>
                      {i + 1 === 1
                        ? "st"
                        : i + 1 === 2
                          ? "nd"
                          : i + 1 === 3
                            ? "rd"
                            : "th"}
                    </span>
                  </p>
                </div>
              </div>
              <div className=" flex  items-center   md:col-span-6 lg:col-span-7 pl-16 md:pl-20">
                <img
                  src={i + 1 === 1 ? Winner1 : i + 1 === 2 ? Winner2 : Winner3}
                  alt=""
                />
                <p className=" ml-4 font-bold text-base sm:text-xl account">
                  {v.id ? v.id.slice(0, 5) : ''}...{v.id ? v.id.slice(-9) : ''}
                </p>
              </div>
              <div className="flex mt-8 md:mt-0 md:col-span-6 lg:col-span-5 items-center md:pr-4 max-w-sm  justify-between w-11/12 mx-auto md:mx-auto md:w-full md:max-w-none">
                <div className="md:hidden">
                  <p className=" text-left mb-1 uppercase font-bold text-sm score">
                    <span>{t("sections.leaderboard.score")}</span>
                  </p>
                  <p className="text-xl score">
                    <i className="fas fa-star"></i>
                    <span className="inline-block ml-2 font-bold ">
                      {parseFloat(ethers.utils.formatEther(v.score)).toFixed(2)}
                    </span>
                  </p>
                </div>
                <p className="hidden md:block  text-xl score">
                  <i className="fas fa-star"></i>
                  <span className="inline-block ml-2 font-bold ">
                    {parseFloat(ethers.utils.formatEther(v.score)).toFixed(2)}
                  </span>
                </p>
                <div className="md:hidden">
                  <p className=" text-left mb-1 uppercase font-bold text-sm payout">
                    {t("sections.leaderboard.payout")}
                  </p>
                  <p className="text-xl flex items-center justify-end flex-1 payout">
                    <img
                      src={
                        i + 1 === 1
                          ? Dollor
                          : i + 1 === 2
                            ? Dollor2
                            : i + 1 === 3
                              ? Dollor3
                              : Dollor4
                      }
                      alt=""
                    />
                    <span className="inline-block ml-2 font-bold ">
                      ${getPayout(v.score)}
                    </span>
                  </p>
                </div>
                <p className="hidden md:flex text-xl  items-center justify-end flex-1 payout">
                  <img
                    src={
                      i + 1 === 1
                        ? Dollor
                        : i + 1 === 2
                          ? Dollor2
                          : i + 1 === 3
                            ? Dollor3
                            : Dollor4
                    }
                    alt=""
                  />
                  <span className="inline-block ml-2 font-bold ">
                    ${getPayout(v.score)}
                  </span>
                </p>
              </div>
            </div>
          ))}
          {leaderBoard && leaderBoard.length > 10 && <div
            className={`cards-wrapper-overlay  ${currentView === leaderBoard.length ? "hidden" : "flex"
              } items-end justify-center`}
          >
            <button
              className={` flex justify-center items-center`}
              onClick={() => setCurrentView(leaderBoard.length)}
            >
              <p className="mr-2">{t("sections.leaderboard.fullLeaderboard")}</p>
              <i className="fas fa-arrow-down"></i>
            </button>
          </div>
          }
        </div>
      </div>
    </section>
  );
};

export default PrevGame;
