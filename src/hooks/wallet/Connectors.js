import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 97]
});

export const walletConnect = new WalletConnectConnector({
    rpc: {
        56: "https://bsc-dataseed.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
    }
})