import {
  ApolloClient, ApolloProvider,
  createHttpLink, InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useWeb3React } from "@web3-react/core";
// import Home from "./pages/Home";
import Aos from "aos";
import "aos/dist/aos.css";
import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import Preloader from './components/preloader';
import { injected } from "./hooks/wallet/Connectors";
import "./translations/i18n";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_THEGRAPH_URI,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Home = React.lazy(async () => {
  const [moduleExports] = await Promise.all([
    import("./pages/Home"),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);
  return moduleExports;
});
function App() {
  const [tried, setTried] = useState(false);
  const { active, activate } = useWeb3React();
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      }
      else {
        setTried(true);
      }
    })
  }, [activate]);

  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active]);

  return (
    <ApolloProvider client={client}>
      <div>
        <Suspense fallback={<Preloader />}>
          <Home />
        </Suspense>
      </div>
    </ApolloProvider>
  )
}

export default App;
