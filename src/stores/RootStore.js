import { makeObservable } from "mobx";
import React from "react";
import ChainStore from "./ChainStore";

export class RootStore {

    constructor() {
        this.chainStore = new ChainStore(this);
        makeObservable(this, {
        })
    }
}

export const StoreContext = React.createContext();

export const StoreProvider = ({ children, store }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

export const useStores = () => React.useContext(StoreContext);
// eslint-disable-next-line
export default { RootStore, StoreContext, StoreProvider };
