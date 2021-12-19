import { makeObservable, observable } from "mobx";
import Moralis from "moralis";

export class ChainStore {

  prices = {
    bnb: 0,
    sqm: 0,
  };

  constructor(rootStore) {
    makeObservable(this, {
      //observables
      prices: observable,

      //actions
    });
    this.setPrices();
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
    } catch (e) {
      console.log(e)
    }
  }
}

export default ChainStore;
