import { useWeb3React } from "@web3-react/core";

export const useIsWalletConnected = () => {
    const { chainId , account } = useWeb3React();
    return account && chainId.toString() === process.env.REACT_APP_CHAIN_ID
}

export const useIsIncorrectNetwork = () => {
    const { chainId , account } = useWeb3React();
    return account && chainId.toString() !== process.env.REACT_APP_CHAIN_ID
}

export const GAME_ADDRESS = "0x430f41E878303550769dE5b430c4F98a9289aB3B"
export const SQM_ADDRESS = "0x2766CC2537538aC68816B6B5a393fA978A4a8931"

export const parseToUsdPriceFormat = (str) => str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")