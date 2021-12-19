import { ethers } from 'ethers';
import { action, makeObservable, observable } from "mobx";
import Moralis from "moralis";
import sqmAbi from "../assets/abi/sqm.json";
import { GAME_ADDRESS, SQM_ADDRESS } from '../utils/helpers';
export class ChainStore {

  provider = new ethers.providers.Web3Provider(window.ethereum)
  sqmContract = new ethers.Contract(SQM_ADDRESS, sqmAbi, this.provider)
  prices = {
    bnb: 0,
    sqm: 0,
  };
  payout = 0;
  prize = 0;
  player = {};
  players = [];
  totalScore = 0;
  leaderBoard = [];

  constructor() {
    makeObservable(this, {
      //observables
      prices: observable,
      payout: observable,
      player: observable,
      players: observable,
      totalScore: observable,
      leaderBoard: observable,

      //actions
      setPlayer: action,
      setPlayers: action,
      setTotalScore: action,
      setLeaderBoard: action,
    });
    this.setPrices();
  }

  setPlayer = (player) => {
    this.player = player;
  }

  setPlayers = (players) => {
    this.player = players;
  }

  setTotalScore = (totalScore) => {
    this.totalScore = totalScore;
  }

  setLeaderBoard = (leaderBoard) => {
    this.leaderBoard = leaderBoard;
  }

  setPrices = async () => {
    const serverUrl = "https://t5v7ggbgm2c4.usemoralis.com:2053/server";
    const appId = "MdoR4dgtYqQFv50UhfL3tVhjABrjzen0kXbtQHPt";
    try {
      Moralis.start({ serverUrl, appId });
      const options = [
        {
          address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          chain: "bsc",
          exchange: "PancakeSwapv2"
        },
        {
          address: "0x2766cc2537538ac68816b6b5a393fa978a4a8931",
          chain: "bsc",
          exchange: "PancakeSwapv2"
        }
      ];
      this.prices = {
        bnb: await ((await Moralis.Web3API.token.getTokenPrice(options[0])).usdPrice).toFixed(2),
        sqm: await ((await Moralis.Web3API.token.getTokenPrice(options[1])).usdPrice).toFixed(2)
      }
      this.setPrize();
    } catch (e) {
      console.log(e)
    }
  }

  setPrize = async () => {
    const _balance = await this.sqmContract.balanceOf(GAME_ADDRESS);
    this.prize = (this.prices.sqm * parseFloat(ethers.utils.formatEther(_balance))).toFixed(0);
  }

  getPayout = (score) => {
    return (parseFloat(ethers.utils.formatEther(score)) * parseFloat(this.prize) / this.totalScore).toFixed(2);
  }
}

export default ChainStore;
