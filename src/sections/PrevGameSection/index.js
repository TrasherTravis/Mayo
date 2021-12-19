/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { TinyBnb, TinyStar, TinyDollor } from "../../assets/svg";
import dollor from "../../assets/images/CUSTOM_DOLLOR_TINY_green.png";
import BnbWhite from "../../assets/images/BNBWHITE.png";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from '@apollo/client';
import { QUERY_MY_BETS } from "../../utils/queries";
import "./style.css";
import { useTranslation } from "react-i18next";

/*const data = [
  {
    bet: "Odd",
    bnb: 1,
    pending: true,
    result: [{ win: false }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
  {
    bet: "Even",
    bnb: 2,
    pending: false,
    result: [{ win: true }, { lost: false }],
    star: "+23",
    dollor: "+512",
  },
];*/

const PrevGame = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const { account } = useWeb3React();
  const { loading: betsQueryLoading, data: bets } = useQuery(QUERY_MY_BETS, { variables: { player: account, first: 10 } });

  useEffect(() => {
    if (!betsQueryLoading && bets) {
      setData(bets.bets);
    }
  }, [betsQueryLoading, bets]);

  const scrollContainer = useRef();
  if (scrollContainer.current) {
    scrollContainer.current.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.current.scrollLeft += evt.deltaY;
    });
  }
  return (
    <section className="prev-game">
      {data.length !== 0 && <div className="container relative">
        <h2 className="font-bold text-2xl"> {t("sections.prevGame.yourGames")}</h2>
        <div
          className="flex items-center mt-6 overflow-auto game-card-container"
          ref={scrollContainer}
        >
          {data.map((v, i) => (
            <div
              key={i}
              className={`prev-game-card rounded-2xl mr-8 flex-shrink-0 ${v.result === v.bet ? "win" : ""
                }`}
            >
              <div className="pb-2 pt-2 px-4 pr-24 bg-dark-700 rounded-t-2xl ">
                <h4 className="font-bold text-3xl">{t("sections.prevGame.bet")} {v.bet}</h4>
                <div className="flex items-center">
                  <img src={BnbWhite} alt="" />
                  <p className="text-base font-bold mx-1">{v.amount} BNB</p>
                  <span>~{v.rewardClaimed} SQM</span>
                </div>
              </div>
              {v.result === 'PENDING' ? (
                <div className="prev-game-card-btm pb-2 pt-2 px-4 w-full">
                  <p className="font-bold text-base">{t("sections.prevGame.result")}</p>
                  <div className="flex items items-center text-xs mt-1">
                    <i className="far fa-clock"></i>
                    <p className="ml-1">{t("sections.prevGame.pending")}</p>
                  </div>
                </div>
              ) : (
                <div
                  className={`prev-game-card-btm pb-2 pt-2 px-4 w-full flex justify-between `}
                >
                  <div>
                    <p className="font-bold text-base">{t("sections.prevGame.result")}</p>
                    <div className="flex items items-center text-xs mt-1">
                      <p className="">{v.result} / {t("sections.prevGame.win")}</p>
                    </div>
                  </div>
                  <div className="flex items-end text-base prev-game-card-btm-right">
                    <div className="flex items-center">
                      <TinyStar />
                      <p className="text-xs ml-1">{v.result === v.bet ? "+" : "-"}{v.score}</p>
                    </div>
                    <div className="flex items-center ml-2">
                      <img src={dollor} alt="" />
                      <p className="text-xs ml-1">{v.result === v.bet ? "+" : "-"}{v.rewardClaimed} SQM</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>}
    </section>
  );
};

export default PrevGame;
