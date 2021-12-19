import "./style.css";
import Marbles from "../../assets/images/MARBLES.png";
// import Leaderboard from "../../assets/images/marble-popup-leaderboard-img.jpg";
import Winner1 from "../../assets/images/winner1.png";
import Dollor from "../../assets/images/dollor.svg";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

const MarbleModal = ({ activeGame, setActiveGame, gameHandler }) => {
  const { t } = useTranslation();
  return (
    <div className={`modal marble-modal ${activeGame ? "flex" : "hidden"} `}>
      <div className="modal-content flex justify-center  text-center  relative overflow-hidden">
        <div className="close-modal" onClick={gameHandler}>
          <i className="fas fa-times"></i>
        </div>
        <div className="flex flex-col ">
          <div className="py-8">
            <div className="mx-auto flex items-center justify-center w-full my-10 md:my-4">
              <div className=" cursor-pointer marble-popup-parent relative">
                <img src={Marbles} alt="" loading="lazy"/>
              </div>
              <p className="font-medium text-2xl ml-3">{t("modals.marble.marbles")}</p>
            </div>
            <p className="text-sm text-gray-400 mx-16">
              {t("modals.marble.yourBet")}
            </p>
          </div>
          <div className=" flex-1 bg-dark-400 py-6 px-4">
            <div className="marble-bnb  text-left rounded-lg pl-6 py-3 px-4 mb-4">
              <span
                className=" text-left mr-28 font-bold text-sm inline-block"
                style={{ color: "#63560F" }}
              >
                {t("modals.marble.win")}
              </span>
            </div>
            <div className="marble-sqm  text-left rounded-lg pl-6 py-3 px-4 mb-4">
              <span className=" text-left mr-24 font-bold text-sm inline-block">
                {t("modals.marble.reward")}
              </span>
            </div>

            <div className="bg-dark-700 rounded-lg py-3 px-4 mb-2  shadow-lg">
              <p className="text-base font-bold marble-text">
                {t("modals.marble.leaderboard")}
              </p>
              {/* <img src={Leaderboard} alt="" /> */}
              <LeaderCard />
            </div>
            <p className="mt-8 mx-10">
              {t("modals.marble.lose")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarbleModal;

const LeaderCard = () => {
  const { account } = useWeb3React();
  return (
    <div
      className={`ml-1  rounded-lg grid grid-cols-1 md:grid-cols-12 mt-4 relative winner-card text-brown first first-mini py-2`}
    >
      <div className="rank-tag  text-left ">
        <div className="rank-tag-inner pl-2 flex items-center">
          <p className=" font-bold  italic  text-white">
            <span className=" text-lg">1</span>
          </p>
        </div>
      </div>
      <div className=" flex  items-center   md:col-span-6 pl-6">
        <img src={Winner1} alt="" className="w-8" loading="lazy"/>
        <p className=" ml-4 font-bold   account" style={{ fontSize: 10 }}>
          {account ? account.slice(0, 5) : ''}...{account ? account.slice(-5) : ''}
        </p>
      </div>
      <div className="flex mt-8 md:mt-0 md:col-span-6  items-center md:pr-4 max-w-sm  justify-between w-11/12 mx-auto md:mx-auto md:w-full md:max-w-none">
        <p className="hidden md:block text-xs score">
          <i className="fas fa-star"></i>
          <span
            className="inline-block ml-2 font-bold  text-xs"
            style={{ fontSize: 10 }}
          >
            10,000
          </span>
        </p>

        <p className="hidden md:flex text-xs  items-center justify-end flex-1 payout">
          <img src={Dollor} alt="" className="w-3" loading="lazy" />
          <span className="inline-block ml-2 font-bold " style={{ fontSize: 10 }}>
            $200 000 SQM
          </span>
        </p>
      </div>
    </div>
  )
};
