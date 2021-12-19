import "./style.css";
import Marble from "../../assets/images/game-start-modal-marble.png";
import { useTranslation } from "react-i18next";
const GameStartModal = ({ activeGame, setActiveGame, gameHandler }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`modal game-start-modal ${activeGame ? "flex" : "hidden"} `}
    >
      <div className="modal-content flex justify-center items-start md:items-center text-center pt-8 relative">
        <div className="close-modal" onClick={gameHandler}>
          <i className="fas fa-times"></i>
        </div>
        <div>
          <img
            src={Marble}
            alt=""
            className="w-16 md:w-auto mx-auto mb-6 md:mb-10"
          />
          <h2 className="font-bold mb-2 md:mb-6">
            {t("modals.gameStart.calculate")}
          </h2>
          <div className="flex items-center justify-center md:mt-4">
            <i className="far fa-clock mr-3"></i>
            <p>{t("modals.gameStart.takeUp")}</p>
          </div>
          <button onClick={gameHandler} className="bg-white rounded-md py-3 px-8 md:py-4 md:px-10 mt-6 md:mt-10 text-black font-bold text-base md:text-xl ">
            {t("modals.gameStart.playAgain")}
          </button>
        </div>
      </div>
      <p className="mt-10 text-lg text-gray-400">
        {t("modals.gameStart.close")}
      </p>
    </div>
  );
};

export default GameStartModal;
