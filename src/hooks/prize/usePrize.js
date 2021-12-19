import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import sqmAbi from "../../assets/abi/sqm.json";
import { useStores } from '../../stores/RootStore';
import { GAME_ADDRESS, SQM_ADDRESS } from '../../utils/helpers';


const usePrize = () => {
  const { chainStore } = useStores();
  const { prices } = chainStore;
  const [prizes, setPrizes] = useState('0')

  useEffect(() => {
    const fetchPrize = async () => {
      const price = prices.sqm;
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const sqmContract = new ethers.Contract(SQM_ADDRESS, sqmAbi, provider)
      // get balance of game contract
      const _balance = await sqmContract.balanceOf(GAME_ADDRESS)
      const _prizes = (price * parseFloat(ethers.utils.formatEther(_balance))).toFixed(0)
      setPrizes(_prizes)
    }
    fetchPrize()
  })

  return prizes
}

export default usePrize
