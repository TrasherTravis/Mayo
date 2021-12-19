import React, { useEffect } from "react";
import useSound from 'use-sound';
import { Layout } from "../components";
import HeroSection from "../sections/HeroSection";
import PrevGameSection from "../sections/PrevGameSection";
import LeaderBoard from "../sections/LeaderBoard";
import Auth from "./../components/auth";
import "./style.css";
import { useQuery } from '@apollo/client';
import { QUERY_BET } from "../utils/queries";
// import { useWeb3React } from "@web3-react/core";
import { useIsWalletConnected } from '../utils/helpers';
import backgroundMusic from '../assets/audios/squid-moon-bg-music.mp3';

const Home = () => {
  // const { account, chainId } = useWeb3React();
  const { loading, data: bet, error } = useQuery(QUERY_BET, { variables: { id: '0x03dbf44d15350e9fd1a1046b6022f89ebeb3ac09afdb737f6d58a45ade85d7bc' } });
  const isWalletConnected = useIsWalletConnected();
  const [play, music] = useSound(backgroundMusic, { loop: true });
  // const [later, setLater] = useState(false);

  if (error) console.log(`Error! ${error.message}`);

  useEffect(() => {
    if(isWalletConnected) {
      play();
    } else {
      music.stop();
    }
  }, [isWalletConnected, music, play])
  useEffect(()=>{
    if (!loading){
      console.log(bet)
    }
  }, [loading, bet]);

  if (!isWalletConnected) {
    return <Auth />
  } else {
    return (
      <div
        // data-aos="fade-out"
        // data-aos-delay="200"
        className="bg-dark-700"
      >
        <Layout>
          <HeroSection />
          <div className="py-20 bg-dark-700 bottom-section">
            <PrevGameSection />
            <LeaderBoard />
          </div>
        </Layout>
      </div>
    );
  }
};

export default Home;
